import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

type sudokuN = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function App() {
  const Table: sudokuN[][] = []

  for (let row = 0; row < 9; row++) {
    Table[row] = []
    for (let i = 0; i < 9; i++) {
      Table[row][i] = 0
    }
  }

  return (
    <div className="App">
      <div style={{ display: "table" }}>
        {Table.map((row, rowi) =>
          <div key={rowi} style={{ display: "table-row" }}>
            {row.map((n, i) => {
              return <div
                className="Cell"
                key={i}
              >
                {n}
              </div>
            })
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
