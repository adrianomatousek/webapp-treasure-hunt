<?php
session_start();

if ($_SESSION["loggedin"] != true){
  header("Location: index.php");
  exit;
}

$gameKeeperPlus = array("Admin", "Gamekeeper");

require_once ("connection.php");

$findRoutes = "SELECT routeID, routeName FROM routes";
$routes = $conn->query($findRoutes);
?>
<!DOCTYPE html>
<html>

<head>
  <title>The Hunt</title>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <link rel="icon" type="image/png" href="favicon.png" />

  <link rel="stylesheet" href="websiteStyling.css">

  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


  <!-- Slick CSS -->
  <link rel="stylesheet" type="text/css" href="slick/slick.css" />
  <link rel="stylesheet" type="text/css" href="slick/slick-theme.css" />


  <!-- icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>

<body>
  <!-- Top nav bar -->
  <div id="topNavBar">
    <ul class="z-depth-1">

      <!-- Help Button -->
      <li><a onclick="bottomNavGoTo(4)"><i class="material-icons">help</i></a></li>

      <li class="hide" style="float: left;"><a href="javascript: helpPage();" id="helpButton" data-target="helpPage"
      class="sidenav-trigger"><i class="material-icons">help</i></a></li>

      <!-- Change route button -->
      <li>
      <select name="setNewRoute" onchange="changeRoutes(this)">
        <option value="" disabled selected>Select a route</option>
        <?php
        if ($routes->num_rows > 0){
          while ($row = $routes->fetch_assoc()) {
            $routeIDValue = $row['routeID'];
            $routeName = $row['routeName'];
            echo "<option value=\"$routeIDValue\">$routeName</option>";
          }
      }
      ?>
      </select>

      </li>

      <!-- Setting Button -->
      <li style="float: right;"><a href="javascript: settingsPage();" data-target="settingsPage"
          class="sidenav-trigger"><i class="material-icons">settings</i></a></li>




    </ul>
  </div>

  <!-- Game over popup -->
  <div class="modcontainer">
    <div id="modal" class="modal">
      <div class="modal-content">
        <h4 style="text-align: center;">Well Done</h4>
        <p style="text-align: center;">All the treasures have been found !!!</p>
        <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="data:image/jpeg;base64,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" alt="" height="" width="">
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
  </div>

  <!-- Settings side menu -->
  <ul id="settingsPage" class="sidenav fixed right-aligned">
    <div>
      <a href="#!" class="sidenav-close"><i class="material-icons md-36">close</i></a>
    </div>

    <li>
      <div class="user-view">
        <h2>Settings</h2>
      </div>
    </li>

    <!-- Night Mode option in settings    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:checkTime(); tickBox();"><i class="material-icons">wb_sunny</i>Night mode</a>
			<label>
				<input id="checkBoxNightMode" onchange="checkTime()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Animations option in settings -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleMarkerAnimations(); tickBox2();"><i class="material-icons">directions_run</i>Animations</a>
			<label>
				<input id="checkBoxAnimations" onchange="toggleMarkerAnimations()" type="checkbox" checked = "true">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Marker names option in settings    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleMarkerNames(); tickBox3();"><i class="material-icons">pin_drop</i>Pin names</a>
			<label>
				<input id="checkBoxMarkerNames" onchange="toggleMarkerNames()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Help/hints for how to use the app (not used yet - remove later if not used at all)    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleHints(); tickBox4();"><i class="material-icons">info</i>Hints</a>
			<label>
				<input id="checkBoxHints" onchange="toggleHints()" type="checkbox" checked = "true">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Marker opacity    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleMarkerOpacity(); tickBox5();"><i class="material-icons">person_pin_circle</i>Transparent pins</a>
			<label>
				<input id="checkBoxMarkerOpacity" onchange="toggleMarkerOpacity()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Extra locations    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleExtraLocations(); tickBox6();"><i class="material-icons">near_me</i>Extra locations</a>
			<label>
				<input id="checkBoxExtraLocations" onchange="toggleExtraLocations()" type="checkbox" checked = "true">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

    <li>
      <div class="divider"></div>
    </li>
    <li><a class="subheader">Account & Other</a></li>
    <li><a href="tel:01392723999"><i class="material-icons">phone</i>Non-Critical Estate Patrol</a></li>
    <li><a onclick="bottomNavGoTo(3)"><i class="material-icons" id="FAQ">contact_support</i>FAQ</a></li>
    <li><a href="logout.php"><i class="material-icons">exit_to_app</i>Logout</a></li>

    <?php if ($_SESSION['accessLevel'] == 'Admin') { ?>
      <li><a href="adminPage.php">Admin Page</a></li>
    <?php }
          if (in_array($_SESSION['accessLevel'], $gameKeeperPlus)) { ?>
            <li><a href="gameKeeper.php">Gamekeeper page</a></li>
          <?php } ?>
  </ul>

<br>
  <!-- <br>
   <div> this somehow fixes weird bug where map dissapears lol?? -->
    <h1>
    </h1>


  <div class="carousel-pages">
    <div class="carousel-page">
      <!-- Page 1: Google Maps -->
      <div class="map-container">
        <div id="googleMap" class="map"></div>
      </div>
    </div>
    <div class="carousel-page">
      <!-- Page 2: QR Scanner -->
      <div id="loadingMessage">🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
      <div class="canvas-container">
        <canvas id="canvas" hidden=""></canvas>
      </div>
      <div id="output" hidden="">
        <div id="debugMessage">test</div>
        <div id="outputMessage">No QR code detected.</div>
        <div hidden=""><b>Data:</b> <span id="outputData"></span></div>
      </div>
    </div>
    <div class="carousel-page">
      <!-- Page 3: Leaderboard -->
      <div class="container">
        <div class="score-section">
          <h6>Score: <span id="your-score">0</span></h6>
        </div>
        <table class ="centered" width="450" >
          <!-- Table created to store data -->
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody id="mytable">
          </tbody>
        </table>
      </div>

    </div>
    <div class="carousel-page">
      <!-- Page 3: FAQ -->
        <div class="container">
        <p>Frequently Asked Questions</p>
        <ul class="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">camera_enhance</i>How do I scan a QR code?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>To scan a QR code and verify that you
                 have been to the location please click the icon in the shape of a circle at the centre of the
                  bottom bar and use the pop-up camera to scan the QR code.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>How do I know I am getting close to the waypoint?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>If you are struggling or think
                 you are lost we have made it so your current location is displayed
                  as a purple marker in the map to help you navigate. Updating in real time
                  it should allow you to see where you are at any given time.
                  </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">whatshot</i>How can I check how I am doing against other teams?
                 <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>By clicking on the icon in the bottom right of the page
                the Leaderboard will be able to show how you're doing against other teams.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>My current location isnt showing?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>Please go to your browser settings and ensure
                you've given us permission to use your location. If you don't recieve the option to give location
                when entering the site please try reload the page or seek help.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>Need some help with finding the treasure?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>To get a clue, please click the treasure chest marking the treasure and click the
                  green "show clue" button to get a clue to help you find the place. Please note
                  that this could cost you quite a few points.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>An error on QR scanner page?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>If you get the message "Unable to access video stream" on the camera,
                 please make sure you have camera access enabled for your browser and for our website.
                </span>
              </div>
            </li>
          </ul>

      </div>
    </div>

    <div class="carousel-page" style="overflow: auto; height: 76vh;">
      <div id="">
      <!-- Page 4: Help Page -->
        <p style="text-align:center;">Welcome to the hunt! This is a game where you'll move to different places to find some treasure.</p>
        <h2 style="text-align: center;">How To Play</h2>
        <div class ="cont" style="width:100%; text-align:center;">
          <ol class="rounded-list">
            <li><a href="">Check your map and locate the next treasure location</a></li>
            <li><a href="">Move to your current treasure location</a></li>
            <li><a href="">Find and scan QR code at the treasure location</a></li>
            <li><a href="">Move to the next treasure location</a></li>
          </ol>
        </div>

        <p style="text-align: center;">Good luck have fun !! Please click Below to start!
        </p>
        <p style="text-align: center;">
          <a href="javascript: bottomNavGoTo(0);" class="waves-effect waves-light btn"><i class="material-icons left">near_me</i>Begin</a>
        </p>
      </div>


    </div>
  </div>

  <!-- Bottom Nav Bar -->
  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="bottom-nav">
          <div class="col s12" style="padding-left:0px!important;padding-right:0px!important;">
            <ul class="tabs tabs-fixed-width transparent white-text">
              <li class="tab col s3 white-text"><a href="javascript: bottomNavGoTo(0);" class="active black-text"><i
                    class="material-icons">explore</i></a></li>
              <li class="tab col s3"><a href="javascript: bottomNavGoTo(1);" class="black-text"><i
                    class="material-icons" style="font-size:50px;">adjust</i></a></li>
              <li class="tab col s3"><a href="javascript: bottomNavGoTo(2);" class="black-text"><i
                    class="material-icons">account_circle</i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- <button type="button" class="btn btn-primary" onclick="checkTime()">Change Colour Mode</button> -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="slick/slick.js"></script>

  <script src="map_themes.js"></script>
  <script src="map_script.js"></script>
  <script src="script.js"></script>
  <script src="clues_script.js"></script>
  <script src="score_script.js"></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap">
  </script>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="jsQR.js"></script>
  <script src="camera.js"></script>

</body>

</html>

<script>
function changeRoutes(select){
    routeID = select.value; 
    playerScore = 0;
    addScore(0);
    removeAllMarkers();
    $_SESSION['routeID'] = routeID;
    $.post('loadMarkers.php', function (data) {
        points = JSON.parse(data);
        //retireves a JSON array of points and is converted to a JavaScript array
    });
    nextWaypoint();
}
</script>