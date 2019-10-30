import React from 'react';
import '../index.css'

function Square(props) {
  //console.log(props.value)
  console.log(props);
  return (
    <button 
    className= {(props.gameWon)? "winning-btn" : "square" }
    onClick={props.onClick}>
      {props.value}
      
      
    </button>
  );
}

export default Square;