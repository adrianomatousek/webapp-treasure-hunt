<!DOCTYPE html>
<html>
  <head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login_styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  </head>

  <body>
    <!-- Login page -->
    <div id="container">
      <div class="col s12 z-depth-6 card-panel">
        <h1>Login</h1>
        <form form class = "log" name = "login" method="post" onsubmit="return validation()" action = "index.php">
          <div class="row">
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="inputUsername" name = "inputUsername" type="text">
              <label for="inputUsername">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="inputPassword" name = "inputPassword" type="password">
              <label for="inputPassword">Password</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
               <button type='submit' name='login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6 m6 l6">
                <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
            </div>
          </div>

        </form>
      </div>
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
require ("connection.php");

$sql = "SELECT username,hashPass FROM student_users";
$result = $conn->query($sql);
$found = False;
// output data of each row
if (isset($_POST['login']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {  //login validation
   while($row = $result->fetch_assoc()) {
     if ($_POST['inputUsername'] == $row['username'] &&
     hash('sha256',$_POST['inputPassword']) == $row['hashPass']) {
        // echo 'Correct password for ',$row['username'];
        header('Location: TreasureHunt.php');
        $found = True;
     }
   }
   if(!$found){
     echo "Incorrect Details";
   }
}

 ?>
