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
    const [lock, setLock] = React.useState(false); // lock the game util reset

    React.useEffect(() => {
        const winner = calculateWinner(cells);
        if (winner) {
            setTimeout(() => {
                alert(`Winner: ${winner}`);
            },100);
            setLock(true);
        }
    },[cells]);

    const handleClick = (index) => {
        if (lock) return; // if the game is locked, do nothing
        if (cells[index]) return; // if the cell is already filled, do nothing
        
        const newCells = [...cells];
        newCells[index] = isXNext ? 'X' : 'O';
        setCells(newCells);
        setIsXNext(!isXNext);    
    }

    const resetBoard = () => {
        setCells(Array(9).fill(null));
        setIsXNext(true);
        setLock(false); // unlock the game
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
            <button onClick={resetBoard}>Reset</button>
        </div>
    );
}

export default Tictactoe;