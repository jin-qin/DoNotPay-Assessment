import React, { useState, useEffect, useRef } from 'react';
import { clamp, distance } from 'popmotion';
import move from 'array-move';

import './TaskColumn.css';
import ButtonTaskAdd from './ButtonTaskAdd';
import TaskCard from './TaskCard';
import { getTaskStatusColor, getTaskStatusTitle, genRandomTitle, genRandomBody } from '../utils/misc';
import { TaskData, TaskType, Position } from '../common/types';

interface TaskColumnProps {
  taskType: TaskType,
  tasks: TaskData[],
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>,
  taskID: number,
  setTaskID: React.Dispatch<React.SetStateAction<number>>,
}

export function TaskColumn(props: TaskColumnProps) {
  const {taskType, tasks, setTasks, taskID, setTaskID} = props;

  const title = getTaskStatusTitle(taskType);
  const statusColor = getTaskStatusColor(taskType);

  const positions = useRef<Position[]>([]).current;
  const updatePosition = (idx: number, offset: Position) => {
    positions[idx] = offset;
  };

  const updateOrder = (idx: number, dragOffset: number) => {
    const targetIndex = calcTargetIndex(idx, dragOffset, positions);
    if (targetIndex !== idx) setTasks(move(tasks, idx, targetIndex));
  };

  const checkChangeItemType = (task: TaskData) => {
    
  }

  return (
    <div className="TaskColumn">
        <div className="TaskColumn-top">
            <div style={{backgroundColor: statusColor}} className="TaskColumn-status"/>

            <p style={{fontWeight: 'bold'}}>
              {title}
            </p>
        </div>

        <div className="TaskColumn-body">
          
          <ButtonTaskAdd onClick={() => {
            const newTask: TaskData = { id: taskID, taskType: taskType, title: genRandomTitle(), body: genRandomBody()};
            setTaskID(taskID + 1);

            setTasks(tasks => [...tasks, newTask]);
          }}/>

          { 
            tasks.map((task, idx) => {
              return (
                <TaskCard 
                  key={task.id}
                  idx={idx}
                  taskData={task}
                  updatePosition={updatePosition}
                  updateOrder={updateOrder}
                />
              )
            })
          }
        </div>
    </div>
  );
}

function calcTargetIndex(idx: number, yOffset: number, positions: Position[]) {
  const buf = 10;
  let target = idx;
  const { top, height } = positions[idx];
  const bottom = top + height;

  if (yOffset > 0) {
    const nextItem = positions[idx + 1];
    if (nextItem === undefined) return idx;

    const swapOffset = distance(bottom, nextItem.top + nextItem.height / 2) + buf;
    if (yOffset > swapOffset) target = idx + 1;

  } else if (yOffset < 0) {
    const prevItem = positions[idx - 1];
    if (prevItem === undefined) return idx;

    const prevBottom = prevItem.top + prevItem.height;
    const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buf;
    if (yOffset < -swapOffset) target = idx - 1;
  }

  return clamp(0, positions.length, target);
};
