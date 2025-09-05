import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const SIZE = 4;
  const [grid, setGrid] = useState([]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    initGrid();
  }, []);

  const initGrid = () => {
    let arr = [...Array(SIZE * SIZE).keys()].map((x) => x); // 0 to 15
    arr = shuffle(arr);
    setGrid(arr);
    setMoves(0);
    setSolved(false);
  };
  const shuffle = (array) => {
    let a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const handleClick = (index) => {
    const emptyIndex = grid.indexOf(0);
    const isAdjacent = checkAdjacent(index, emptyIndex);
    if (!isAdjacent) return;

    let newGrid = [...grid];
    [newGrid[index], newGrid[emptyIndex]] = [
      newGrid[emptyIndex],
      newGrid[index],
    ];
    setGrid(newGrid);
    setMoves(moves + 1);

    if (checkSolved(newGrid)) setSolved(true);
  };

  const checkAdjacent = (i1, i2) => {
    const row1 = Math.floor(i1 / SIZE);
    const col1 = i1 % SIZE;
    const row2 = Math.floor(i2 / SIZE);
    const col2 = i2 % SIZE;

    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
  };

  const checkSolved = (arr) => {
    for (let i = 0; i < SIZE * SIZE - 1; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return arr[SIZE * SIZE - 1] === 0;
  };

  return (
    <div className="App">
      <h1>4x4 Sliding Puzzle Game</h1>
      <button onClick={initGrid}>Restart</button>
      <p>Moves: {moves}</p>
      {solved && <h2>🎉 Puzzle Solved!</h2>}
      <div className="grid">
        {grid.map((num, idx) => (
          <div
            key={idx}
            className={`cell ${num === 0 ? "empty" : ""}`}
            onClick={() => handleClick(idx)}
          >
            {num !== 0 ? num : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
