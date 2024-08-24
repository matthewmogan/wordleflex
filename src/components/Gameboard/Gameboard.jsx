import React, {useState} from "react";
import "./Gameboard.css"; 
import {getRandomWord} from "../../utilities/api"
import {createBoardState} from "../../utilities/helpers"
import GuessRow from "../GuessRow/GuessRow"

export default function Gameboard(){
    
    // WordleFlex states 
    
    const [keywordLetters, setkeywordLetters] = useState(5) 
    // minimum 3, maximum 8 - letters in the keyword
    const [keyword, setKeyword] = useState(getRandomWord(5)) 
    // this is the word the player is guessing
    const [guessNumber, setGuessNumber] = useState(1) 
    // this tracks which guess we are on in the game. used to update the guess rows once a guess is evaluated, and check whether the game ends after 5 guesses 
    const [maxGuesses, setMaxGuesses] = useState(5) 
    // players cannot change this, but set to a state variable for future scalability and flexibility
    const [guess, setGuess] = useState("")    
    // the guess that the player enters, gets updated by the guess form
    const [boardState, setBoardState] = useState(createBoardState())
    // running tally of the guesses across the whole round

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
            <for>Letters:</for>
            <input 
                type="number" 
                min={3} 
                max={8}
                defaultValue={5}
            />
            <for>Guesses:</for>
            <input 
                type="number" 
                min={3} 
                max={8}
                defaultValue={5}
            />
            <input type="submit" value="Update"/>
        </form>
        <form className="guess">
            <for>Guess:</for>
            <input 
                type="text" 
                minlength={keywordLetters} 
                maxlength={keywordLetters}
            />
            <input type="submit" value="Guess!"/>
        </form>
        </>
    )
}