
var clearButton = document.querySelector("#clear");
var highscoresOL = document.querySelector("#highscores");

// Get Local Storage
const highScoreString = localStorage.getItem("HIGH_SCORES");
const highScores = JSON.parse(highScoreString);  

// Display the highScores descending 
for (var i = 0; i < highScores.length; i++) {
    var li = document.createElement("li");
    li.textContent = highScores[i].user + " - " + highScores[i].value;
    highscoresOL.appendChild(li);
}

// clearStorage function
function clearStorage() {
    localStorage.clear();
};

// Attach event listener to Clear Highscores and go to Index.hmtl 
clearButton.addEventListener("click", clearStorage);