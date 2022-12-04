// Assign HTML & CSS classes and IDs to Variables
var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");

var startScreen = document.querySelector("#start-screen");

var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");

// JavaScript Variables
var timer;
var timerCount;

// Reveal questions
function revealQuestions() {

    // First loop to get the questions
    for (var i = 0; i < quizQuestions.length; i++) {

        // Get the correct answer
        var correctAnswer = quizQuestions[i].correctAnswer;

        // Set the question title
        questionTitle.textContent = quizQuestions[i].questTitle;

        console.log(quizQuestions[i].questTitle);

        // Second loop to get the choices for each question
        for (var j = 0; j < quizQuestions[i].answerChoices.length; j++) {
            var bt = document.createElement("button");
            bt.classList.add(".answerBt")
            bt.textContent = quizQuestions[i].answerChoices[j];
            questionChoices.appendChild(bt);
            console.log(quizQuestions[i].answerChoices[j]);
        };
        bt.addEventListener("click");
        var userAnswer = bt.textContent;
        console.log(userAnswer);
        console.log(correctAnswer);
    }
};

// The startGame function is called when the start button is clicked
function startGame() {
    //isWin = false;

    // Set the time to 10
    timerCount = quizQuestions.length * 10;

    // Prevents start button from being clicked when the questions round is in progress
    startButton.disabled = true;
    //renderBlanks()

    // Start the timer countdown
    startTimer();

    // Set display the Start-Screen DIV to hide
    startScreen.setAttribute("class", "hide");

    // Set display the Questions DIV to visible    
    questionsDiv.setAttribute("class", "visible");

    revealQuestions();
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        /*       if (timerCount >= 0) {
                // Tests if win condition is met
                if (isWin && timerCount > 0) {
                  // Clears interval and stops timer
                  clearInterval(timer);
                  winGame();
                }
              } */
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            //loseGame();
        }
    }, 1000);
}



// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
//init();