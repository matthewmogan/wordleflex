import React from "react"
import "./GuessRow.css"
import Letter from "../Letter/Letter"

export default function GuessRow (params) {
    const {id, keywordLetters} = params
    return (
        <div 
            className ="inactive row"
            id = {id}
        >
            {[...Array(keywordLetters).keys()].map((arg) => {
                return(
                    <Letter
                        key = {arg}
                        id = {arg}
                        className="inactive letter" 
                    />
                )
            })}
        </div> 
    )
}