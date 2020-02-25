<!DOCTYPE html>
<html>
<head>
    <title>Treasure Hunt 2</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <link rel="stylesheet" href="websiteStyling.css">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <!-- icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


</head>
<body>
<!-- Top nav bar -->
    <div id="topNavBar">
            <ul>
                <li style="float: right;"><a  href="javascript: settingsPage();" data-target="settingsPage" class="sidenav-trigger">Menu</a></li>
            </ul>
        </div>
    </h1>
<body>

<!-- Side scrolling page -->
<ul id="settingsPage" class="sidenav">
    <div>
      <a href="#!" class="sidenav-close"><i class="material-icons md-36">close</i></a>
    </div>

<<<<<<< Updated upstream
    <li><div class="user-view">
      <h2>Settings</h2>
    </div></li>


    <!-- Night Mode option in settings    -->
    <div class="switch">
    <li><a style="display: inline-block" href="javascript:checkTime(); tickBox();">Night mode</a>
      <label>
        <input id="checkBoxNightMode" onchange="checkTime()" type="checkbox">
        <span style="float: right; margin: 17px;" class="lever"></span>
      </label>
    </div>
  </li>
  <script>
    function tickBox(){
      var checker = document.getElementById("checkBoxNightMode");
      if (checker.checked == true){
        checker.checked = false;
      }
      else {
        checker.checked = true;
      }
=======
  <!-- Night Mode option in settings    -->
  <div class="switch">
  <li><a style="display: inline-block" href="javascript:checkTime(); tickBox();">Night mode</a>
    <label>
      <input id="checkBoxNightMode" onchange="checkTime()" type="checkbox">
      <span style="float: right; margin: 17px;" class="lever"></span>
    </label>
  </div>
</li>
<script>
  function tickBox(){
    var checker = document.getElementById("checkBoxNightMode");
    if (checker.checked == true){
      checker.checked = false;
    }
    else {
      checker.checked = true;
>>>>>>> Stashed changes
    }
  </script>

    <li><a href="#!">Second Link</a></li>
    <li><div class="divider"></div></li>
    <li><a class="subheader">Subheader</a></li>
    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    <li><a href="#!"><i class="material-icons">directions_run</i>Logout</a></li>
  </ul>

<!-- Clues page -->
<ul id="cluesPage" class="sidenav">
  
    <div>
      <a href="#!" style="float: right;" class="sidenav-close"><i class="material-icons md-36">close</i></a>
    </div>

<<<<<<< Updated upstream
    <li><div class="user-view">
      <h2>Clues</h2>
    </div></li>
  </ul>


<!-- Google Map -->
<div id="googleMap" style="width:100%; height: 85vh;"></div>



</body>

<input type="file" accept="image/*" capture="camera">
<button type="button" id ="verify">Verify Location!</button>
<h2>Dan TES 1212 3U!"P£"U </h2>
=======
<!-- Google Map -->
<div id="googleMap" style="width:100%; height: 85vh;"></div>

<!--<a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
-->

</body>

>>>>>>> Stashed changes
<!-- Bottom Nav Bar -->
  <div class="bottom-nav">
    <div class="col s12" style="padding-left:0px!important;padding-right:0px!important;">
      <ul class="tabs tabs-fixed-width transparent white-text">
        <li class="tab col s3 white-text"><a href="leaderboards.php" class="active white-text"><i
              class="material-icons">account_circle</i></a></li>
        <li id="custom-button" class="tab col s3"><a href="#test2" class="white-text"><i
              class="material-icons" style="font-size:50px;">adjust</i></a></li>
        <li class="tab col s3"><a href="#test3" class="white-text"><i
              class="material-icons">explore</i></a></li>
      </ul>
    </div>
  </div>

  <!-- camera -->
  <input type="file" id="real-file" hidden="hidden" />
  <span id="custom-text"></span>
  <script>
    const realFileBtn = document.getElementById("real-file");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");

    customBtn.addEventListener("click", function() {
      realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function() {
      if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value.match(
          /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
      } else {
        customTxt.innerHTML = "No file chosen, yet.";
      }
    });
  </script>

<!-- <button type="button" class="btn btn-primary" onclick="checkTime()">Change Colour Mode</button> -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

<script src="map_themes.js"></script>
<script src="map_script.js"></script>
<script src="script.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</html>
