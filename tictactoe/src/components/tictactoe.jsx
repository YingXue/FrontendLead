import React from 'react';
import './tictactoe.css';

const winnerPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const calculateWinner = (cells) => {
    for (let pattern of winnerPatterns) {
        if (cells[pattern[0]] && cells[pattern[0]] === cells[pattern[1]] && cells[pattern[0]] === cells[pattern[2]]) {
            return cells[pattern[0]];
        } // return winner
    }
}

export const Tictactoe = () => {
    const [cells, setCells] = React.useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = React.useState(true);

    const handleClick = (index) => {
        const newCells = [...cells];
        newCells[index] = isXNext ? 'X' : 'O';
        setCells(newCells);
        setIsXNext(!isXNext);

        const winner = calculateWinner(newCells);
        console.log('Winner:', winner);
        console.log('Current Cells:', newCells);
        if (winner) {
           alert(`Winner: ${winner}`);
           return;
        }
    }

    return (
        <div className="tictactoe-container">
            <h1>Tic Tac Toe</h1>
            <p>Welcome to the Tic Tac Toe game!</p>
            <p>Click on a square to make your move.</p>
            <p>Try to get three in a row!</p>
            <div className='board'>
                 {cells.map((cell, index) => (
                    <div
                        key={index}
                        className='cell'
                        onClick={() => handleClick(index)}
                    >{cell}</div>
                 ))}
            </div>
        </div>
    );
}

export default Tictactoe;