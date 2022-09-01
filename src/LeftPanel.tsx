import { useState, useEffect } from "react"
import { ProgressBar } from "./ProgressBar"

const BarStyle: React.CSSProperties = {
    margin: "1px",
    padding: "2px",
    border: "1px solid rgb(60,60,75)",
    borderRadius: "5px",
    width: "90%",
}

export function LeftPanel(props: {
    Table: boolean[][][]
    SetTable: (Table: boolean[][][]) => void
}) {
    const [locked, setlocked] = useState<number>(0)
    const [errors, seterros] = useState<number>(0)
    const [remaining, setremaining] = useState<number>(0)

    useEffect(() => {
        let total = 0
        let newLocked = 0
        let newErr = 0

        props.Table.forEach(row =>
            row.forEach((e) => {
                const l = e.filter((e) => e).length
                total += l
                if (l === 1)
                    newLocked += 1
                else if (l === 0)
                    newErr += 1
            })
        );

        seterros(newErr)
        setlocked(newLocked)
        setremaining(total - newLocked)
    }, [props.Table])

    return <div id="left panel" className="LeftPanel">
        <ProgressBar
            style={BarStyle}
            progress={Math.round((1 - (remaining / 729)) * 1000) / 10}
        />
        <span style={{
            ...BarStyle,
            position: "absolute",
            top: "10px"
        }}>
            Click on number to start collapse
        </span>
        <span style={BarStyle}>
            Total locked cells: {locked}
        </span>
        <span style={BarStyle}>
            Total choices: {remaining}
        </span>
        <span style={BarStyle}>
            Total errors: {errors}
        </span>
    </div>
}