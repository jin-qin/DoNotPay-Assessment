import React, { useState, useEffect } from 'react';
import './TaskColumn.css';
import ButtonTaskAdd from './ButtonTaskAdd';
import TaskCard from './TaskCard';
import { getTaskStatusColor, getTaskStatusTitle, genRandomTitle, genRandomBody } from '../utils/misc';
import { TaskData, TaskType } from '../common/types';

interface TaskColumnProps {
  taskType: TaskType,
  tasks: TaskData[],
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>,
  changeTasks: number,
  setChangeTasks: React.Dispatch<React.SetStateAction<number>>,
  taskID: number,
  setTaskID: React.Dispatch<React.SetStateAction<number>>
}

export function TaskColumn(props: TaskColumnProps) {
  const {taskType, tasks, setTasks, changeTasks, setChangeTasks, taskID, setTaskID} = props;
  
  const [tasksColumn, setTasksColumn] = useState<TaskData[]>([]);

  const [prevDragOverY, setPrevDragOverY] = useState(0);

  const title = getTaskStatusTitle(taskType);
  const statusColor = getTaskStatusColor(taskType);

  useEffect(() => {
    setTasksColumn(tasks.filter(task => task.taskType === taskType));
  }, [tasks, changeTasks, taskType]);

  const dragDropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    
    const id = ev.dataTransfer.getData('text/plain');
    
    const task_idx = tasks.findIndex(task => task.id === Number(id));
    if (task_idx === -1) return;
    
    tasks[task_idx].taskType = taskType;

    setChangeTasks(changeTasks + 1);
  };

  const dragOverHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    
    const targetDOM = (ev.target as HTMLDivElement);
    if (targetDOM.className !== 'TaskCard') return;
    if (prevDragOverY === ev.clientY) return;

    const taskID = Number(targetDOM.getAttribute("id"));
    const targetRect = targetDOM.getClientRects()[0];
    const targetHeight = targetRect.bottom - targetRect.top;
    const diff = ev.clientY - targetRect.top;

    const task_idx = tasks.findIndex(task => task.id === taskID);
    if (diff < targetHeight / 2) {
      
    } else {

    }

    setPrevDragOverY(ev.clientY);
  };

  return (
    <div className="TaskColumn">
        <div className="TaskColumn-top">
            <div style={{backgroundColor: statusColor}} className="TaskColumn-status"/>

            <p style={{fontWeight: 'bold'}}>
              {title}
            </p>
        </div>

        <div className="TaskColumn-body"
             onDragOver = { dragOverHandler }
             onDrop = { dragDropHandler }
        >
          
          <ButtonTaskAdd onClick={() => {
            const newTask: TaskData = { id: taskID, taskType: taskType, title: genRandomTitle(), body: genRandomBody()};
            setTaskID(taskID + 1);

            setTasks(tasks => [...tasks, newTask]);
          }}/>

          { 
            tasksColumn.map(task => {
              return <TaskCard 
                key={task.id}
                taskData={task}
                />;
            })
          }
        </div>
    </div>
  );
}