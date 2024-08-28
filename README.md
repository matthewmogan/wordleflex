 
# WordleFlex

## Project Purpose and Requirements 

**Purpose:**

Create a Wordle clone to demonstrate command of HTML, CSS, JavaScript, and React / BrowserRouter front end frameworks

**Requirements:**
- Generate a random word for users to play Wordle
- Allow users to controll difficulty by changing the number of letters and number of guesses in their game
- Word validation for guesses using external API
- Calculate whether guesses are correct or incorrect and update gameboard to reflect
- Testing suite for API function

**Technologies:**
- Languages: HTML, CSS, JavaScript 
- Modules: RandomWord 
- APIs: https://api.dictionaryapi.dev
- Frameworks: React / BrowswerRouter
- Software development tools: Git / GitHub

## Wireframe 

- **App** - Container for NavBar element, and the GameBoard (path = /wordleflex) and Instructions (path = /instructions) components
    - **GameBoard** - A container that renders the guess rows and letters, and holds all the states / setters of the application, which it passes to guess, letter, and button components. Contains the UI for submitting a guess and changing game settings, and a text box that tells the user whether they won or lost the game, and whether they submitted an invalid guess
        - **GuessRow** - container for Letter components, evaluated to whether the guess was correct or not
            - **Letters** - styling of letters - green if right letter right place, orange if right letter wrong place, gray if wrong letter 
    - **Instructions** Instructions to play the game
    
## Future work

**What's coming end of August?** 
- Improve reactive design (desktop, tablet, mobile)
- Guess validation using dictionary API
- Clear guess input bar after guesses are submitted
- Link modules and APIs in README 

**What's coming September / October?**
- Redux state management, if app continues to increase in complexity
- Timer feature to track time performance of users over time 
- Login page - play as guest, single sign-on authorization using Google
    - Backend to store user gameplay data
- Deploy to live webpage (currently on GitHub Pages)