<?php
session_start();

if ($_SESSION["loggedin"] != true){
  header("Location: index.php");
  exit;
}

$gameKeeperPlus = array("Admin", "Gamekeeper");

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
      <!-- Setting Button -->
      <li style="float: right;"><a href="javascript: settingsPage();" data-target="settingsPage"
          class="sidenav-trigger"><i class="material-icons">settings</i></a></li>

      <!-- Help Button -->
      <li style="float: left;"><a href="javascript: helpPage();" id="helpButton" data-target="helpPage"
          class="sidenav-trigger"><i class="material-icons">help</i></a></li>
    </ul>
  </div>

  <!-- modal section -->
  <div class="bg-modal">
    <div class="modal-content">

      <div class="close">+</div>

      <img
        src="data:image/png;base64,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"
        alt="" style="width:75px">

      <h2>How To Play</h2>
      <li>Step 1: Move to your current treasure location </li>
      <li>Step 2: Find and scan QR code at the treasure location </li>
      <li>Step 3: Move to the next treasure location </li>
      <!-- <a href="" class="button">Close</a> -->
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
		<li><a style="display: inline-block" href="javascript:toggleMarkerAnimations(); tickBox2();"><i class="material-icons">directions_run</i>Disable animations</a>
			<label>
				<input id="checkBoxNightMode" onchange="toggleMarkerAnimations()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

	<!-- Marker names option in settings    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleMarkerNames(); tickBox3();"><i class="material-icons">pin_drop</i>Show marker names</a>
			<label>
				<input id="checkBoxMarkerNames" onchange="toggleMarkerNames()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>
	
	<!-- Help/hints for how to use the app (not used yet - remove later if not used at all)    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleHints(); tickBox4();"><i class="material-icons">info</i>Hide hints</a>
			<label>
				<input id="checkBoxHints" onchange="toggleHints()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>
	
	<!-- Marker opacity    -->
    <div class="switch">
		<li><a style="display: inline-block" href="javascript:toggleMarkerOpacity(); tickBox5();"><i class="material-icons">person_pin_circle</i>Reduce marker opacity</a>
			<label>
				<input id="checkBoxMarkerOpacity" onchange="toggleMarkerOpacity()" type="checkbox">
				<span style="float: right; margin: 17px;" class="lever"></span>
			</label>
		</li>
    </div>

    <li>
      <div class="divider"></div>
    </li>
    <li><a class="subheader">Account & Other</a></li>
    <li><a href="logout.php"><i class="material-icons">directions_run</i>Logout</a></li>
    <li><a href="tel:01392723999"><i class="material-icons">phone</i>Non-Critical Estate Patrol</a></li>
    <li><a onclick="bottomNavGoTo(3)"><i class="material-icons">contact_support</i>FAQ</a></li>

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
  <div>
    <h1>
    </h1>
  </div>


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
        <table width="450" >
          <!-- Table created to store data -->
          <thead>
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>Points</th>
              <th>Time</th>
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
                <span>To scan a QR and verify that you
                 have been to the location please click the icon at centre of the
                  bottom navigation which is a circle and use the camera to scan the QR code.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>How do I know I am getting close to the waypoint?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>If you are struggling or think
                 you are lost we have made it so your current location is displayed
                  as a blue marker in the map to help you navigate.
                  </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">whatshot</i>How can I check how I am doing against other teams?
                 <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>By clicking on the last item
                the Leaderboard icon on the navigation bar at the bottom you will be able to see how you are doing against other teams.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>My current location isnt showing?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>Please go to setting and ensure
                 location access is allowed by your browser if you dont recieve the popup when entering the site.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>Need some help with finding the treasure?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>Please click the treasure chest marking the position and click the
                  green show clue button to get a clue to help you find the place. Please note
                  that this will cost you one point and can use a mximum of 2 clues for each point.
                </span>
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">place</i>An error on QR scanner page?
                <i class="caret material-icons">keyboard_arrow_down</i></div>
              <div class="collapsible-body">
                <span>If you get the message "Unable to access video stream" message please make sure you have camera
                  access enabled for your browser.
                </span>
              </div>
            </li>
          </ul>

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
