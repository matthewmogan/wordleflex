import React, {useState} from "react";
import "./Gameboard.css"; 
import {getRandomWord} from "../../utilities/modules"
import {createBoardState, checkWordByRegExp} from "../../utilities/helpers" 
import {validateWord} from "../../utilities/apis";
import GuessRow from "../GuessRow/GuessRow"

export default function Gameboard(){
    
    // default starting guesses (rows) and letters (columnns):
    const startingGuesses = 6 
    const startingLetters = 5
    // object containing board evaluation key / value pairs: 
    const letterEvals = {  
        inactive: "inactive", 
        rightLetter_RightPlace: "rightLetter_RightPlace",
        rightLetter_WrongPlace: "rightLetter_WrongPlace",
        wrongLetter_WrongPlace: "wrongLetter_WrongPlace"
    }  
    // round status state values:
    const roundStatuses = {
        active: "active",
        won: "won",
        lost: "lost"
    }
    
    // letters in the answer:
    const [keywordLetters, setKeywordLetters] = useState(startingLetters) 
    // max guess attempts per round:
    const [maxGuesses, setMaxGuesses] = useState(startingGuesses)
    // 2D array representing the guessed letters:
    const [boardLetters, setBoardLetters] = useState(createBoardState(keywordLetters,maxGuesses,"")) 
    // 2D array representing the evaluated guesses:' 
    const [boardEvaluated, setBoardEvaluated] = useState(createBoardState(keywordLetters,maxGuesses,letterEvals.inactive)) 
    // the answer:
    const [keyword, setKeyword] = useState(getRandomWord(keywordLetters).toUpperCase()) 
    // attempt number:
    const [guessNumber, setGuessNumber] = useState(0) 
    // active guess: 
    const [guess, setGuess] = useState("") 
    // tracks whether the round is in progress, won, or lost:
    const [roundStatus, setRoundStatus] = useState(roundStatuses.active)
    
    // round status messages
    const roundStatusMessages = {
        active: "Guess the secret word!",
        won: "You won!",
        lost: "You lost! The word was", // keyword is appended when rendered
        invalidWord: `Guess must be a valid, ${keywordLetters} letter English word, no numbers, spaces, or special characters`
    }
    
    // text to display how many guesses the player has left, and if they won or lost
    const [statusText, setStatusText] = useState(roundStatusMessages.active)

    // keywordLetters update event handler - gets a new keyword of a certain length, resets the board and restarts the game

    const updateKeywordLetters = (event) => {
        event.preventDefault()
        setKeywordLetters(Number(event.target.value))
        setKeyword(getRandomWord(Number(event.target.value)).toUpperCase())
        setBoardLetters(createBoardState(Number(event.target.value),maxGuesses,""))
        setBoardEvaluated(createBoardState(Number(event.target.value),maxGuesses,letterEvals.inactive))
        setGuessNumber(0)
        setRoundStatus(roundStatuses.active)
        setStatusText(roundStatusMessages.active)
    }

    // maxGuesses update event handler - adds or subtracts guess rows from the board. resets the board and restarts the game

    const updateMaxGuesses = (event) => {
        event.preventDefault()
        setMaxGuesses(Number(event.target.value)) 
        setKeyword(getRandomWord(keywordLetters).toUpperCase())
        setBoardLetters(createBoardState(keywordLetters,Number(event.target.value),""))
        setBoardEvaluated(createBoardState(keywordLetters,Number(event.target.value),letterEvals.inactive))
        setGuessNumber(0) 
        setRoundStatus(roundStatuses.active)        
        setStatusText(roundStatusMessages.active)
    }

    // updateGuess event handler - capitalizes the user guess and logs the guess in state

    const updateGuess = (event) => {
        event.preventDefault()
        let string = event.target.value
        string = string.toUpperCase()
        setGuess(string)
    }

    const resetGame = (event) => {
        event.preventDefault()
        setKeyword(getRandomWord(keywordLetters).toUpperCase())
        setBoardLetters(createBoardState(keywordLetters,maxGuesses,""))
        setBoardEvaluated(createBoardState(keywordLetters,maxGuesses,letterEvals.inactive))
        setGuessNumber(0) 
        setRoundStatus(roundStatuses.active)        
        setStatusText(roundStatusMessages.active)
    }

    // Calculate Guess 

    async function calculateGuess (event) {
        
        event.preventDefault()
        
        // 1. Exit if the user is out of guesses, or round state is not active
        
        if(guessNumber === maxGuesses || roundStatus !== roundStatuses.active ){
            return 
        }

        // 2. Check if the word is a) the correct number of letters, and no spaces or numbers, and whether b) the word is a valid english language word

        const check1 = checkWordByRegExp(guess, keywordLetters)
        const check2 = await validateWord(guess)

        if (!check1 || !check2){
            setStatusText(roundStatusMessages.invalidWord)
            console.log("invalid")
            return
        } else {
            setStatusText(roundStatusMessages.active)
        }

        // 3. Update the letter state of the board 
        
        // spread the guess into an Array:
        const guessArray = [...guess] 
        // create a deep copy of the 2D state, so we don't update state directly:
        const newBoardLetters = boardLetters.map(row => [...row]) 
        // update the copy of the board state with the guess inserted:
        newBoardLetters[guessNumber] = guessArray 
        // update the letter state of the board:
        setBoardLetters(newBoardLetters) 

        // 4. Evaluate the guess and update the evaluated state and guess number. Reset the guess
        
        const evaluatedArray = Array(keywordLetters)
        const keywordArray = Array.from(keyword)
        const newBoardEvaluated = boardEvaluated.map(row => [...row])
        guessArray.forEach((x,index) => {
            if (x === keywordArray[index]) {
                evaluatedArray[index] = letterEvals.rightLetter_RightPlace
            } else if (keywordArray.some(y => x === y)) {
                evaluatedArray[index] = letterEvals.rightLetter_WrongPlace
            } else 
               evaluatedArray[index] = letterEvals.wrongLetter_WrongPlace         
        })
        newBoardEvaluated[guessNumber] = [...evaluatedArray] 
        setBoardEvaluated(newBoardEvaluated) 
        setGuessNumber(guessNumber+1)
        setGuess("") 

        // 5. Check if the player won or lost and update the round status and status text

        if(evaluatedArray.every((x) => x === letterEvals.rightLetter_RightPlace)){
            setRoundStatus(roundStatuses.won) 
            setStatusText(updateStatusText(roundStatuses.won))
        } else if (guessNumber+1 === maxGuesses) {
            setRoundStatus(roundStatus.lost, guessNumber+1)
            setStatusText(updateStatusText(roundStatuses.lost))
        }

    }

    const updateStatusText = (status) => {
        switch(status) {
            case roundStatuses.active:
                return roundStatusMessages.active
            case roundStatuses.won:
                return roundStatusMessages.won
            case roundStatuses.lost:
                return roundStatusMessages.lost + " " + keyword
            default:
                return roundStatusMessages.active
        }
    }

    const handleKeyDown = (event) => {
        event.preventDefault();
      };    

    return (
        <>
        <form className="settings">
            <label>Letters</label>
            <input 
                className="gameParameters" 
                type="number" 
                min={4} 
                max={7}
                value={keywordLetters}
                onChange={updateKeywordLetters}
                onKeyDown={handleKeyDown}
            />
            <label>Guesses</label>
            <input 
                className="gameParameters"
                type="number" 
                min={4} 
                max={8}
                value={maxGuesses}
                onChange={updateMaxGuesses}
                onKeyDown={handleKeyDown}
            />
            <button 
                className="resetButton" 
                onClick={resetGame}
            >Reset
            </button>
        </form>
        <div className="container">    
           {[...Array(maxGuesses).keys()].map((arg) => {
            return(
                <GuessRow
                    key = {arg}
                    id = {arg} // tell GuessRow which ROW it is
                    keywordLetters = {keywordLetters} // tell GuessRow how many letters (COL) in the keyword
                    boardLetters = {boardLetters} // Allow GuessRow to pass the Letters their value
                    boardEvaluated = {boardEvaluated} // Allow GuessRow to pass the Letters their evaluation class
                />
            )
           })}
        </div>
        <form className="guess" onSubmit={calculateGuess}>
            <input 
                className="guessInput"
                type="text" 
                minLength={keywordLetters} 
                maxLength={keywordLetters}
                onChange={updateGuess}
                value={guess}
            />
            <input 
                className="guessButton"
                type="submit" 
                value="Guess"
            />
        </form>
        <h2 className="statusInfo">{statusText}</h2>
        </>
    )
}
