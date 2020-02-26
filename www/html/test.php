<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="testStyling.css">
  </head>

  <body>
    <input type="file" id="real-file" hidden="hidden" />
    <!-- <button type="button" id="custom-button">CHOOSE A FILE</button> -->
    <i id="custom-button" class="material-icons">adjust</i>
    <span id="custom-text"></span>

    <div class="sidenav onright" id="sidenav3" style="width: 300px; display: block; right: 0%;">
            <ul class="nav-items">
                <li class="nav-item"><a href="#!">Item 1</a></li>
                <li class="nav-item"><a href="#!">Item 2</a></li>
                <li class="nav-item"><a href="#!">Item 3</a></li>
            </ul>
    </div>

  </body>



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
</html>
