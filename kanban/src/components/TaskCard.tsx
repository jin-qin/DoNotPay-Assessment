import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

import './TaskCard.css';
import { TaskData, TaskType } from '../common/types';
import { getTaskStatusColor } from '../utils/misc';

interface TaskCardProps {
    idx: number,
    taskData: TaskData
    updatePosition: any
    updateOrder: any
}

function TaskCard(props: TaskCardProps) {
    const { idx, taskData, updatePosition, updateOrder } = props;
    const id = taskData.id
    const taskType = taskData.taskType;

    const [isDragging, setDragging] = useState(false);

    const statusColor = getTaskStatusColor(taskType);

    const ref = useRef(null);
    useEffect(() => {
        updatePosition(idx, {
            height: (ref.current as any).offsetHeight,
            top: (ref.current as any).offsetTop
        });
    });

    return (
      <motion.div
            ref={ref}
            id={String(id)}
            className='TaskCard'
            
            style={{zIndex: isDragging ? 3 : 1}}
            layout
            drag
            initial={false}
            whileTap={{scale: 0.8}}
            
            onDragStart = { () => setDragging(true) }
            onDragEnd = { () => setDragging(false) }
            onDrag = { (e, info) => { taskData.taskType = TaskType.Completed } }
            onViewportBoxUpdate={(_viewportBox, delta) => {
                isDragging && updateOrder(idx, delta.y.translate);
            }}
      >
          
          <div className='TaskCard-title'>
              <p style={{color: statusColor}}>{taskData.title}</p>
          </div>
          <div className='TaskCard-body'>
              <p>{taskData.body}</p>
          </div>
      </motion.div>
    );
}

export default TaskCard;