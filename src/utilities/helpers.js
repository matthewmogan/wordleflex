export function createBoardState(letters, rows) {
    let boardState = []
    for (let i = 0; i < rows; i++){
        boardState[i] = Array(letters).fill("")
    }
    return boardState
}

