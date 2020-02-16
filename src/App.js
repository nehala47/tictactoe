import React from 'react';
import './component/tic.css';
import ReactDOM from 'react-dom'; //importing react dom
function Square(props) {    
    return (
      <button className="square" onClick={props.onClick}>   
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {         //adding the values 0-8 in each of the squares
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (          //rendering values for each boxes in the table as 0-8 by calling rendersquare method
        //for each row
        <div>
          <div className="board-row"> 
            {this.renderSquare(0)}          
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)        //initially filling all the squares as null value
          }
        ],
        stepNumber: 0,        //the step number is assigned,as the steps are being counted
        xIsNext: true         //checking if it is X player's chance
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);   
      const current = history[history.length - 1];    //length is decrementing
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) { //checking if the player has won the game if yes then return 
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";  //if no one is the winner the checking whose chance is it to play
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,   //assigning the length
        xIsNext: !this.state.xIsNext    //assigning the value to know whose chance is it to play
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step, //assigning the passed step to step number
        xIsNext: (step % 2) === 0     //every even step is X chance so true or false is assigned
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);  //calling function in which it tells that if a player has won or not
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button> 
          </li>
        );//calling jump to method so as to jump to a particular step)
      });
  
      let status;
      if (winner) {
        status = "Winner: " + winner;   //assigning status as who is won if a player has won the game
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");//if not won then assigning which player shoul play the next move
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}  //calling handle click function
            />
          </div>
          <div className="game-info">
            <div>{status}</div> 
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }//showing up the status and moves
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {//checking if the player is a winner or not
    const lines = [             //all possible win moves
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
        return squares[a];
      }
    }
    return null;
  }
