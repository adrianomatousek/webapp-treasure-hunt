<?php
require("connection.php");
$sql = "SELECT * FROM waypoints WHERE routeID='1'"; //TODO don't hardcode this
$result = $conn->query($sql);
$table = array();
if ($result->num_rows > 0) {
// output data of each row
while($row = $stocksResult->fetch_assoc()) {
  //appends row to table
  $table[] = array($row["waypointID"],$row["location"],$row["routeID"],$row["prize"],row["positionInRoute"]);
}

//loads coords into array
$output = array(); 
for ($i = 0; $i < sizeof($table); $i++){
  array_push($output,table[i][1]);
}
$outputJSON = json_encode($output);
echo $outputJSON;
}
?>