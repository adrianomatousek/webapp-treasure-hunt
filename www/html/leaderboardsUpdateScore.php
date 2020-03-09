<?php
      //file to load all data from stock table
      require("connection.php");
      session_start();
      
      $score = $_POST['score'];
      $uname = $_SESSION['username'];

      $sql = "UPDATE student_users SET score = $score WHERE username = $uname";

      if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
    
    $conn->close();
    
?>
