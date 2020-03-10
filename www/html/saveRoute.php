<?php
echo "pretty please";
require_once ("connection.php");
// $passed_json = $_POST['data'];
$newMarkers = $_POST['waypoints'];
$newClues = $_POST['clues'];
$routeName = $_POST['route_name'];

$waypointsArray = $newMarkers; //TODO pass in data from inputted array
echo $waypointsArray;

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

//grabs last waypointID and stores it in newRouteID
$lastWaypoint = $conn->query("SELECT * FROM waypoints ORDER by waypointID DESC LIMIT 1");
if ($lastWaypoint->num_rows == 1) {
    // output data of each row
    while($row = $lastWaypoint->fetch_assoc()) {
        $newWaypointID = $row["waypointID"] + 1;
    }
}

//TEMPLATE routeName and gamekeeperID need to be fetched from form that submits route
// $newRouteSQL = "INSERT INTO routes VALUES ($newRouteID,'routeName','gamekeeperID')";

// $addRoute = $conn->prepare("INSERT INTO `routes` ($newRouteID, 'routeName', 'gamekeeperID) VALUES (?,?,?)");
$addRoute = $conn->prepare("INSERT INTO `routes` VALUES (?,?,?)");
//Ideally passed as parameters (don't think you can pass as strings in bind_param).
//Parameters need to be replaced with actual values that we can use and send.
$addRoute->bind_param('sss', $newRouteID, $routeName, $_SESSION['keeperID']);
$addRoute->execute();
$addRoute->close();


//TEMPLATE loads values from input array into string for SQL statement
$VALUES = "";
for ($i=0; $i<count($waypointsArray); $i++){
  $VALUES.="($newWaypointID,".$waypointsArray[i].",$newRouteID,'prize lol',$i+1,'waypoint name'),";
}

//TEMPLATE loads found values into array
$waypointSQL = "INSERT INTO waypoints VALUES".$VALUES;

//TEMPLATE, decomment when implemented fully
// $conn->query($waypointSQL);

//TODO PHP for adding clues for each waypoint, will require another passed array

?>
