<!DOCTYPE html>
<html>
  <head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login_styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  </head>

  <body>

    <div class = "container">
      <a href="#!" class="test"><i class="material-icons md-48">account_circle</i></a>
      <!-- Login form -->
        <h1>Login</h1>
        <form class = "log" name = "login"method="post" onsubmit="return validation()" action = "index.php">
  	      <input type ="text" name ="inputUsername" placeholder="Username"><br>
          <input type = "password" name = "inputPassword" placeholder="Password">
          <input type="submit" name = "login" value="Login">
          <a href="#">Forgotten Password</a><br>

        </form>
    </div>

    <script>
    function validation(){
      //to check if input fields are empty
      var uname = document.login.inputUsername.value;
      var psw = document.login.inputPassword.value;
      if(uname == "" || psw == ""){
        alert("Please fill in all fields. One or more fields are blank");
        return false;
      }
    }

    </script>
  </body>

</html>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "treasurehunt";
$conn = new mysqli($servername,$username,$password,$database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username,hashPass FROM student_users";
$result = $conn->query($sql);
$found = False;
// output data of each row
if (isset($_POST['login']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {
   while($row = $result->fetch_assoc()) {
     if ($_POST['inputUsername'] == $row['username'] &&
     hash('sha256',$_POST['inputPassword']) == $row['hashPass']) {
        echo 'Correct password for ',$row['username'];
        $found = True;
     }
   }
   if(!$found){
     echo "Incorrect Details";
   }
}

 ?>
