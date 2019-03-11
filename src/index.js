import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


   
function Square(props) {
    return (
      <button  className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
        //   sty={this.props.bkg}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
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
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        history: [
          {
            squares: Array(9).fill(null),
          }
        ],
        counter: 0,
        stepNumber: 0,
        xIsNext: true,
        // winnerLine: Array(3).fill(null),
         winnerLine: {background :"white"},
         };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      if (calculateWinner(squares).winLine || squares[i]) {
          const winn = calculateWinner(squares);
          
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
            
          }
        ]),
        counter : this.state.counter + 1,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        winnerLine: this.state.winnerLine,

      });
    }
  
    jumpTo(step,btn) {
       
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        counter: step,
        
        
      });
      for(let i=0;i<btn.length;i++)
      btn[i].style.background="white";
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const box = document.querySelectorAll(".square");
      const squarebtn = document.getElementsByClassName("square");
     // const squarestyle = "white";
      const {winLine,square} = calculateWinner(current.squares);
    //    this.state.winnerLine = winner.winLine;  

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move  :
          'Go to game start';
          
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move,box)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winLine) {
        
         const[a,b,c]= winLine;
      
        this.state.winnerLine.background="blue";
        squarebtn[a].style.background = this.state.winnerLine.background;
        squarebtn[b].style.background = this.state.winnerLine.background;
        squarebtn[c].style.background = this.state.winnerLine.background;
        status = "Winner: " + square;
      }else if(this.state.counter===9 && winLine===null){
        status = "Match Draw";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
            //   bkg={this.state.winnerLine.background}
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
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
     // const win;
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
         let win ={
              winLine : lines[i],
              square: squares[a],
          };
         
        return win;
      }
    }
    return {winLine:null,square:null};
  }
  