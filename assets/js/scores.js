
var clearButton = document.querySelector("#clear");
var highscoresOL = document.querySelector("#highscores");

// Get Local Storage
const highScoreString = localStorage.getItem("HIGH_SCORES");
const highScores = JSON.parse(highScoreString);

// Check if Local Storage is empty
if (highScores != null) {
    // Display the high scores descending 
    for (var i = 0; i < highScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = highScores[i].user + " - " + highScores[i].value;
        highscoresOL.appendChild(li);
    }
}

// clearStorage function
function clearStorage(event) {
    event.preventDefault();
    // Clear the old Highscores
    highscoresOL.innerHTML = "";
    // Clear the local storage
    localStorage.clear();
};

// Attach event listener to Clear High Scores and go to Index.hmtl 
clearButton.addEventListener("click", clearStorage);