import React, {  useContext} from 'react';
import '../index.css'
import { GlobalContext } from '../context/GlobalState'

function Square(props) {
  //square is essentially a button highlights the button that is currently clicked 
  //that should be board problem and not square problem i think 
  const {winner} = useContext(GlobalContext)
  
  

  return (
    <button 
    className="box" 
    disabled={ winner?true:false}
    onClick={()=>{
    props.onClick(props.id)
    }}>
    {props.value}
    </button>
  );
}

export default Square;