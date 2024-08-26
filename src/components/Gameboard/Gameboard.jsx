import React, {useState} from "react";
import "./Gameboard.css"; 
import {getRandomWord} from "../../utilities/api"
import {createBoardState} from "../../utilities/helpers"
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
    const roundStatusMessages = {
        active: "Guess the secret word!",
        won: "You won!",
        lost: "You lost!"
    }


    // WordleFlex States:

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
        setKeyword(getRandomWord(Number(event.target.value)).toUpperCase())
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

    // Calculate Guess 

    const calculateGuess = (event) => {
        
        event.preventDefault()
        
        // 1. Exit if the user is out of guesses, or round state is not active
        
        if(guessNumber === maxGuesses || roundStatus !== roundStatuses.active ){
            return 
        }

        // 2. Update the letter state of the board 
        
        // spread the guess into an Array:
        const guessArray = [...guess] 
        // create a deep copy of the 2D state, so we don't update state directly:
        const newBoardLetters = boardLetters.map(row => [...row]) 
        // update the copy of the board state with the guess inserted:
        newBoardLetters[guessNumber] = guessArray 
        // update the letter state of the board:
        setBoardLetters(newBoardLetters) 

        // 3. Evaluate the guess and update the evaluated state and guess number
        
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

        // 4. Check if the player won or lost and update the round status and status text

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
                return "Guess the word!"
            case roundStatuses.won:
                return "You won!"
            case roundStatuses.lost:
                return "You lost!"
        }
    }

    return (
        <>
        <form className="settings">
            <label>Letters:</label>
            <input 
                id="LettersInput" 
                type="number" 
                min={4} 
                max={8}
                value={keywordLetters}
                onChange={updateKeywordLetters}
            />
            <label>Guesses:</label>
            <input 
                id="GuessesInput" 
                type="number" 
                min={2} 
                max={8}
                value={maxGuesses}
                onChange={updateMaxGuesses}
            />
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
            <label>Guess:</label>
            <input 
                type="text" 
                minLength={keywordLetters} 
                maxLength={keywordLetters}
                onChange={updateGuess}
            />
            <input 
                type="submit" 
                value="Guess"
            />
        </form>
        <div className="statusInfo">
           <h2>{statusText}</h2>
        </div>
        </>
    )
}
