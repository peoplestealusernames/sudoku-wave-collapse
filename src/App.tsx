import React, { useState } from 'react';
import './App.css';
import { LeftPanel } from './LeftPanel';
import { GetAllowed } from './misc';
import { RightPanel } from './RightPanel';
import { TopBar } from './TopBar';

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

  function Reset() {
    setTable(
      [...new Array(9)].map(() =>
        [...new Array(9)].map(() =>
          [...new Array(10)].map((e, i) =>
            i !== 0
          )
        )
      )
    )
  }

  function CallUpdate(row: number, column: number, n: number) {
    UpdateTable(row, column, n)
    setTable([...Table])
  }

  function UpdateTable(row: number, column: number, n: number) {
    Table[row][column].forEach((v, i) => Table[row][column][i] = false)

    for (let i = 0; i < 9; i++)
      DissableCell(row, i, n)

    for (let i = 0; i < 9; i++)
      DissableCell(i, column, n)

    UpdateCell(Math.floor(row / 3), Math.floor(column / 3), n)
    Table[row][column][n] = true
  }

  function UpdateCell(gridrow: number, gridcolumn: number, n: number) {
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        DissableCell(r + gridrow * 3, c + gridcolumn * 3, n)
  }

  function DissableCell(row: number, column: number, n: number) {
    if (Table[row][column][n] === false)
      return

    Table[row][column][n] = false

    const allowed = GetAllowed(Table, row, column)
    if (allowed.length === 1)
      UpdateTable(row, column, allowed[0] as number)

  }

  function Cell(props: {
    row: number,
    col: number,
  }) {
    const Allowed = Table[props.row][props.col]

    const Choices = GetAllowed(Table, props.row, props.col)

    if (Choices.length === 1)
      return <div className="CellSelectLast">
        {Choices[0]}
      </div>

    if (Choices.length === 0)
      return <div className="CellSelectLast">
        ERR
      </div>

    return <div style={{ display: "table" }}>
      {[...new Array(3)].map((e, row) => <div key={row} style={{ display: "table-row" }}>
        {[...new Array(3)].map((e, col) => {
          const i = 1 + col + row * 3
          return <div key={col} className="CellSelect"
            onClick={() => {
              if (!Table[props.row][props.col][i])
                throw new Error("Cannot place here")

              CallUpdate(props.row, props.col, i as number)
            }}
            style={{
              cursor: Allowed[i] && Allowed.length > 0 ? "pointer" : "default",
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
      <TopBar />
      <LeftPanel Table={Table} SetTable={setTable} />
      <RightPanel Table={Table} CallUpdate={CallUpdate} ResetTable={Reset} />
      <div id="board" className="Board">
        {Table.map((row, rowi) =>
          <div
            key={rowi}
            style={{ display: "table-row" }}
          >
            {row.map((n, i) => {
              const percent = (GetAllowed(Table, rowi, i).length - 1) / 8

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
