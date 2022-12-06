// Assign HTML & CSS classes and IDs to Variables


var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");

var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var viewHighscores = document.querySelector(".scores");

// Variables related to Questions
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");

// Logic Variables
var timer;
var timerCount;
var correctAnswer;
var userAnswer;
var numCorrects = 0;

// Audio related to the Correct user Answer
var audioCorrect = new Audio('./assets/sfx/correct.wav');

// Audio related to the Wrong user Answer
var audioIncorrect = new Audio('./assets/sfx/incorrect.wav');

// Reveal questions
function revealQuestions(i) {

    // Get the correct answer
    correctAnswer = quizQuestions[i].correctAnswer;

    // Set the question title
    questionTitle.textContent = quizQuestions[i].questTitle;

    console.log(quizQuestions[i].questTitle);

    // Loop to get the choices for each question
    for (var j = 0; j < quizQuestions[i].answerChoices.length; j++) {        

        console.log(quizQuestions[i].answerChoices[j]);

        // Add an button for each choice
        var bt = document.createElement("button");
        bt.setAttribute('class', "answerBt");
        bt.setAttribute('id', j);        
        bt.addEventListener("click", checkAnswer);
        bt.textContent = quizQuestions[i].answerChoices[j];
        questionChoices.appendChild(bt);      

    };
};

// Function to Check the user Answer
function checkAnswer(event) {

    // TEST to check which one is working
    event.stopPropagation();
    event.preventDefault();

    var userAnswer = event.target.textContent;

    // Set display the Feedback DIV to visible  
    feedback.setAttribute("class", "visible");

    // Correct Answer
    if (userAnswer === correctAnswer) {
        numCorrects++
        audioCorrect.play();
        feedback.textContent = 'Correct answer!';
    // Wrong Answer
    } else {
        audioIncorrect.play();
        if (timerCount >= 10) {
            timerCount = timerCount - 10;
        } else {
            timerCount = 1;
        }
        feedback.textContent = 'Wrong answer!';
    }
};


// The startGame function is called when the start button is clicked
function startGame(event) {

    // TEST to check which one is working
    event.stopPropagation();
    event.preventDefault();

    // Set the timer to 10 sec for each Question
    timerCount = quizQuestions.length * 10;

    // Prevents start button from being clicked when the questions round is in progress
    startButton.disabled = true;

    // Start the timer countdown
    startTimer();

    // Set display the Start-Screen DIV to hide
    startScreen.setAttribute("class", "hide");

    // Set display the High Scores DIV to hide
    viewHighscores.setAttribute("class", "hide");

    // Set display the Questions DIV to visible    
    questionsDiv.setAttribute("class", "visible");


    // Loop to get the questions
    for (var i = 0; i < quizQuestions.length; i++) {

        // Set display the Feedback DIV to hide  
        feedback.setAttribute("class", "hide");

        // Call Reveal Questions Function
        revealQuestions(i);

        // TEST to check which one is working
        event.stopPropagation();
        event.preventDefault();

        // Clear the last group of questoin choices
        while (questionChoices.hasChildNodes()) {
            questionChoices.removeChild(questionChoices.firstChild);
          };
    }
}

// The setTimer function starts and stops the timer
function startTimer() {

    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        // Tests if time has run out
        if (timerCount === 0) {

            // Set display the High Scores DIV to visible
            viewHighscores.setAttribute("class", "scores");

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