# Nerd Bowl

Take trivia quizzes on certain categories using the trivia database api
https://opentdb.com/api_config.php

## How to Play

1. Choose a Category
2. Press the "Start Quiz" button
3. Read the question, pick an answer, and submit with the "Next" button
4. Once quiz is finished, you can retry agin in same category or choose a different one.

## Approach

### Summary

Idea : Create a quiz using api calls to trivia database, and display the results in a quiz format

### Functions

#### Starting the Quiz

- StartGame() - called when player clicks on "Start Game" button. If user selected a valid category, create an api using createAPI(categoryID), then call fetchData() then hide the start screen ( the dropdown and start button) and display the game screen ( the question and answer choices)

- createApi(categoryID) - returns a valid uri depending on user selected category choice.

- fetchData() - perform api call, save results (10) in an array called questions, to reduce number of api calls. Set first question and answer to ui.

#### Quiz Logic

- compareAnswers(userAnswer, correctAnswer) - if the user answer is the same as the correct answer from api call, return true, otherwise return false.

- submitAnswer() - called when user clicks "Next" button. Calls compareAnswers(), if correct, add a point to score. If we are at end of quiz, call endGame() otherwise, go to next question, set question and answer to ui, and reset radio buttons.

#### End of Quiz

- endGame() - called from submitAnswer(). Creates an endgame text message based on score. Hide game screen. Show end game screen (consisting of endgame message, score, restart button and change category button).

- createEndGameText() - called from endgame(). returns message to be displayed to user based on their score.

- resetGameSettings() - reset all background game variables like score, score text, questions array and question count.

- replay() - Called when user clicks "Replay" button. Calls resetGameSettings(). Calls fetchData(). Hides endgame screen. Shows game Screen.

- changeCategory() - Called when user clicks "Change Category" button. Hides endgame screen. Shows start screen.

## CSS Framework - Bootstrap

I imported bootstrap using a cdn link. I used it to design the choose a category select and for the true or false button ui.

## Axios

I used a trivia database from https://opentdb.com/api_config.php . It tracked different categories, questions, answers, question type ( true or false or Multiple choice). I used it get a set of 10 questions and answers from a given category and displayed them in quiz format.

## Next Steps

- implement multiple choice answering and be able to display correct answers depending on question type ( boolean or multiple)
- once MC is implemented add more categories that only have mc ( board games and comics)
- make ui prettier
