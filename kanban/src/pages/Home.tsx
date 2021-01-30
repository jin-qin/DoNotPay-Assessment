import React, { useState, useRef } from 'react';

import './Home.css';

import { TaskColumn } from '../components/TaskColumn';
import { TaskData, TaskType, Position } from '../common/types';

export default function Home() {
    const [taskID, setTaskID] = useState<number>(0);  // global task ID, self-increased
    const [tasksPending, setTasksPending] = useState<TaskData[]>([]);
    const [tasksInprogress, setTasksInprogress] = useState<TaskData[]>([]);
    const [tasksCompleted, setTasksCompleted] = useState<TaskData[]>([]);

    return (
      <div className="Home">
        <div className='Home-title'>
          <div className='Home-title-trimmer'/>
        </div>

        <div className='Home-body'>
          <TaskColumn 
            taskType={ TaskType.Pending } 
            tasks={tasksPending} 
            setTasks={setTasksPending}
            taskID={taskID}
            setTaskID={setTaskID}
          />

          <TaskColumn 
            taskType={ TaskType.Inprogress } 
            tasks={tasksInprogress} 
            setTasks={setTasksInprogress}
            taskID={taskID}
            setTaskID={setTaskID}
          />

          <TaskColumn 
            taskType={ TaskType.Completed } 
            tasks={tasksCompleted} 
            setTasks={setTasksCompleted}
            taskID={taskID}
            setTaskID={setTaskID}
          />
        </div>
      </div>
    );
}