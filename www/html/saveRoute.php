<?php
echo "pretty please";
require_once ("connection.php");

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

// $passed_json = $_POST['data'];
$newMarkers = $_POST['waypoints'];
$newClues = $_POST['clues'];
$routeName = $_POST['route_name'];

$waypointsArray = $newMarkers; //TODO pass in data from inputted array
$cluesArray = $newClues;
foreach ($newMarkers as $key => $value) {
    echo $value . " ";
}

foreach ($newClues as $key => $value) {
    foreach ($value as $clue => $single_clue) {
        echo "Clue: " . $single_clue;
    }
}

echo "Route name: " . $routeName;

//grabs the routeID of the last entry in the database, puts in newRouteID
$newRouteID;
$newWaypointID;
$lastRoute = $conn->query("SELECT * FROM routes ORDER by routeID DESC LIMIT 1");
if ($lastRoute->num_rows == 1) {
    // output data of each row
    while($row = $lastRoute->fetch_assoc()) {
        $newRouteID = $row["routeID"] + 1;
    }
}

echo "Got the last route! ";

//grabs last waypointID and stores it in newRouteID
$lastWaypoint = $conn->query("SELECT * FROM waypoints ORDER by waypointID DESC LIMIT 1");
if ($lastWaypoint->num_rows == 1) {
    // output data of each row
    while($row = $lastWaypoint->fetch_assoc()) {
        $newWaypointID = $row["waypointID"] + 1;
    }
}
$originalNewWaypointID = $newWaypointID;
//grabs the cluesID of the last entry, puts in newClueID
$lastClue = $conn->query("SELECT * FROM clues ORDER by clueID DESC LIMIT 1");
if ($lastClue->num_rows == 1) {
    // output data of each row
    while($row = $lastClue->fetch_assoc()) {
        $newClueID = $row["clueID"] + 1;
    }
}

//TEMPLATE routeName and gamekeeperID need to be fetched from form that submits route
// $newRouteSQL = "INSERT INTO routes VALUES ($newRouteID,'routeName','gamekeeperID')";

// $addRoute = $conn->prepare("INSERT INTO `routes` ($newRouteID, 'routeName', 'gamekeeperID) VALUES (?,?,?)");
$addRoute = $conn->prepare("INSERT INTO `routes` VALUES (?,?,?)");
//Ideally passed as parameters (don't think you can pass as strings in bind_param).
//Parameters need to be replaced with actual values that we can use and send.
$addRoute->bind_param('iss', $newRouteID, $routeName, $_SESSION['keeperID']);
// if (!$addRoute->execute()) {
//     print_r($addRoute->errorInfo());
// }
$addRoute->execute();
$addRoute->close();

echo "added route! ";

//TEMPLATE loads values from input array into string for SQL statement
$addWaypoints = $conn->prepare("INSERT INTO `waypoints` VALUES (?,?,?,?,?,?)");
// $VALUES = "";
$prize = 'prize';
$waypointName = 'waypoint name';
for ($i=0; $i<count($waypointsArray); $i++){
    $a = $i+1;
//   $VALUES.="($newWaypointID,".$waypointsArray[$i].",$newRouteID,'prize lol',$i+1,'waypoint name'),";
    $addWaypoints->bind_param("isisis", $newWaypointID, $waypointsArray[$i], $newRouteID, $prize, $a, $waypointName);
    $addWaypoints->execute();
    $newWaypointID++;
}
$addWaypoints->close();

//TEMPLATE loads found values into array
// $waypointSQL = "INSERT INTO waypoints VALUES".$VALUES;

//TEMPLATE, decomment when implemented fully
// $conn->query($waypointSQL);

//WaypointID has to match up.
$newWaypointID = $originalNewWaypointID;
$addClues = $conn->prepare("INSERT INTO `clues` VALUES (?,?,?,?)");
for ($i=0; $i<count($cluesArray); $i++){
    for ($x=0; $x<count($cluesArray[$i]); $x++){
        $a = $i+1;
        $addClues->bind_param("iisi", $newClueID, $newWaypointID, $cluesArray[$i][$x], $a);
        $addClues->execute();
        $newClueID++;
    }
    $newWaypointID++;
}
$addClues->close();
//TODO PHP for adding clues for each waypoint, will require another passed array

?>
