const answerButton = document.querySelector("answers");
const nextButton = document.querySelector("nextBtn");
const questionElement = document.querySelector("questions");

async function waitApi (){
const url = 'https://quizmania-api.p.rapidapi.com/random-trivia';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '7b65183b59msh0e7b388c8290975p1c38f3jsnffbb64a96461',
		'x-rapidapi-host': 'quizmania-api.p.rapidapi.com'
	}
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

function startQuiz(result) {
  const question = result.question;
  const answers = result.answers;
  const correct = result.correct;
  const category = result.category;
  console.log(question, answers, correct, category);
}

function checkNext() {
  document.getElementById("nxtBtn").style.display = "block";
}

function nextQuestion() {}
