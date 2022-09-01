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
    color: "rgb(175,175,200)",
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
            justifyContent: "start",
            justifyItems: "center",
            verticalAlign: "center",
            borderBottom: "2px solid grey",
            color: "rgb(175,175,200)",
            fontSize: "25px",
            userSelect: "none",
        }}
    >
        <a style={{ ...ItemStyle, marginLeft: "10px" }} href="https://github.com/peoplestealusernames/sudoku-wave-collapse#readme">
            <AiOutlineGithub size={27} />
            Github
        </a>
    </div>
}