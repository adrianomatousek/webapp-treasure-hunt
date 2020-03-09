<?php
require("connection.php");
$lastRoute = $conn->query("SELECT * FROM routes ORDER by routeID DESC LIMIT 1");
if ($lastRoute->num_rows > 0) {
    // output data of each row
    while($row = $lastRoute->fetch_assoc()) {
        echo $row["routeID"];
    }
}
?>
