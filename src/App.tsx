import React, { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';

type sudokuN = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type sudokuSelector = Exclude<sudokuN, 0>

function App() {
  const [Table, setTable] = useState<sudokuN[][]>([])
  const [selected, setselected] = useState<sudokuSelector>(1)

  useMemo(() => {
    for (let row = 0; row < 9; row++) {
      Table[row] = []
      for (let i = 0; i < 9; i++) {
        Table[row][i] = 0
      }
    }
  }, [])

  return (
    <div className="App">
      <div style={{ position: "absolute", top: "0px", border: "1px solid black" }}>
        {[...new Array(8)].map((e, i) => {
          return <div
            className='Cell'
            key={i}
            style={{ backgroundColor: i + 1 === selected ? "red" : "white" }}
            onClick={() => { setselected((i + 1) as sudokuSelector) }}
          >
            {i + 1}
          </div>
        })}
      </div>
      <div style={{ display: "table" }}>
        {Table.map((row, rowi) =>
          <div
            key={rowi}
            style={{ display: "table-row" }}
          >
            {row.map((n, i) => {
              return <div
                className="Cell"
                key={i}
                style={{
                  ...rowi % 3 == 0 ? { borderTop: "3px solid black" } : {},
                  ...rowi % 3 == 2 ? { borderBottom: "3px solid black" } : {},
                  ...i % 3 == 0 ? { borderLeft: "3px solid black" } : {},
                  ...i % 3 == 2 ? { borderRight: "3px solid black" } : {},
                }}
              >
                {n == 0 ? "" : n}
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
