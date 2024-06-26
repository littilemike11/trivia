//https://github.com/public-apis/public-apis?

let score = 0; //keep track of player score
let questionCount = 0; //keeps track which question # user on
let userAnswer = ""; //stores user current answer
let correctAnswer = ""; //store correct answer from api
let questions = []; //store data from api
let uri = ""; // url to call api

//reference to quiz ui
const categoryDropDown = document.getElementById("categories");
const startQuizButton = document.getElementById("startQuiz");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question");
const questionCounter = document.getElementById("questionCount");
const nextButton = document.getElementById("next");

//get reference to radio buttons
const trueRadio = document.getElementById("trueRadio");
const falseRadio = document.getElementById("falseRadio");

//reference to game screen
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endGameScreen = document.getElementById("endGameScreen");

//references to endgame ui
const endGameText = document.getElementById("endGameText");
const endgameScoreText = document.getElementById("endgameScoreText");
const replayButton = document.getElementById("replayButton");
const changeCategoryButton = document.getElementById("changeCategoryButton");

//api used - https://opentdb.com/api_config.php

//start Game
startQuizButton.addEventListener("click", startGame);
function startGame() {
  if (categoryDropDown.value == "Choose a Quiz Category") return;
  uri = createApi(categoryDropDown.value);
  console.log(uri);
  fetchData();
  //show game screen
  gameScreen.style.display = "block";
  startScreen.style.display = "none";
}

// depending on user category choice, return corresponding url
function createApi(categoryId) {
  let url =
    "https://opentdb.com/api.php?amount=10&type=boolean&category=" + categoryId;
  console.log(url);
  return url;
}

async function fetchData() {
  try {
    const response = await axios.get(uri);
    //for each element in results copy it into question array
    //api results and questions arr should be same
    console.log(response.data.results);
    //   console.log(questions);
    response.data.results.forEach((element) => {
      questions.push(element);
    });
    //   console.log(response.data.results[0].question);
    //   console.log(response.data.results[0].correct_answer);
    correctAnswer = questions[0].correct_answer;
    //setting question text to the question on api
    //innerhtml used to make text more readable ( instead of &quot)
    questionText.innerHTML = questions[0].question;
    questionCounter.textContent = "1.";
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //console.log(response.data);
}
// returns a promise
// promises can be:
// pending, resolved, rejected
// await - waits for function to result
// await only allowed in async functions
//fetchData();

//set user answer to which radio button they clicked
trueRadio.addEventListener("click", () => {
  userAnswer = trueRadio.value;
});
falseRadio.addEventListener("click", () => {
  userAnswer = falseRadio.value;
});

//if userAnswer==correctAnswer return true, otherwise return false
function compareAnswers(userAnswer, correctAnswer) {
  if (userAnswer == correctAnswer) return true;
  return false;
}

// On next button click
nextButton.addEventListener("click", submitAnswer);
function submitAnswer() {
  //compare answer
  let correct = compareAnswers(userAnswer, correctAnswer);
  //console.log(correct);

  //update score if correct score +=1
  if (correct) {
    score++;
    scoreText.textContent = "Score : " + score;
    console.log("you got it right");
  } else {
    console.log("you got it wrong");
  }
  //reset answer
  userAnswer = "";
  //check if end game

  if (questionCount >= questions.length - 1) {
    endgame();
    return;
  }
  //go to next question
  questionCount++;
  questionText.textContent = "";
  questionCounter.textContent = questionCount + 1 + ". ";
  questionText.innerHTML = questions[questionCount].question;
  correctAnswer = questions[questionCount].correct_answer;

  //reset radio boxes
  trueRadio.checked = false;
  falseRadio.checked = false;
}

//#region end game logic
function endgame() {
  endGameText.textContent = createEndGameText();
  endgameScoreText.textContent =
    " Your Score was " + score + "/" + (questionCount + 1);

  //hide game screen
  gameScreen.style.display = "none";
  //show endgame screen
  endGameScreen.style.display = "block";
}
let endScreenText = [
  "Pathetic",
  "you're just a casual",
  "not half good",
  "you're top of the bell curve",
  "Not half bad",
  "so you do stay at home",
  "Congrats, You are a certified Nerd",
];
function createEndGameText() {
  let text = "";
  switch (score) {
    case 0:
      text = endScreenText[0];
      break;
    case 1:
    case 2:
      text = endScreenText[1];
      break;
    case 3:
    case 4:
      text = endScreenText[2];
      break;
    case 5:
      text = endScreenText[3];
      break;
    case 6:
    case 7:
      text = endScreenText[4];
      break;
    case 8:
    case 9:
      text = endScreenText[5];
      break;
    case 10:
      text = endScreenText[6];
      break;
  }
  return text;
}
//test for endScreenTest
// for (score = 0; score <= 10; score++) {
//   console.log(createEndGameText());
// }

function resetGameSettings() {
  score = 0;
  scoreText.textContent = "Score : 0";
  questions = [];
  questionCount = 0;
}

replayButton.addEventListener("click", replay);
async function replay() {
  //reset values
  resetGameSettings();
  await fetchData();
  //hide endgame screen
  endGameScreen.style.display = "none";
  //show game screen
  gameScreen.style.display = "block";
}

changeCategoryButton.addEventListener("click", changeCategory);
function changeCategory() {
  //reset game
  resetGameSettings();
  //hide endgame screen
  endGameScreen.style.display = "none";
  //show start screen
  startScreen.style.display = "block";
}

//#endregion

//html with js
//axios -api
//addeventlistener
//arrays
//

//test
// console.log(compareAnswers("true", "true")); // return true
// console.log(compareAnswers("true", "false")); // return false
// console.log(compareAnswers("false", "true")); // return false
// console.log(compareAnswers("false", "false")); //return true
