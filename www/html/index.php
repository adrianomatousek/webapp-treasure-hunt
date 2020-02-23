<!DOCTYPE html>
<html>
  <head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login_styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  </head>

  <body>

    <div id="container">
    <div class="col s12 z-depth-6 card-panel">
      <form class="login-form" name = "login" method="POST" action = "index.php">
        <div class="row">
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i>
            <input id="inputUsername" type="text">
            <label for="inputUsername">Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <input id="inputPassword" type="password">
            <label for="inputPassword">Password</label>
          </div>
        </div>

        <div class="row">
           <div class="input-field col s12">
             <input type="submit" class="btn waves-effect waves-light col s12" name="login" value="Login" />
           </div>
         </div>
        <div class="row">
          <div class="input-field col s6 m6 l6">
              <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
          </div>
        </div>

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
  header("Location: test.html");
   while($row = $result->fetch_assoc()) {
     if ($_POST['inputUsername'] == $row['username'] &&
     hash('sha256',$_POST['inputPassword']) == $row['hashPass']) {
        header("Location: test.html");
        echo 'Correct password for ',$row['username'];
        $found = True;
     }
   }
   if(!$found){
     echo "Incorrect Details";
   }
}

 ?>
