<!DOCTYPE html>
<html>
  <head>
  <title>Login</title>
  </head>

  <body>

    <div class = "form">
      <!-- Login form -->
      <h1>Login</h1>
      <form class = "log" name = "login"method="post" onsubmit="return validation()">
        <p>Username</p>
	      <input type ="text" name ="Username" placeholder="Username"><br>
        <p>Password</p>
        <input type = "password" name = "Password" placeholder="Password">
        <input type="submit" name = "login" value="Login">
        <a href="#">Forgotten Password</a><br>

      </form>
    </div>

    <script>
    function validation(){
      //to check if input fields are empty
      var uname = document.login.Username.value;
      var psw = document.login.Password.value;
      if(uname == "" || psw == ""){
        alert("Please fill in all fields. One or more fields are blank");
        return false;
      }
    }

    </script>
  </body>

</html>

<?php
 ?>

<?php
echo 'hello world';
?>