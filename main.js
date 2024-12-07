const answerButtons = document.getElementById("answerDiv");
const nextButton = document.getElementById("nxtBtn");
const questionElement = document.querySelector(".questions");
const questionSentence = document.getElementById("questionSent");

let nextBtnClicked = 0;
let score = 0;

async function waitApi() {
  const url = "https://quizmania-api.p.rapidapi.com/random-trivia";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "14226b01e0msh0429f7c7e118cdfp1f5463jsn9d4ab4540b50",
      "x-rapidapi-host": "quizmania-api.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    startQuiz(result);
  } catch (error) {
    console.error(error);
  }
}

function startQuiz(result) {
  const question = result.question;
  const answers = result.answers;
  const correct = result.correct;
  resetState();
  questionSentence.innerHTML = question;

  for (i = 0; i < 4; i++) {
    const button = document.createElement("button");
    button.innerHTML = answers[`${i}`];
    button.classList.add("btn");
    button.id = "btnBtn";
    answerButtons.appendChild(button);
    button.addEventListener("click", () => {
      if (button.innerHTML === correct) {
        button.classList.replace("btn", "btnCorrect");
        nextButton.style.display = "block";
        disableAllButtons();
        score++;
      } else {
        button.classList.replace("btn", "btnInorrect");
        nextButton.style.display = "block";
        disableAllButtons();
      }
    });
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

function nextQuestion() {
  nextBtnClicked++;
  waitApi();
  if (nextBtnClicked === 10) {
    console.log(`your score is ${score}`);
    restartPage();
  }
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function restartPage() {
  const container = document.querySelector(".container");
  container.classList.replace("container", "gameEnds");
  nextButton.style.display = "none";
  container.innerHTML = `<h2 class= "strtText">your Score is ${score}</h2>
  <br> 
  <button class = "strtBtn" onclick="restrtBtn()">Restart</button>
  `;
}

function restrtBtn() {
  const container = document.querySelector(".gameEnds");
  container.classList.replace("gameEnds", "container");
  location.reload();
}
function runBtn() {
  waitApi();
}
