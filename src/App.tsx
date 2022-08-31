import React, { useState } from 'react';
import './App.css';
import { LeftPanel } from './LeftPanel';

type sudokuN = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function App() {
  const [Table, setTable] = useState<boolean[][][]>(
    [...new Array(9)].map(() =>
      [...new Array(9)].map(() =>
        [...new Array(10)].map((e, i) =>
          i !== 0
        )
      )
    )
  ) //True= placeable

  function UpdateTable(row: number, column: number, n: sudokuN) {
    Table[row][column].forEach((v, i) => Table[row][column][i] = false)

    for (let i = 0; i < 9; i++)
      DissableCell(row, i, n)

    for (let i = 0; i < 9; i++)
      DissableCell(i, column, n)

    UpdateCell(Math.floor(row / 3), Math.floor(column / 3), n)
    Table[row][column][n] = true
  }

  function UpdateCell(gridrow: number, gridcolumn: number, n: sudokuN) {
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        DissableCell(r + gridrow * 3, c + gridcolumn * 3, n)
  }

  function DissableCell(row: number, column: number, n: sudokuN) {
    if (Table[row][column][n] === false)
      return

    Table[row][column][n] = false

    const allowed = GetAllowed(row, column)
    if (allowed.length === 1)
      UpdateTable(row, column, allowed[0] as sudokuN)

  }

  function GetAllowed(row: number, column: number) {
    const Ret = Table[row][column].map((e, i) => e ? i : undefined)
    return Ret.filter((e) => e)
  }

  function Cell(props: {
    row: number,
    col: number,
  }) {
    const Allowed = Table[props.row][props.col]

    return <div style={{ display: "table" }}>
      {[...new Array(3)].map((e, row) => <div key={row} style={{ display: "table-row" }}>
        {[...new Array(3)].map((e, col) => {
          const i = 1 + col + row * 3
          return <div key={col} className="CellSelect"
            onClick={() => {
              if (!Table[props.row][props.col][i])
                throw new Error("Cannot place here")

              UpdateTable(props.row, props.col, i as sudokuN)
              setTable([...Table])
            }}
          >
            {Allowed[i] ? i : ""}
          </div>
        })}
      </div>)}
    </div>
  }

  return (
    <div className="App">
      <LeftPanel Table={Table} />
      <div id="board" style={{ display: "table" }}>
        {Table.map((row, rowi) =>
          <div
            key={rowi}
            style={{ display: "table-row" }}
          >
            {row.map((n, i) => {
              const percent = (GetAllowed(rowi, i).length - 1) / 8

              const r = 255 * (1 - percent)
              const g = 255 * percent

              return <div
                key={i}
                className="Cell"
                style={{
                  backgroundColor: `rgb(${r * 1.25}, ${g * 1.25}, 0)`,
                  ...rowi % 3 === 0 ? { borderTop: "3px solid black" } : {},
                  ...rowi % 3 === 2 ? { borderBottom: "3px solid black" } : {},
                  ...i % 3 === 0 ? { borderLeft: "3px solid black" } : {},
                  ...i % 3 === 2 ? { borderRight: "3px solid black" } : {},
                }}
              >
                <Cell row={rowi} col={i} />
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
