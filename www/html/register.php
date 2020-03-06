<!DOCTYPE html>
<html>

<head>
  <title>Registration</title>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">

  <link rel="stylesheet" type="text/css" href="login_styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
</head>

<body>
  <!-- Login page -->

  <div class="container">
    <div class="row">
      <div class="col s0 m3 l4">
      </div>

      <div class="col s12 m6 l4 z-depth-6 card-panel">
        <h1>Register</h1>
        <form form class="reg" name="register" method="post" action="register.php">
        <!-- onsubmit="return validation()"  -->
          <div class="row">
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="inputUsername" name="inputUsername" maxlength="10" type="text" required/>
              <label for="inputUsername">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="inputPassword" minlength="8" name="inputPassword" type="password" required/>
              <label for="inputPassword">Password</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <button type='submit' name='register' class='col s12 btn btn-large waves-effect indigo'>Register</button>
            </div>
          </div>

        </form>
      </div>
      <div class="col s0 m3 l4">
      </div>
    </div>
  </div>

<!-- Consider creating a function to toggle visibility of password so they can see. -->

  <!-- <script>
    function validation() {
      //to check if input fields are empty
      var uname = document.getElementById('inputUsername').value;
      var psw = document.getElementById('inputPassword').value;
      console.log(uname);
      console.log(psw);
      if (uname == "" || psw == "") {
        alert("Please fill in all fields. One or more fields are blank");
        return false;
      }
      return true;
    }
  </script> -->
</body>


</html>


<?php

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  header("Location: TreasureHunt.php");
  exit;
}
$registered = false;

function generateRandomString($length = 10) {
  return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
require ("connection.php");

// if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if (isset($_POST['register']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {  //login validation
      $user = $_POST['inputUsername'];

      $query = $conn->prepare("SELECT username FROM `student_users` WHERE username = ?");
      //Fills prepared statement with a string, avoids injection and allows us to check DB.
      $query->bind_param("s", $user);
      //Executes query and stores it in memory.
      $query->execute();
      //Checks how many rows affected, if 1 or more, the account must already exist.
      if ($query->get_result() != null){
        echo '<script type="text/javascript"> alert("Account with that username already exists"); </script>';
        $query->close();
        //Avoid doing anything else (saves processing power and data usage).
        die();
      }
      else{ 
        $query->close();

        //References used: https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection.
        $accessLevel1 = 'Student';
        $realName1 = 'realName';
        $email1 = 'email'; 
        $gamekeeperID1 = 'chiefGamekeeper';



        $salt = generateRandomString(16);
        $pwd = hash('sha256',$_POST['inputPassword'].$salt);
        // $sql = "INSERT INTO student_users (username,hashPass,salt,accessLevel,score,name,email,gamekeeperID) VALUES ('$user', '$pwd', '$salt','Student',0,'name','email','ChiefGamekeeper')";
        $addAcc = $conn->prepare("INSERT INTO `student_users` (username, hashPass, salt, accessLevel, name, email, gamekeeperID) VALUES (?,?,?,?,?,?,?)");
        
        //Ideally passed as parameters (don't think you can pass as strings in bind_param).
        //Parameters need to be replaced with actual values that we can use and send.
        $addAcc->bind_param('sssssss', $user, $pwd, $salt, $accessLevel1, $realName1, $email1, $gamekeeperID1);
        $addAcc->execute();
        $registered = true;
        $addAcc->close();

        if (registered) {
          header("location: index.php");
        }
      }
  }
?>
