<!DOCTYPE html>
<html>
<head>
    <title>University of Exeter Treasure Hunt</title>
    <link rel="stylesheet" href="websiteStyling.css">
    <link rel="stylesheet" href="contactMeStyling.css">
</head>
    <h1>
        <div id="topNavBar">
            <ul>
                <li><a href="#index.php">Home</a></li>

            </ul>
        </div>
    </h1>
<body>
        <div id="googleMap" style="width:100%; height: 75vh;"></div>
    <script>
        function myMap() {
            var mapProp= {
                // center:new google.maps.LatLng(51.508742,-0.120850),
                   center:new google.maps.LatLng(50.735882,-3.534206),
                zoom:16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                  {
                    "featureType": "poi",
                    "stylers": [
                      { "visibility": "off" }
                    ]
                  }
                ]
            };

                var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
            }
    </script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1BcEMRCURawddT4GEKPVl_NXxRwPyRrQ&callback=myMap"></script>


</body>

<input type="file" accept="image/*" capture="camera">
</html>
