 
# WordleFlex

## Project Purpose and Requirements 

Demonstrate API gets, component based React web development methodologies, with state management across compononents. Demonstrate front end styling

**Requirements:**
- Build website using React and BrowserRouter
- VX control with Git and host repository in GitHub
- Integrate with Word returner API
- Testing suite for API and utility functions

**Technologies:**
- HTML, CSS, React, Git / GitHub

## Features

- Users can play Wordle, starting on 3 letter words and going as high as possible before they lose 
- Button to restart the game
- API call to [https://random-word-api.herokuapp.com/home] (Random Word API) get a random word of a given length
 
## Folder Structure

- **Public**
- **Components**
    - Contains gameboard, game interface components, and the main app container, and our CSS suite
- **Utilities**
    - **1 ) API.js**
        - get_Word (n) -> returns word length n
    - **2 ) GameFunctions.js**
        - **check_Guess (answer, guess)** -> checks whether each letter in guess is in the answer and in the right position in the answer. 
        - **render_Board -> renders** WordForms based on the 

## Wireframe

- **App** - container for navigation element, and the /game and /instructions routes
    - **GameBoard** - Root element route. a rectangle container that stores the interface for guessing, and interface for past guessing. Routes to /game
        - **PastGuessRow** - container for n letters, evaluated to whether the guess was correct or not
            - **PastGuessLetter** - styling of letters - green if right letter right place, orange if right letter wrong place, gray if wrong letter 
        - **GuessForm** - last row is always the current guess. prior rows are past guesses, evaluated to whether the guess was correct or not
            - **GuessLetter** - A single letter text input, starting with 3 letters, but increasing each round. class name formats letters to whether guess was correct or not. max input one letter. 
            - **GuessButton** - A flat button that lets users submit their guess. On Submit evaluates the current guess and checks whether the round was won, lost, or in-progress
        - **NextRound** - a text dialogue indicating progress, and a button that allows the player to either progress to the next round, or restart, depending on whether they won or lost the round 
    - **Instructions** Instructions to play the game. Routes to /instructions

## States ##

- game_History
    - round: 1 - 10
        - keyword: string (0-10 char)
        - characters: keyword length
        - guess_Num: 1 - 4
            - guess: string 
            - state: string (won, lost, in-progress)

- current_Guess
    - current_Guess: string
    
## Future work

What's next to build? 
- Static Gameboard Components
- Basic Gamestate