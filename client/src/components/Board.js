
import React, { useEffect, useContext } from 'react';

import '../index.css'
import Square from './Square'

import { GlobalContext } from '../context/GlobalState'

function Board(props) {
  const {updateTurns,updateSquares,checkWinner,getSquares,squares} = useContext(GlobalContext)
  
  useEffect(()=>{
    getSquares()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  useEffect(()=>{
    checkWinner(squares)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[squares]);

  
  
  
  function HandleClick(id){ 
    //update steps on the game
    //UPDATE value on the squares
    updateSquares(id);
    //update props 
    updateTurns();
    checkWinner(squares)
  }

  return (
    <div className="game-board">
      {squares.map(
        (contents,index)=>{
          return <Square  key={index} id={index} onClick = {HandleClick}  value = {contents}/>
        }
      )}
    </div>
  )
}
export default Board;
