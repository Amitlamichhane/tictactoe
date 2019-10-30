
import React from 'react';
import Square from './Square'
import '../index.css'

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          gameWon ={this.props.winningSquares.includes(i)}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    renderBoard(n){
      return <div className="board-row">{this.loopedSuared(n)}</div>;
    }
    loopedSuared(n){
      let sq = [];
  
      for (let index = n; index < n+3; index++) {
        sq.push(this.renderSquare(index));
      }
      return sq;
    }
  
    render() {
      return (
        <div>
          {this.renderBoard(0)}
          {this.renderBoard(3)}
          {this.renderBoard(6)}
       </div>
      );
    }
    
  }

  export default Board;