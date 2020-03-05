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
        <h1>Login</h1>
        <form form class="log" name="login" method="post" onsubmit="return validation()" action="index.php">
          <div class="row">
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input class="validate" id="inputUsername" name="inputUsername" type="text" required/>
              <label for="inputUsername">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">lock_outline</i>
              <input id="inputPassword" name="inputPassword" type="password" required/>
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
              <p class="margin medium-small"><a href="register.php">Register Now!</a></p>
            </div>
            <div class="input-field col s6 m6 l6">
              <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
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
// require ("connection.php");
// session_start();
// $sql = "SELECT username,hashPass,salt FROM student_users";
// $result = $conn->query($sql);
// $found = False;

// $row_test = "";
// // output data of each row
// if (isset($_POST['login']) && !empty($_POST['inputUsername']) && !empty($_POST['inputPassword'])) {  //login validation
//    while($row = $result->fetch_assoc()) {
//      if ($_POST['inputUsername'] == $row['username']) {
//       $attempt_hash = hash('sha256',$_POST['inputPassword'].$row['salt']);  
//        if ($attempt_hash == $row['hashPass']) {
//         echo 'Correct password for ',$row['username'];
//         header('Location: TreasureHunt.php');
//         $found = True;
//        }
//      }
//    }
//    if(!$found){
//      echo "Incorrect Details";
//      echo "<br>Name: " . $_POST['inputUsername'];
//      echo "<br>Pass: " . $_POST['inputPassword'];
//      echo "<br>Hash: " . hash('sha256',$_POST['inputPassword'].'??Z+79?`?w85|');
//    }
// }


//https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection
//https://stackoverflow.com/questions/44997146/how-fetch-multiple-rows-from-mysql-using-prepared-statements
//References I used ^^^

session_start();
//Why log in again? Only way to logout is to click logout.
//Having this avoids them having to type in the full URL if they want to go straight to treasure hunt.
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  header("Location: TreasureHunt.php");
  exit;
}

//Ensures the connection to the database is established. We only need it initialised once.
require_once "connection.php";

//Avoids errors to do with get URLs.
if($_SERVER["REQUEST_METHOD"] == "POST"){

   $CheckUsername = $_POST['inputUsername'];
   $CheckPassword = $_POST['inputPassword'];


  //Prepared statement that allows us to select wanted things.
  $query = $conn->prepare("SELECT username, hashPass, salt, accessLevel FROM `student_users` WHERE username = ?");
  //Fills prepared statement with a string, avoids injection and allows us to check DB.
  $query->bind_param("s", $CheckUsername);
  //Executes query and stores it in memory.
  $query->execute();
  //Creates associative array with table output from executing.
  $result = $query->get_result();
  
  //Check if the username matches the password.
  while ($user = $result->fetch_assoc()){
    if (($user['username'] == $CheckUsername) && (hash('sha256',$CheckPassword.$user['salt']) == $user['hashPass'])) {
      //Allows skipping log in page again and means no unauthorised access in other pages.
      $_SESSION["loggedin"] = true;
      $_SESSION["username"] = $CheckUsername;
      //Tells us if they're a gamemaker or a player.
      $_SESSION["privileges"] = $user["accessLevel"];

      //Redirects
      header("Location: TreasureHunt.php");
      die();
  }
}
//Frees memory result of query.
$query->close();

//Incorrect credentials result.
$error = "Incorrect username or password.";

//Counts login attempts.
// if(isset($_SESSION["counter"])) {
//   //If they fail to login, will reach this stage (won't die()) and increase counter.
//   $_SESSION["counter"] = $_SESSION["counter"] + 1;
//   //If 3 failed login attempts I'll freeze the page for 10 seconds.
//   if (($_SESSION["counter"]) > 3){
//     $error = "Too many incorrect login attempts. Waited 10 seconds. Please try again.";
//   }
// }

  //Initialises counter if not created.
  // else{
  //   $_SESSION["counter"] = 0;
  // }
}
?>