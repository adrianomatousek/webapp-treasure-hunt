<!DOCTYPE html>
<html>
  <head>
    <h1>
    </h1>
  </head>
  <body>
    <form>
      <p>Select privileges to give user:</p>
      <select name="privileges">
        <option value=""></option>
        <option value="Student">Student</option>
        <option value="Gamekeeper">Gamekeeper</option>
        <option value="Admin">Admin</option>
      </select><br>

      <p>Select user to give privileges:</p>
      <input class="validate" id="inputUsername" name="inputUsername" maxlength="10" type="text" required/>
                
      <p>Assign privileges to user:</p>
      <button type='submit' name='assign'>Assign privileges</button>
            
    </form>
  </body>
</html>

<?php

require_once ("connection.php");

// error_reporting(-1);
ini_set('display_errors',1);
error_reporting(-1);
// display_errors = on;

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  if ($_SESSION['privileges'] != 'Admin'){
    header("Location: TreasureHunt.php");
    exit;
  }
  else{
    header("Location: index.php");
  }
}

// if (isset($_POST['assign']) && !empty($_POST['inputUsername'])) {
  if(isset($_POST['assign'])){
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

    if ($usernameCount !== 1){
      echo '<script type="text/javascript"> alert("Invalid username"); </script>';
    }
    if ($username == 1){
      $newAccessLevel = $_POST['privileges'];
      
      $statement = "UPDATE `student_users` SET accessLevel=? WHERE username=?";
      
      $setLevel = $conn->prepare($statement);
      $setLevel->bind_param('ss', $newAccessLevel, $user);
      $setLevel->execute();
      $setLevel->close();
    }
}
?>