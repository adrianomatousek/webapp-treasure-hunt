<?php
  session_start();
  session_unset();
  session_destroy();
  //session variables destroyed and redirected to login page
  header("location:index.php");
  exit();

 ?>
