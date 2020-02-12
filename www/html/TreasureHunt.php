<!DOCTYPE html>
<html>
<head>
    <title>University of Exeter Treasure Hunt</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">

    <link rel="stylesheet" href="websiteStyling.css">

        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">


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
  <li><div class="user-view">
    <h2>Settings</h2>
  </div></li>



  <!-- <li><a href="#!">Night mode</a>    -->
  <div class="switch">
  <li><a style="display: inline-block" href="#!">Night mode</a> 
    <label>
      <input type="checkbox">
      <span style="float: right; margin: 17px;" class="lever"></span>
    </label>
  </div>
</li>


  <li><a href="#!">Second Link</a></li>
  <li><div class="divider"></div></li>
  <li><a class="subheader">Subheader</a></li>
  <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
</ul>

<!-- Google Map -->
<div id="googleMap" style="width:100%; height: 75vh;"></div>


<!--<a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
-->

</body>

<input type="file" accept="image/*" capture="camera">

<button type="button" class="btn btn-primary" onclick="checkTime()">Change Colour Mode</button>
    
<script src="map_themes.js"></script>
<script src="script.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        

<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
  });

  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

  // Or with jQuery

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
 
</script>
<style>
body {
  width:100%;
}
</style>
</html>
