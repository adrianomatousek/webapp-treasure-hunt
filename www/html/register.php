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
            <!-- <input type="checkbox" id="showPassword" onchange="togglePass()"/> -->
          </div>
          <div class="row">
            <p>
                <label>
                <input type="checkbox" id="showPassword" onclick="togglePass()" autocomplete="off"/>
                <span>Tick to show password</span>
                </label>
            </p>
          </div>
          <!-- <input type="checkbox" id="showPassword" onchange="togglePass()"/>
          <label for="showPassword"> Click to show password</label><br> -->
          

          <!-- <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="inputUsername" name="inputUsername" maxlength="10" type="text" required/>
              <label for="inputUsername">Username</label>
            </div>
          </div> -->

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
<script>



function togglePass(){
  var passwordID = document.getElementById("inputPassword");
  var box = document.getElementById("showPassword");
  if (box.checked != false){
    passwordID.type = 'text';
  }
  else{
    passwordID.type = 'password';
  }
}

</script>


<!-- Consider creating a function to toggle visibility of password so they can see. -->

</body>
</html>


<?php

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  header("Location: TreasureHunt.php");
  exit;
}

function generateRandomString($length = 16) {
  return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
require ("connection.php");

    if (isset($_POST['register']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {  //login validation
      $user = $_POST['inputUsername'];

      $query = $conn->prepare("SELECT COUNT(*) as usernameNo FROM `student_users` WHERE username = ?");
      //Fills prepared statement with a string, avoids injection and allows us to check DB.
      $query->bind_param("s", $user);
      //Executes query and stores it in memory.
      $query->execute();
      
      $result = $query->get_result();
      $data = $result->fetch_assoc();
      $usernameCount = $data['usernameNo'];

      $query->close();

      if ($usernameCount > 0){
        echo '<script type="text/javascript"> alert("Account with that username already exists"); </script>';
      }
      if ($usernameCount === 0){

        //References used: https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection.
        $accessLevel1 = 'Student';
        $realName1 = 'realName';
        $email1 = 'email'; 
        $gamekeeperID1 = 'chiefGamekeeper';



        $salt = generateRandomString();
        $pwd = hash('sha256',$_POST['inputPassword'].$salt);
        $addAcc = $conn->prepare("INSERT INTO `student_users` (username, hashPass, salt, accessLevel, name, email, gamekeeperID) VALUES (?,?,?,?,?,?,?)");
        
        //Ideally passed as parameters (don't think you can pass as strings in bind_param).
        //Parameters need to be replaced with actual values that we can use and send.
        $addAcc->bind_param('sssssss', $user, $pwd, $salt, $accessLevel1, $realName1, $email1, $gamekeeperID1);
        $addAcc->execute();
        $addAcc->close();

        if (registered) {
          header("location: index.php");
        }
      }
  }
?>
