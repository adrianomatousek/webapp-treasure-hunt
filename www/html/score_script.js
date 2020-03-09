// Script is for code related to scoring system (e.g. leaderboard)
var playerScore = 0;

function addScore(amount) {
    playerScore += amount;
    document.getElementById("your-score").innerHTML = playerScore;

    $.ajax({
        type: "POST",
        url: 'leaderboardsUpdateScore.php',
        data: {
            score: playerScore
        },
        success: console.log("update score success"),
        dataType: "text",
        error: function (req, err) {
            console.log('my message' + err);
        }
    });
}


//AJAX calls to retrive data from data base from query.php

function update_board() {
    console.log("updating board");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mytable").innerHTML = "";
            var gameData = JSON.parse(this.response);
            console.log(gameData);
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
}

update_board()
setInterval(update_board, 3000);