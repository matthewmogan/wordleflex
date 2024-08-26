import { generate } from "random-words";

// function to get keyword for Guessing Game

export function getRandomWord(n){
    return generate({
        exactly: 1,
        minLength: n,
        maxLength: n
    })[0]
}

// use this to check the words https://dictionaryapi.dev/

// export function getRandomWord(n){
//     switch (n){
//         case 3:
//             return "toe" 
//         case 4:
//             return "four"
//         case 5:
//             return "apple"
//         case 6: 
//             return "banana"
//         case 7:
//             return "nutella"
//         case 8:
//             return "approach"    
//         default:
//             console.log("please provide a string between 3 and 8 inclusive")
//             return undefined
//     }
// }