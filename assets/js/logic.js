// Assign HTML & CSS classes and IDs to Variables
var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");

var startScreen = document.querySelector("#start-screen");
var feedback =  document.querySelector("#feedback");

// Variables related to Questions
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");

// JavaScript Variables
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
function revealQuestions() {

    // First loop to get the questions
    for (var i = 0; i < quizQuestions.length; i++) {

        // Get the correct answer
        correctAnswer = quizQuestions[i].correctAnswer;

        // Set the question title
        questionTitle.textContent = quizQuestions[i].questTitle;

        //console.log(quizQuestions[i].questTitle);

        // Second loop to get the choices for each question
        for (var j = 0; j < quizQuestions[i].answerChoices.length; j++) {

            // Add an button for each choice
            var bt = document.createElement("button");
            //bt.setAttribute('class', "answerBt");
            bt.setAttribute('id', j);
            bt.textContent = quizQuestions[i].answerChoices[j];
            //bt.setAttribute('onClick', 'checkAnswer(this.textContent,correctAnswer)');
            questionChoices.appendChild(bt);

            // Add the EventListener to the Answers Buttons and call the CheckAnswer Function 
            const buttons = document.getElementsByTagName("button");
            const buttonPressed = e => {
                checkAnswer(e.target.textContent,correctAnswer)
            }            
            for (let button of buttons) {
                button.addEventListener("click", buttonPressed);
            }
        };
    }
};

// Function to Check the user Answer
function checkAnswer(userAnswer, correctAnswer) {
    
    // Set display the Feedback DIV to visible  
    feedback.setAttribute("class", "visible");
    if (userAnswer === correctAnswer) {
        numCorrects++
        audioCorrect.play();
        feedback.textContent = 'Correct answer!';
    } else {
        audioIncorrect.play();
        timerCount = timerCount - 10;
        feedback.textContent = 'Wrong answer!';
    }
        // Set display the Feedback DIV to hide  
        //feedback.setAttribute("class", "hide");
};

// The startGame function is called when the start button is clicked
function startGame() {

    // Set the timer to 10 sec for each Question
    timerCount = quizQuestions.length * 10;

    // Prevents start button from being clicked when the questions round is in progress
    startButton.disabled = true;

    // Start the timer countdown
    startTimer();

    // Set display the Start-Screen DIV to hide
    startScreen.setAttribute("class", "hide");

    // Set display the Questions DIV to visible    
    questionsDiv.setAttribute("class", "visible");

    revealQuestions();
}

// The setTimer function starts and stops the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;

        // Tests if time has run out
        if (timerCount === 0 || timerCount < 0) {
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