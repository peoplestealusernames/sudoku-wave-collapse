

export function GetAllowed(Table: boolean[][][], row: number, column: number) {
    const Ret = Table[row][column].map((e, i) => e ? i : undefined)
    return Ret.filter((e) => e)
}

export function GetRandomIndex(arr: any[]) {
    return Math.floor(Math.random() * arr.length)
}

export function GetRandomValue(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)]
}