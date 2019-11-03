
import React from 'react';

import Board from './Board'
import '../index.css'


class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
            steps: Array(0).fill(null),
            stepBy: Array(0).fill(null),
            xPrediction: Array(0).fill(null),
            oPrediction: Array(0).fill(null)
          }
        ],
        localUrl: "http://localhost:5000/getPrediction",
        stepNumber: 0,
        xIsNext: true,
        //what else need to be added to do the following stuff 
        // location for square in row and column 
        
      };
    }
  
    handleClick(i) {
      //need to add information about what rows or column it clicked 
        let index = (function (i){
            let rows = Math.floor(i/3) ;
            let columns = i%3;
            return [rows, columns];
        })(i); 
        
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; 
        const squares = current.squares.slice();
        const steps = current.steps.slice();
        const stepBy = current.stepBy.slice();
        //fetch prediction here 
        
        const winners  = calculateWinner(squares);

        if (winners|| squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        stepBy[history.length-1] = squares[i];
        steps[history.length-1] = index;
        //we can only get prediction here?
        const xPrediction = current.xPrediction.slice();
        const oPrediction = current.oPrediction.slice();
        fetch(this.state.localUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: 
            JSON.stringify({
              "top_left_square": `${squares[0]}`,
              "top_middle_square": `${squares[1]}`,
              "top_right_square": `${squares[2]}`,
              "middle_left_square": `${squares[3]}`,
              "middle_middle_square": `${squares[4]}`,
              "middle_right_square": `${squares[5]}`,
              "bottom_left_square": `${squares[6]}`,
              "bottom_middle_square": `${squares[7]}`,
              "bottom_right_square": `${squares[8]}`
            })
          }).then((res)=>{

              return res.json();
              
          }).then((jsonRes)=>{

              xPrediction[history.length-1] = jsonRes["x"];
              oPrediction[history.length-1] = jsonRes["o"];
          }).catch((err)=>{
              throw err;
          })
          //promise left 



        this.setState({
            history: history.concat([
            {
                squares: squares,
                steps: steps,
                stepBy: stepBy,
                xPrediction:xPrediction,
                oPrediction:oPrediction,
            }   
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
    
      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move:
          'Go to game start';
        const step_highlights = move ?
          'Move By ' +step.stepBy[move-1] + "   to   "+ step.steps[move-1]  :
          '';
        
        
        return (
          <li key={move}>
            {(() => {
              switch (this.state.stepNumber) {
                case move:
                    return  <p><button onClick={() => this.jumpTo(move) }><b>{desc}</b></button>     <b>{step_highlights}</b>  </p>;
                default:
                    return  <p><button onClick={() => this.jumpTo(move)}>{desc}</button>  {step_highlights}</p> ; 
             }
             })()}
             
          </li>
        );
      });
  
      let status;
      if (winner){
        status = "Winner: " + winner.player;
        
      }
      else if (! current.squares.includes(null)) {
        status = "Match Drawn ";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }

      let x_recent = current.xPrediction.slice(-1)
      const x_predict = x_recent? `X winning chance ${x_recent}`: "";

      let o_recent = current.oPrediction.slice(-1)
      const o_predict = o_recent? `O winning chance ${o_recent}`: "";      

      return (
        <div className="game">
          <div className="game-board">
            <Board
              winningSquares = {winner? winner.line: []}
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
           { 
                (!winner )?
                <div className="Prediction">
                    <div>{x_predict}</div>
                    <div>{o_predict}</div>
                </div>
                :""
          }
        </div>
      );
    }
  }

  /**
   * Helepr function 
   */
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {player:squares[a], line : [a,b,c]};
      }
    }
    return null;
  }
  


  export default Game;