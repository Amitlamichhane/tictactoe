import React,{useEffect,useContext} from 'react';
import '../index.css'

import { GlobalContext } from '../context/GlobalState'

function ScoreBoard(props) {
  //square is essentially a button highlights the button that is currently clicked 
  //that should be board problem and not square problem i think 
  const {getPrediction,squares ,xPredict,yPredict} = useContext(GlobalContext);
  

  useEffect(()=>{
    getPrediction();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[squares]);

  
  
  return (
    <div className="container-fluid">
        <h1>Chance of Winning</h1>
        <table>
        <thead>
          <tr>
          <th rowSpan="2" className="text">Player</th>
          <th colSpan="8" className="text">Winning Chance %</th>
          </tr>
			  </thead>

        <tbody>
				
				<tr>
          <th className="text">Player1</th>
					<td colSpan="8" className="number">{xPredict}</td>
        </tr>
				
        <tr>
          <th className="text">Player2</th>
					<td colSpan ="8" className="number">{yPredict}</td>
				</tr>
			</tbody>
        </table>
    </div>
  );
}

export default ScoreBoard;