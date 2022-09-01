


export function ProgressBar(props: {
    progress: number
    style?: React.CSSProperties
    greenstyle?: React.CSSProperties
    teststyle?: React.CSSProperties
}) {
    return <div style={{
        position: "relative",
        display: "flex",
        verticalAlign: "center",
        alignItems: "center",
        backgroundColor: "red",
        justifyContent: "center",
        minHeight: "14px",
        ...props.style
    }}>
        <div style={{
            position: "absolute",
            display: "flex",
            left: "0px",
            top: "0px",
            height: "100%",
            width: `${props.progress}%`,
            backgroundColor: "green",
            ...props.greenstyle
        }} />
        <div style={{
            position: "absolute",
            display: "flex",
            left: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            verticalAlign: "center",
            fontSize: "16px",
            ...props.teststyle
        }} >
            {props.progress}%
        </div>
    </div>
}