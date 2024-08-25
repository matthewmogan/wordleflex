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

    // Gameboard states:

    const [boardLetters, setBoardLetters] = useState(createBoardState(keywordLetters,maxGuesses,"")) // running tally of the guesses across the whole round
    const [boardEvaluated, setBoardEvaluated] = useState(createBoardState(keywordLetters,maxGuesses,boardEvals.inactive)) 

    //  Active game parameters: 

    const [keyword, setKeyword] = useState(getRandomWord(keywordLetters)) // the answer
    const [guessNumber, setGuessNumber] = useState(0) // attempt number
    const [guess, setGuess] = useState("") // active guess 

    // keywordLetters update event handler:

    const updateKeywordLetters = (event) => {
        event.preventDefault()
        setKeywordLetters(Number(event.target.value))
    }
    useEffect(() => { // reset game after keyword letters change
        setKeyword(getRandomWord(keywordLetters)) // reset keyword
        setBoardLetters(createBoardState(keywordLetters,maxGuesses,"")) // reset boardstate
        setGuessNumber(0) // reset guess number
    }, [keywordLetters])

    // maxGuesses update event handler:

    const updateMaxGuesses = (event) => {
        event.preventDefault()
        setMaxGuesses(Number(event.target.value)) // reset max guesses
    }
    useEffect( () => {
        setBoardLetters(createBoardState(keywordLetters,maxGuesses,"")) // reset boardstate
        setGuessNumber(0) // reset guess number
    },[maxGuesses])

    // updateGuess event handler:

    const updateGuess = (event) => {
        event.preventDefault()
        setGuess(event.target.value)
    }

    const calculateGuess = (event) => {
        
        event.preventDefault()
        
        if(guessNumber === maxGuesses){
            return // exit if user is out of guesses
        }
        
        // 1. Update the letter state of the board 
        
        const guessArray = [...guess] // spread the guess into an Array
        const newState = [...boardLetters] // create a copy of the state, so we don't update state directly
        newState[guessNumber] = guessArray // update the copy of the board state with the guess inserted       
        
        // 2. Evaluate the guess and update the evaluated state
        
        const evaluatedArray = [...boardEvaluated]
        const keywordArray = Array.from(keyword)

        guessArray.forEach((x,index) => {
            if (x === keywordArray[index]) {
                evaluatedArray[guessNumber][index] = boardEvals.rightLetter_RightPlace
            } else if (keywordArray.some(y => x === y)) {
                evaluatedArray[guessNumber][index] = boardEvals.rightLetter_WrongPlace
            } else 
               evaluatedArray[guessNumber][index] = boardEvals.wrongLetter_WrongPlace         
        })

        // 3. Update relevant states
        
        setBoardLetters(newState) // update the letter state of the board
        setGuessNumber(guessNumber+1) // update the guess number


    }

    return (
        <>
        <div className="container">    
           {[...Array(maxGuesses).keys()].map((arg) => {
            return(
                <GuessRow
                    key = {arg}
                    id = {arg}
                    keywordLetters = {keywordLetters} 
                />
            )
           })}
        </div>
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
