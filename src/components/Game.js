
import React from 'react';

import Board from './Board'
import '../index.css'
import { placeholder } from '@babel/types';


class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
            steps: Array(0).fill(null),
            stepBy: Array(0).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
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
        const winners  = calculateWinner(squares);
        if (winners|| squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";
        stepBy[history.length-1] = squares[i];
        steps[history.length-1] = index;

        this.setState({
            history: history.concat([
            {
                squares: squares,
                steps: steps,
                stepBy: stepBy,
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
                    return  <p><button onClick={() => this.jumpTo(move) }><b>{desc}</b></button>     <b>{step_highlights}</b></p>
                    ;
                default:
                    return  <p><button onClick={() => this.jumpTo(move)}>{desc}</button>  {step_highlights} </p>  ;
             }
             })()}
             
          </li>
        );
      });
  
      let status;
      if (winner === -1) {
        status = "Match Drawn ";
      } else if (winner){
        status = "Winner: " + winner.player;
        
      }else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
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
    for (let i = 0; i< squares.length; i++) {
       if (!squares[i]){
           return null;
       }
    }
    return -1;
  }
  


  export default Game;