<?php
session_start();

require_once("connection.php");
//grabs waypoints for selected route
$routeSQL = "SELECT waypointID FROM waypoints WHERE routeID='".$_SESSION['routeID']."' ORDER BY positionInRoute ASC";
//grabs all clues
$sql = "SELECT * FROM clues ORDER BY clueNumber ASC";
$routeResult = $conn->query($routeSQL);
$result = $conn->query($sql);
//query result holders
$waypointIDs = array();
$table = array();
if ($routeResult->num_rows > 0) {
// output data of each row
  while($row = $routeResult->fetch_assoc()) {
    //appends row to table
    array_push($waypointIDs,$row["waypointID"]);
  }
}

if ($result->num_rows > 0) {
// output data of each row
  while($row = $result->fetch_assoc()) {
    //appends row to table
    $table[] = array($row["clueID"],$row["waypointID"],$row["clueDescription"],$row["clueNumber"]);
  } 

  //creates 2d array and loads each list of clues for each waypoint
  $output = array();
  for ($j = 0; $j < sizeof($waypointIDs); $j++){
    array_push($output,array());
    for ($i = 0; $i < sizeof($table); $i++){
      if ($waypointIDs[$j]==$table[$i][1]){
        array_push($output[$j],$table[$i][2]);
      }
    }
  }
  //ouputs 2d array as JSON
  $outputJSON = json_encode($output);
  echo $outputJSON;
}
?>