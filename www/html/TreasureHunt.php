<!DOCTYPE html>
<html>
<head>
    <title>University of Exeter Treasure Hunt</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <link rel="stylesheet" href="websiteStyling.css">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

</head>
<body>
<!-- Top nav bar -->
    <div id="topNavBar">
            <ul>
                <li style="float: right;"><a  href="#" data-target="slide-out" class="sidenav-trigger">Menu</a></li>
            </ul>
        </div>
    </h1>
<body>

      <!-- Side nav bar -->
<ul id="slide-out" class="sidenav">
  <div>
    <a href="#!" class="sidenav-close"><i class="material-icons md-36">close</i></a>
  </div>

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
  }
</script>
  <li><a href="#!">Second Link</a></li>
  <li><div class="divider"></div></li>
  <li><a class="subheader">Subheader</a></li>
  <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
  <li><a href="#!"><i class="material-icons">directions_run</i>Logout</a></li>
</ul>




<!-- Google Map -->
<div id="googleMap" style="width:100%; height: 85vh;"></div>



</body>

<input type="file" accept="image/*" capture="camera">
<button type="button" id ="verify">Verify Location!</button>

<!-- Bottom Nav Bar -->


  <div class="bottom-nav">
    <div class="col s12" style="padding-left:0px!important;padding-right:0px!important;">
      <ul class="tabs tabs-fixed-width transparent white-text">
        <li class="tab col s3 white-text"><a href="#test1" class="active white-text"><i
              class="material-icons">account_circle</i></a></li>
        <li class="tab col s3"><a href="#test2" class="white-text"><i class="material-icons">chat_bubble</i></a></li>
        <li class="tab col s3"><a href="#test3" class="white-text"><i class="material-icons">explore</i></a></li>
      </ul>
    </div>
  </div>

<!-- <button type="button" class="btn btn-primary" onclick="checkTime()">Change Colour Mode</button> -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>

<script src="map_themes.js"></script>
<script src="map_script.js"></script>
<script src="script.js"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</html>
