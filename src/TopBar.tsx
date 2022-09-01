import React from "react"
import { AiOutlineGithub } from "react-icons/ai"

const ItemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    verticalAlign: "center",
    color: "rgb(200,200,210)",
}

export function TopBar() {

    return <div
        style={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            height: "35px",
            top: "0px",
            backgroundColor: "rgb(40,40,50)",
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            verticalAlign: "center",
            borderBottom: "2px solid grey",
            color: "rgb(220,220,230)",
            fontSize: "26px",
            userSelect: "none",
        }}
    >
        <span
            style={{
                ...ItemStyle
            }}
        >
            Sudoku Collapse
        </span>
        <AiOutlineGithub
            size={27}
            href="https://github.com/peoplestealusernames/sudoku-wave-collapse#readme"
            style={{
                position: "absolute",
                right: "10px"
            }}
        />
    </div>
}