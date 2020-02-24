<?php
  require("connection.php");
  $waypointID = ""
  $location = "lat,long"
  $routeID = ""
  $prize = ""
  $position = ""
  $sql = "INSERT INTO waypoints VALUES(
    '$waypointID',
    '$location',
    '$routeID',
    '$prize',
    '$position'
  )
  ";
?>