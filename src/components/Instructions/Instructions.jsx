import React from "react";
import "./Instructions.css";

export default function Instructions(){
    return (
        <div className="instructions">
            <h1 className= "instructionsHeading">How to Play WordleFlex</h1>
            <p className="instructionsText">Welcome to WordleFlex. In this game, you try to guess the secret word before your run out of guesses!</p>
            <ul>
                <li><strong className="green">Green:</strong> The letter is correct and in the right position.</li>
                <li><strong className="yellow">Yellow:</strong> The letter is correct but in the wrong position.</li>
                <li><strong className="gray">Gray:</strong> The letter is not in the word at all.</li>
            </ul>
            <p className="instructionsText">Use the clues to guess the word within your specific number of attempts.</p>
            <h1 className= "instructionsHeading">WordleFlex Settings</h1>
            <p className="instructionsText">Our twist of the classic Wordle includes the options to set your own number of guesses and letters, increasing or decreasing the difficulty!</p>
            <ul>
                <li><strong>Guesses:</strong> Click the up and down arrows to change the number of guesses per round</li>
                <li><strong>Letters:</strong> Click the up and down arrows to changes the number of letters in the secret word</li>
            </ul>
        </div>
    )
}