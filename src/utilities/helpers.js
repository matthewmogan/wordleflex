export function createBoardState(letters, rows, fill) {
    let boardState = []
    for (let i = 0; i < rows; i++){
        boardState[i] = Array(letters).fill(fill)
    }
    return boardState
}

export function checkWordByRegExp(word, length) {
    // This regex checks for a string that is exactly 'length' characters long, contains only letters (no numbers, no spaces)
    const regex = new RegExp(`^[A-Za-z]{${length}}$`);
    return regex.test(word);
}
