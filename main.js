const answerButtons = document.getElementById("answerDiv");
const nextButton = document.getElementById("nxtBtn");
const questionElement = document.querySelector(".questions");
const questionSentence = document.getElementById("questionSent");

let score = 0;

async function waitApi() {
  const url = "https://quizmania-api.p.rapidapi.com/random-trivia";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7b65183b59msh0e7b388c8290975p1c38f3jsnffbb64a96461",
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

waitApi();

function beginning() {
  score = 0;
  startQuiz;
}

function startQuiz(result) {
  const question = result.question;
  const answers = result.answers;
  const correct = result.correct;
  const category = result.category;
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
        console.log("this is correct");
      } else {
        button.classList.replace("btn", "btnInorrect");
        nextButton.style.display = "block";
        console.log("this is incorrect");
      }
    });
  }
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
