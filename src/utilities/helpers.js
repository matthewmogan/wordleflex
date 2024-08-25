export function createBoardState(letters, rows, fill) {
    let boardState = []
    for (let i = 0; i < rows; i++){
        boardState[i] = Array(letters).fill(fill)
    }
    return boardState
}

