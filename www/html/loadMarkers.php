<?php
require_once ("connection.php");

session_start();
$sql = "SELECT * FROM waypoints WHERE routeID=$_SESSION['routeID'] ORDER BY positionInRoute ASC"; //TODO don't hardcode this
$result = $conn->query($sql);
$table = array();
if ($result->num_rows > 0) {
// output data of each row
  while($row = $result->fetch_assoc()) {
    //appends row to table
    $table[] = array($row["waypointID"],$row["location"],$row["routeID"],$row["prize"],$row["positionInRoute"]);
}

  //loads coords into array
  $output = array(); 
  for ($i = 0; $i < sizeof($table); $i++){
    array_push($output,$table[$i][1]);
  }
  //ouputs array as JSON
  $outputJSON = json_encode($output);
  echo $outputJSON;
}
?>