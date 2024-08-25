import React, {useState, useEffect} from "react";
import "./Gameboard.css"; 
import {getRandomWord} from "../../utilities/api"
import {createBoardState} from "../../utilities/helpers"
import GuessRow from "../GuessRow/GuessRow"

export default function Gameboard(){
    
    const startingGuesses = 6 // default starting guesses (rows)
    const startingLetters = 5 // default starting letters (columns)
    const boardEvals = { // object containing board evaluation key / value pairs 
        inactive: "IA", 
        rightLetter_RightPlace: "RR",
        rightLetter_WrongPlace: "RW",
        wrongLetter_WrongPlace: "WW"
    }  

    // Board dimension states - sets up the Gameboard construction:

    const [keywordLetters, setKeywordLetters] = useState(startingLetters) // letters in the answer
    const [maxGuesses, setMaxGuesses] = useState(startingGuesses) // max attempts
    const [boardLetters, setBoardLetters] = useState(createBoardState(keywordLetters,maxGuesses,"")) // running tally of the guesses across the whole round
    const [boardEvaluated, setBoardEvaluated] = useState(createBoardState(keywordLetters,maxGuesses,boardEvals.inactive)) 
    const [keyword, setKeyword] = useState(getRandomWord(keywordLetters).toUpperCase()) // the answer
    const [guessNumber, setGuessNumber] = useState(0) // attempt number
    const [guess, setGuess] = useState("") // active guess 

    // keywordLetters update event handler:

    const updateKeywordLetters = (event) => {
        event.preventDefault()
        setKeywordLetters(Number(event.target.value))
        setKeyword(getRandomWord(Number(event.target.value)).toUpperCase())
        setBoardLetters(createBoardState(Number(event.target.value),maxGuesses,""))
        setBoardEvaluated(createBoardState(Number(event.target.value),maxGuesses,boardEvals.inactive))
        setGuessNumber(0)
    }

    // maxGuesses update event handler:

    const updateMaxGuesses = (event) => {
        event.preventDefault()
        setMaxGuesses(Number(event.target.value)) // reset max guesses
        setKeyword(getRandomWord(Number(event.target.value)).toUpperCase())
        setBoardLetters(createBoardState(keywordLetters,Number(event.target.value),"")) // reset boardstate
        setBoardEvaluated(createBoardState(keywordLetters,Number(event.target.value),boardEvals.inactive))
        setGuessNumber(0) // reset guess number
    }

    // updateGuess event handler:

    const updateGuess = (event) => {
        event.preventDefault()
        let string = event.target.value
        string = string.toUpperCase()
        setGuess(string)
    }

    const calculateGuess = (event) => {
        
        event.preventDefault()
        
        if(guessNumber === maxGuesses){
            return // exit if user is out of guesses
        }
        
        // 1. Update the letter state of the board 
        
        const guessArray = [...guess] // spread the guess into an Array
        const newBoardLetters = boardLetters.map(row => [...row]) // create a deep copy of the 2D state, so we don't update state directly
        newBoardLetters[guessNumber] = guessArray // update the copy of the board state with the guess inserted       
        setBoardLetters(newBoardLetters) // update the letter state of the board

        // 2. Evaluate the guess and update the evaluated state
        
        const evaluatedArray = Array(keywordLetters)
        const keywordArray = Array.from(keyword)
        const newBoardEvaluated = boardEvaluated.map(row => [...row])

        guessArray.forEach((x,index) => {
            if (x === keywordArray[index]) {
                evaluatedArray[index] = boardEvals.rightLetter_RightPlace
            } else if (keywordArray.some(y => x === y)) {
                evaluatedArray[index] = boardEvals.rightLetter_WrongPlace
            } else 
               evaluatedArray[index] = boardEvals.wrongLetter_WrongPlace         
        })

        newBoardEvaluated[guessNumber] = [...evaluatedArray] // update the 
        setBoardEvaluated(newBoardEvaluated) // update the evaluated state

        // 3. Update other relevant states

        setGuessNumber(guessNumber+1) // update the guess number

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
                    keywordLetters = {keywordLetters} // tell GuessRow how many letters (COLs) in the keyword
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
        </>
    )
}
