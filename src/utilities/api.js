
// function to get keyword for guessing game

export function getRandomWord(n){
    switch (n){
        case 3:
            return "toe" 
        case 4:
            return "apps"
        case 5:
            return "apple"
        default:
            return undefined
            console.log("please provide a string between 3 and 5 inclusive")
    }
}