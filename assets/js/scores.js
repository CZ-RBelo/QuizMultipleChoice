
//localStorage.clear();

// Get Local Storage

const highScoreString = localStorage.getItem("HIGH_SCORES");
const highScores = JSON.parse(highScoreString);  

console.log("HIGH SCORES TABLE"); 
console.log(highScores);

for (var i = 0; i < menu.drinks.length; i++) {
    console.log(drinks[i].name);
}

<ol id="highscores"></ol>


/*

// Clear the old questions
questionChoices.innerHTML = "";


// Set the question title
questionTitle.textContent = quizQuestions[currentQuestionIndex].questTitle;


document.getElementById('quizTitle').textContent = 'Fifa World Cup Quiz Challenge';
document.getElementById('quizSubtitle').textContent = 'Test your knowledge with this quiz.';
*/