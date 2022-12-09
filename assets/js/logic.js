// Assign HTML & CSS classes and IDs to Variables

var startButton = document.querySelector("#start");
var timerElement = document.querySelector(".timer");

var startScreen = document.querySelector("#start-screen");
var feedback = document.querySelector("#feedback");
var viewHighscores = document.querySelector(".scores");

var wrapper = document.querySelector(".wrapper");

// Variables related to Questions & Choices
var questionsDiv = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");

// Logic Variables
var timer;
var timerCount;
var correctAnswer;
var userAnswer;
var numCorrects = 0;
var numWrongs = 0;
var numNot = 0;
var currentQuestionIndex = 0;

// Audio related to the Correct user Answer
var audioCorrect = new Audio('./assets/sfx/correct.wav');
// Audio related to the Wrong user Answer
var audioIncorrect = new Audio('./assets/sfx/incorrect.wav');

// Reveal questions function
function revealQuestions(currentQuestionIndex) {

    // Get the correct answer
    correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    // Clear the old questions
    questionChoices.innerHTML = "";
    // Set the question title
    questionTitle.textContent = quizQuestions[currentQuestionIndex].questTitle;

    // Loop to get the choices for each question
    var currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestion.answerChoices.forEach(function (answerChoices) {

        // Add an button for each choice & display on the HTML page
        var bt = document.createElement("button");
        bt.setAttribute('class', "answerBt");
        bt.textContent = answerChoices;
        bt.onclick = checkAnswer;
        // Display the new button on the HTML page
        questionChoices.appendChild(bt);
    });
};
// Function to Check the user Answer
function checkAnswer(event) {
    // Increase the Questions Index Array
    currentQuestionIndex++;
    // Get the user Answer
    var userAnswer = event.target.textContent;
    // Set display the Feedback DIV to visible  
    feedback.setAttribute("class", "visible");
    // If the user  Answer is Correct
    if (userAnswer === correctAnswer) {
        // Increase the number of correct answers
        numCorrects++;
        //console.log("Right: " + numCorrects);
        // Play the sounf of correct answer
        audioCorrect.play();
        // Display "Correct answer!" message on the HTML page
        feedback.textContent = 'Correct answer!';
        //  If the user  Answer is Wrong
    } else {
        numWrongs++;
        //console.log("Wrong:" + numWrongs);
        // Play the sounf of Wrong answer
        audioIncorrect.play();
        // Checks the remaining time and subtract 10 secs from the clock
        if (timerCount >= 10) {
            timerCount = timerCount - 10;
        } else {
            // Call the End Game function
            endtGame();
        }
        // Display "Wrong answer!" message on the HTML page
        feedback.textContent = 'Wrong answer!';
    };
    // Check the number of Questions made
    if (currentQuestionIndex === quizQuestions.length) {
        // Call the End Game function
        endtGame();
    } else {
        //Go forward to the next question
        revealQuestions(currentQuestionIndex);
    };
};

// Call the Init Function
startButton.onclick = init;
// The init function is called when the start button is clicked
function init() {
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
}

// The setTimer function starts and stops the timer
function startTimer() {

    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;
        // Tests if time has run out
        if (timerCount === 0) {
            endtGame();
        }
    }, 1000);
}

var startGame = function (event) {
    event.preventDefault();

    // Add a title and subtitle to the questions window
    questionsDiv.insertAdjacentHTML('beforebegin', '<div><h1 id="quizTitle"><h3 id="quizSubtitle">');
    questionsDiv.insertAdjacentHTML('beforebegin', '<hr>');
    document.getElementById('quizTitle').textContent = 'Fifa World Cup Quiz Challenge';
    document.getElementById('quizSubtitle').textContent = 'Test your knowledge with this quiz.';

    // Set display the Feedback DIV to hide  
    feedback.setAttribute("class", "hide");
    //Go forward to the frist question
    revealQuestions(currentQuestionIndex);
};

function endtGame() {

    document.getElementById('quizSubtitle').textContent = 'Check your result and add your initials to save your performance!';

    // Clears interval
    clearInterval(timer);
    // Clear the old questions
    questionChoices.innerHTML = "";
    // Set display the Feedback DIV to hide  
    feedback.setAttribute("class", "hide");
    // Set display the High Scores DIV to visible
    viewHighscores.setAttribute("class", "scores");

    // Set display the user results
    questionTitle.textContent = "Your results:";
    // Total os Questions
    var totalQuestions = document.createElement("h3");
    totalQuestions.textContent = "Total of Questions: " + quizQuestions.length;
    questionChoices.appendChild(totalQuestions);
    // Total of answers not answerd
    numNot = quizQuestions.length - numCorrects - numWrongs;
    var totalNot = document.createElement("h3");
    totalNot.textContent = "Total of Not Answered: " + numNot;
    questionChoices.appendChild(totalNot);
    // Total os right answers
    var totalRight = document.createElement("h3");
    totalRight.textContent = "Total of Right Answers: " + numCorrects;
    questionChoices.appendChild(totalRight);
    // total of wrong answers
    var totalWrong = document.createElement("h3");
    totalWrong.textContent = "Total of Wrong Answers: " + numWrongs;
    questionChoices.appendChild(totalWrong);
    // Break line 
    questionChoices.insertAdjacentHTML('beforeend', '<hr>');


    // Add initials window
    questionChoices.insertAdjacentHTML('beforeend', '<div><h1 id="quizInitials"><h2 id="quizInitialsTitle">');
    document.getElementById('quizInitialsTitle').textContent = 'Add your initials below:';
    // 
    var initialsInp = document.createElement("input");
    questionChoices.appendChild(initialsInp);
    var BTNsubmitInitias = document.createElement("button");
    BTNsubmitInitias.textContent = "Submit";
    questionChoices.appendChild(BTNsubmitInitias);
    // Break line 
    questionChoices.insertAdjacentHTML('beforeend', '<hr>');

    console.log(initialsInp.value);
    console.log(numCorrects);

    BTNsubmitInitias.addEventListener("click", displayHS(initialsInp.value), numCorrects);
};
    // Attach event listener to start button to call startGame function on click
    startButton.addEventListener("click", startGame);