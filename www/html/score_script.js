// Script is for code related to scoring system (e.g. leaderboard)
var playerScore = 0;

function addScore(amount) {
    playerScore += amount;
    document.getElementById("your-score").innerHTML = playerScore;

    //should probs update server here
}