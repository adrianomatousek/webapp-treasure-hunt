<?php
      //file to load all data from stock table
      require("connection.php");
      $sql = "SELECT score, username FROM student_users";
      $result = $conn->query($sql);
      $data = array();
      $alldata = array(); //second array to hold all data

      while($row = $result->fetch_assoc()) {
        $data['score'] = $row['score'];
        $data['username'] = $row['username'];
        array_push($alldata, $data); //data is inserted into second array
      }

      $mydata =  json_encode($alldata); //encoded in json format
      echo $mydata; //echoed so that it can read y AJAX call
      $conn->close();
?>
