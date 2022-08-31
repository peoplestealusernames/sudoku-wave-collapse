import { useEffect, useState } from "react"
import { GetAllowed, GetRandomValue } from "./misc"

export function RightPanel(props: {
    Table: boolean[][][]
    CallUpdate: (row: number, col: number, n: number) => void
}) {
    const [timer, settimer] = useState<undefined | NodeJS.Timer>(undefined)

    function Step() {
        const [worked, pass] = SolveStep(props.Table)

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
        <div
            onClick={() => { while (true) { Step() } }}
        >
            Collapse
        </div>
        <div
            onClick={ToggleTimer}
        >
            Toggle collapse
        </div>
        <div
            onClick={Step}
        >
            Step Collapse
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