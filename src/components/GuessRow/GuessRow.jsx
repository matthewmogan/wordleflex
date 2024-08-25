import React from "react"
import "./GuessRow.css"
import Letter from "../Letter/Letter"

export default function GuessRow (params) {
    const {
        id, 
        keywordLetters,
        boardLetters,
        boardEvaluated
    } = params
    return (
        <div 
            className ="row"
            id = {id}
        >
            {[...Array(keywordLetters).keys()].map((arg) => {
                
                if(boardEvaluated[id][arg] === undefined){
                    console.log(boardEvaluated)
                    console.log("id:" + id)
                    console.log("arg:" + arg)
                    console.log("result: " + boardEvaluated[id][arg])
                }
                
                if(boardLetters[id][arg] === undefined){
                    console.log(boardLetters)
                    console.log("id:" + id)
                    console.log("arg:" + arg)
                    console.log("result: " + boardLetters[id][arg])
                }

                return(
                    <Letter
                        key = {arg}
                        id = {arg}
                        evaluation={boardEvaluated[id][arg]}
                        letter={boardLetters[id][arg]}
                    />
                )
            })}
        </div> 
    )
}