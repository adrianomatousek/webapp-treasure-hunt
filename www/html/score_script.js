// Script is for code related to scoring system (e.g. leaderboard)
var playerScore = 0;

function addScore(amount) {
    playerScore += amount;
    document.getElementById("your-score").innerHTML = playerScore;

    //should probs update server here
}


//AJAX calls to retrive data from data base from query.php
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var gameData = JSON.parse(this.response);
        var alldata = ""; //all data from database stored in variable
        var length = gameData.length;

        for (x = 0; x < length; x++) { //table data and drop down list data retrieved
            alldata += "<tr>" + "<td>" + gameData[x].username + "</td><td>" +
                gameData[x].score + "</td><td>" + gameData[x].score + "</td><td>" + gameData[x].username + "</td></tr>";
        }
        document.getElementById("mytable").innerHTML = alldata;
    }
}
xmlhttp.open("GET", "leaderboardsData.php", true);
xmlhttp.send();