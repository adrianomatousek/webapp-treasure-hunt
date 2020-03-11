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
        success: function (response) {},
        dataType: "text",
        error: function (req, err) {
            console.log('my message' + err);
        }
    });
}



function changeRoutes(routeID){
    playerScore = 0;
    addScore(0);
    removeAllMarkers();
    $.post('loadMarkers.php', function (data) {
        points = JSON.parse(data);
        //retireves a JSON array of points and is converted to a JavaScript array
    });
    nextWaypoint();
}

//AJAX calls to retrive data from data base from leaderboardsData.php

function update_board() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mytable").innerHTML = "";
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
}

update_board()
setInterval(update_board, 3000);