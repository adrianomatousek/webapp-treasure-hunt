<!DOCTYPE html>
<html>

<head>
  <title>The Hunt</title>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">

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
      <li style="float: right;"><a href="javascript: settingsPage();" data-target="settingsPage"
          class="sidenav-trigger"><i class="material-icons">settings</i></a></li>
    </ul>
  </div>

  <!-- Settings side menu -->
  <ul id="settingsPage" class="sidenav">
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
      <li><a style="display: inline-block" href="javascript:checkTime(); tickBox();">Night mode</a>
        <label>
          <input id="checkBoxNightMode" onchange="checkTime()" type="checkbox">
          <span style="float: right; margin: 17px;" class="lever"></span>
        </label>
    </div>

    <!-- Test -->
    <div class="switch">
      <li><a style="display: inline-block" href="javascript:checkTime(); tickBox();">Option 2</a>
        <label>
          <input id="checkBoxNightMode" onchange="checkTime()" type="checkbox">
          <span style="float: right; margin: 17px;" class="lever"></span>
        </label>
    </div>

    </li>

    <li><a href="#!">Second Link</a></li>
    <li>
      <div class="divider"></div>
    </li>
    <li><a class="subheader">Subheader</a></li>
    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    <li><a href="#!"><i class="material-icons">directions_run</i>Logout</a></li>
  </ul>

  <!-- Clues side menu -->
  <ul id="cluesPage" class="sidenav">
    <div>
      <a href="#!" class="sidenav-close"><i class="material-icons md-36">close</i></a>
    </div>

    <li>
      <div class="user-view">
        <h2>Clues</h2>
      </div>
    </li>
  </ul>
  <br>
  <!-- <div> this somehow fixes weird bug where map dissapears lol?? -->
  <div>
    <h1>
    </h1>
  </div>


  <div class="carousel-pages">
    <div class="carousel-page">
      <!-- Page 1: Google Maps -->
      <div id="googleMap" class="map"></div>
    </div>
    <div class="carousel-page">
      <!-- Page 2: QR Scanner -->
      <div id="loadingMessage">🎥 Unable to access video stream (please make sure you have a webcam enabled)</div>
      <div class="canvas-container">
        <canvas id="canvas" hidden=""></canvas>
      </div>
      <div id="output" hidden="">
        <div id="outputMessage">No QR code detected.</div>
        <div hidden=""><b>Data:</b> <span id="outputData"></span></div>
      </div>
    </div>
    <div class="carousel-page">
      <!-- Page 3: Leaderboard -->
      <div class="container">
        <table>
          <tbody>
            <tr>
              <th>Place</th>
              <th>Username</th>
              <th>Points</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Jessie</td>
              <td>102,345</td>
              <td>1s</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>2,321</td>
              <td>2s</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Test</td>
              <td>321</td>
              <td>3s</td>
            </tr>
          </tbody>
        </table>
      </div>



    </div>
  </div>

  <br>

  <!-- Bottom Nav Bar -->
  <div class="bottom-nav">
    <div class="col s12" style="padding-left:0px!important;padding-right:0px!important;">
      <ul class="tabs tabs-fixed-width transparent white-text">
        <li class="tab col s3 white-text"><a href="javascript: bottomNavGoTo(0);" class="active black-text"><i
              class="material-icons">account_circle</i></a></li>
        <li class="tab col s3"><a href="javascript: bottomNavGoTo(1);" class="black-text"><i class="material-icons"
              style="font-size:50px;">adjust</i></a></li>
        <li class="tab col s3"><a href="javascript: bottomNavGoTo(2);" class="black-text"><i
              class="material-icons">explore</i></a>
        </li>
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

    customBtn.addEventListener("click", function () {
      realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function () {
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
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="slick/slick.js"></script>

  <script src="map_themes.js"></script>
  <script src="map_script.js"></script>
  <script src="script.js"></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap">
  </script>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script src="jsQR.js"></script>
  <script src="camera.js"></script>

</body>

</html>