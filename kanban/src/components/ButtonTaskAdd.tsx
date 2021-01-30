import React from 'react';
import './ButtonTaskAdd.css';
import plus_icon from '../assets/images/plus_icon.png';

interface ButtonTaskAddProps {
  onClick: any;
}

function ButtonTaskAdd(props: ButtonTaskAddProps) {
    return (
      <div className="ButtonTaskAdd" onClick={props.onClick} draggable='false'>
          <img alt='' src={plus_icon} draggable='false'/>
      </div>
    );
}
  
export default ButtonTaskAdd;