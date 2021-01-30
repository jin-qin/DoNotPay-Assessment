import React, { useState } from 'react';
import './TaskCard.css';
import { TaskData } from '../common/types';
import { getTaskStatusColor } from '../utils/misc';

interface TaskCardProps {
    taskData: TaskData
}

function TaskCard(props: TaskCardProps) {
    const { taskData } = props;
    const id = taskData.id
    const taskType = taskData.taskType;
    
    const dragStartHandler = (ev: React.DragEvent<HTMLDivElement>, id: number) => {
        ev.dataTransfer.setData('text/plain', String(id));
    };

    const dragEndHandler = (ev: React.DragEvent<HTMLDivElement>, id: number) => {
    };

    const statusColor = getTaskStatusColor(taskType);

    return (
      <div id={String(id)}
           className='TaskCard'
           draggable='true'
           onDragStart = { e => dragStartHandler(e, id) }
           onDragEnd = { e => dragEndHandler(e, id) }
      >
          
          <div className='TaskCard-title'>
              <p style={{color: statusColor}}>{taskData.title}</p>
          </div>
          <div className='TaskCard-body'>
              <p>{taskData.body}</p>
          </div>
      </div>
    );
}
  
export default TaskCard;