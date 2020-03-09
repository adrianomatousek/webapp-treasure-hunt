<?php
require("connection.php");

//grabs the routeID of the last entry in the database, puts in newRouteID
$newRouteID;
$lastRoute = $conn->query("SELECT * FROM routes ORDER by routeID DESC LIMIT 1");
if ($lastRoute->num_rows == 1) {
    // output data of each row
    while($row = $lastRoute->fetch_assoc()) {
        $newRouteID = $row["routeID"] + 1;
    }
}
echo $newRouteID;
?>
