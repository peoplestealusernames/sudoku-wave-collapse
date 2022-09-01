import { useState, useEffect } from "react"



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
        console.log("A");

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
        <span>
            Total locked cells: {locked}
        </span>
        <span>
            Total choices: {remaining}
        </span>
        <span>
            Total errors: {errors}
        </span>
    </div>
}