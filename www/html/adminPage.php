<!DOCTYPE html>
<html>
  <head>
    <h1>
    </h1>
  </head>
  <body>
  <form name="assign" method="post">
      <p>Select privileges to give user:</p>
      <select name="privileges">
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
  <br><br><br><br><br>
  <button type="button" onclick="history.back()">Return to hunt </button>
</html>

<?php

session_start();

require_once ("connection.php");

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  if ($_SESSION["accessLevel"] != 'Admin'){
    header("Location: TreasureHunt.php");
    exit;
  }
}
else{
  header("Location: index.php");
}

$authorisedUserTypes = array("Admin", "Gamekeeper");
if ($_SESSION["loggedin"]){
  if (!in_array($_SESSION["accessLevel"], $authorisedUserTypes)) {
    //header("Location: TreasureHunt.php");
    //exit;
    echo $_SESSION["accessLevel"];
  }
}
else{
  header("Location: index.php");
  exit;
}


echo "<br>Access Level: ".$_SESSION['accessLevel']."<br>";
echo "Username: ".$_SESSION['username'],"<br>";

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
    if ($usernameCount == 1){
      $newAccessLevel = $_POST['privileges'];
      
      $setLevel = $conn->prepare("UPDATE `student_users` SET `accessLevel`=? WHERE `username`=?");
      $setLevel->bind_param('ss', $newAccessLevel, $user);
      $setLevel->execute();
      $setLevel->close();
    }
}
?>