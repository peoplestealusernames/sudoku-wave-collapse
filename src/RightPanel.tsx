import { useEffect, useState } from "react"
import { GetAllowed, GetRandomIndex, GetRandomValue } from "./misc"
import { GoPlay } from "react-icons/go"

const ButtonStyle: React.CSSProperties = {
    margin: "1px",
    padding: "2px",
    border: "1px solid rgb(60,60,75)",
    borderRadius: "5px",
    cursor: "pointer",
    width: "90%",
}

export function RightPanel(props: {
    Table: boolean[][][]
    CallUpdate: (row: number, col: number, n: number) => void
    ResetTable: () => void
}) {
    const [timer, settimer] = useState<undefined | NodeJS.Timer>(undefined)

    function Step() {
        //TODO: redo if err is created
        const [worked, pass] = SolveStep(props.Table)

        if (!worked || !pass)
            throw new Error("Could not step")
        props.CallUpdate(...pass)
    }

    function RandomStep() {
        //TODO: redo if err is created
        const [worked, pass] = GetRandomStep(props.Table)

        if (!worked || !pass)
            throw new Error("Could not step")
        props.CallUpdate(...pass)
    }

    function ToggleTimer() {
        if (timer)
            clearTimer()
        else {
            const t = setInterval(() => {
                try { Step() } catch (e) {
                    clearInterval(t)
                    clearTimer()
                    console.error("Passing error from stepTimer: \n" + e)
                }
            }, 100)
            settimer(t)
        }
    }

    useEffect(() => {
        return () => {
            clearTimer()
        }
    }, [])

    function clearTimer() {
        clearTimeout(timer)
        settimer(undefined)
    }

    return <div id="right panel" className="RightPanel">
        <GoPlay style={{
            position: "absolute",
            top: "-16px",
            left: "calc(50% - 15px)",
            width: "30px",
            height: "30px",
            backgroundImage: "radial-gradient(black 10px, rgba(0,0,0,0) 10px)",
        }} />
        <div
            style={ButtonStyle}
            onClick={props.ResetTable}
        >
            Reset
        </div>
        <div
            style={ButtonStyle}
            onClick={() => { while (true) { Step() } }}
        >
            Collapse
        </div>
        <div
            style={ButtonStyle}
            onClick={ToggleTimer}
        >
            Toggle collapse
        </div>
        <div
            style={ButtonStyle}
            onClick={Step}
        >
            Step Collapse
        </div>
        <div
            style={ButtonStyle}
            onClick={RandomStep}
        >
            Collapse Random
        </div>
    </div>
}

function SolveStep(Table: boolean[][][]): [false] | [true, [row: number, col: number, n: number]] {
    let choices: number = 10000//TODO: better implimentation
    let best: [row: number, col: number][] = []

    Table.forEach((row, rowi) => row.forEach((e, i) => {
        const l = GetAllowed(Table, rowi, i).length

        if (l < 2)
            return

        if (choices > l) {
            choices = l
            best = [[rowi, i]]
        } else if (choices === l) {
            best.push([rowi, i])
        }
    }))

    if (best.length === 0)
        return [false]

    const cell = GetRandomValue(best)
    const allowed = GetAllowed(Table, cell[0], cell[1])
    const n = GetRandomValue(allowed)

    return [true, [cell[0], cell[1], n]]
}

function GetRandomStep(Table: boolean[][][]): [false] | [true, [row: number, col: number, n: number]] {
    const [_, cell] = GetRandomTile(Table)

    if (!cell)
        throw new Error("Random cell not found")

    const allowed = GetAllowed(Table, cell[0], cell[1])
    const n = GetRandomValue(allowed)

    return [true, [cell[0], cell[1], n]]
}

function GetRandomTile(Table: boolean[][][]): [false] | [true, [row: number, col: number]] {
    for (let i = 0; i < 1000; i++) {
        const rowi = GetRandomIndex(Table)
        const coli = GetRandomIndex(Table[rowi])
        const l = GetAllowed(Table, rowi, coli).length

        if (l < 2)
            continue

        return [true, [rowi, coli]]
    }
    return [false]
}