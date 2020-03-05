<!DOCTYPE html>
<html>

<head>
  <title>Login</title>
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
        <form form class="reg" name="register" method="post" onsubmit="return validation()" action="register.php">
          <div class="row">
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="inputUsername" name="inputUsername" type="text">
              <label for="inputUsername">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="inputPassword" name="inputPassword" type="password">
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

  <script>
    function validation() {
      //to check if input fields are empty
      var uname = document.login.inputUsername.value;
      var psw = document.login.inputPassword.value;
      if (uname == "" || psw == "") {
        alert("Please fill in all fields. One or more fields are blank");
        return false;
      }
    }
  </script>
</body>


</html>


<?php

function generateRandomString($length = 10) {
  return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}

 require ("connection.php");
 // output data of each row
 if (isset($_POST['register']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {  //login validation
  $user = $_POST['inputUsername'];
  $salt = generateRandomString(16);
  $pwd = hash('sha256',$_POST['inputPassword'].$salt);
  $sql = "INSERT INTO student_users (username,hashPass,salt,accessLevel,score,name,email,gamekeeperID) VALUES ('$user', '$pwd', '$salt','Student',0,'name','email','ChiefGamekeeper')";
  if ($result = $conn->query($sql)) {
  echo "added";
  }
 }

  ?>
