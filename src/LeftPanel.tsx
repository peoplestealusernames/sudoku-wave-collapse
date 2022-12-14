import { useState, useEffect } from "react"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { ProgressBar } from "./ProgressBar"

const BarStyle: React.CSSProperties = {
    margin: "1px",
    padding: "2px",
    border: "1px solid rgb(60,60,75)",
    borderRadius: "5px",
    width: "90%",
}

const TableStyle: React.CSSProperties = {
    display: "table-cell",
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

    const DisplayTable: { display: string, value: any }[] = [
        {
            display: "Locked",
            value: locked
        },
        {
            display: "Choices",
            value: remaining
        },
        {
            display: "Errors",
            value: errors
        }
    ]

    return <div id="left panel" className="LeftPanel">
        <AiOutlineInfoCircle style={{
            position: "absolute",
            top: "-16px",
            left: "calc(50% - 15px)",
            width: "30px",
            height: "30px",
            backgroundImage: "radial-gradient(black 10px, rgba(0,0,0,0) 10px)",
        }} />
        <span style={{
            ...BarStyle,
            position: "absolute",
            top: "15px"
        }}>
            Click on number to start collapse
        </span>
        <ProgressBar
            style={{ ...BarStyle, backgroundColor: "rgb(25, 25, 35)" }}
            greenstyle={{ backgroundColor: "rgb(50, 50, 60)" }}
            progress={Math.round((1 - (remaining / 729)) * 1000) / 10}
        />
        <div style={{
            ...BarStyle,
            paddingLeft: "10px",
            paddingRight: "10px",
            display: "table"
        }}>
            {DisplayTable.map((e, i) => <div style={{
                display: "table-row",
            }}>
                <span style={{
                    ...TableStyle,
                    width: "45%",
                    textAlign: "left",
                }}>
                    {e.display}
                </span>
                :
                <span style={{
                    ...TableStyle,
                    width: "45%",
                    textAlign: "right",
                }}>
                    {e.value}
                </span>
            </div>)}
        </div>
    </div>
}