import React from 'react';
import '../index.css'

function Square(props) {
  //console.log(props.value)
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      
      
    </button>
  );
}

export default Square;