import React, { useState } from 'react';
import './Home.css';

import { TaskColumn } from '../components/TaskColumn';
import { TaskData, TaskType } from '../common/types';

export default function Home() {
    const [taskID, setTaskID] = useState<number>(0);  // global task ID, self-increased
    const [tasks, setTasks] = useState<TaskData[]>([]);   // all tasks data
    const [changeTasks, setChangeTasks] = useState(0); // counter to notify tasks items being changed
    const [dragFrom, setDragFrom] = useState<TaskType>(TaskType.Unknown);

    return (
      <div className="Home">
          <div className='Home-title'/>

          <div className='Home-body'>
              <TaskColumn 
                taskType={ TaskType.Pending } 
                tasks={tasks} 
                setTasks={setTasks}
                changeTasks={changeTasks}
                setChangeTasks={setChangeTasks}
                taskID={taskID}
                setTaskID={setTaskID}
                dragFrom={dragFrom}
                setDragFrom={setDragFrom}
              />

              <TaskColumn 
                taskType={ TaskType.Inprogress } 
                tasks={tasks} 
                setTasks={setTasks}
                changeTasks={changeTasks}
                setChangeTasks={setChangeTasks}
                taskID={taskID}
                setTaskID={setTaskID}
                dragFrom={dragFrom}
                setDragFrom={setDragFrom}
              />

              <TaskColumn 
                taskType={ TaskType.Completed } 
                tasks={tasks} 
                setTasks={setTasks}
                changeTasks={changeTasks}
                setChangeTasks={setChangeTasks}
                taskID={taskID}
                setTaskID={setTaskID}
                dragFrom={dragFrom}
                setDragFrom={setDragFrom}
              />
          </div>
      </div>
    );
}