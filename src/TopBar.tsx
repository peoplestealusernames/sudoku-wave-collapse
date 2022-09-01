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
            justifyContent: "center",
            justifyItems: "center",
            verticalAlign: "center",
            borderBottom: "2px solid grey",
            color: "rgb(175,175,200)",
            fontSize: "20px"
        }}
    >
        <a style={ItemStyle} href="https://github.com/peoplestealusernames/sudoku-wave-collapse#readme">
            <AiOutlineGithub size={23} />
            Github
        </a>
    </div>
}