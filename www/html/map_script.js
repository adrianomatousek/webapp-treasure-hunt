var map;
var markerList = [];
var isDay = true;
var markers = markerList.length;
var activeInfoWindow;
var activeInfoLabel;
var activeMarker;
var showLabelOnMouseOver = true;  // displays small info/help label when mouse cursor is over a marker
var enableAnimations = true;
var customMarker;
var markerOpacity = 0.85;
var showMarkerNames = false;
var showInfoLabels = true;
var points = ["50.735882,-3.534206","50.734882,-3.535206","50.735882,-3.536206","50.736882,-3.534206"];
var activeClue;


function myMap() {
	map = new google.maps.Map(document.getElementById("googleMap"));
	var directionsService = new google.maps.DirectionsService,
		directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
	dayTime();
	addMarker(50.735882, -3.534206, 'Bob`s place', 'A nice and cozy place. Very well known by all Exeter students.<br>Bob likes to spend his time here.</br>', true);

	var pointA = new google.maps.LatLng(50.734882, -3.535206);
	var pointB = new google.maps.LatLng(50.736882, -3.534206);
	var button = document.getElementById('verify');

	button.onclick = function() {

			if(points.length>0){
				var marker = points[0].split(',');
				var lat = parseFloat(marker[0]);
				var long = parseFloat(marker[1]);
				addMarker(lat,long);
				points.shift();
			}


	};

	addCustomMarker();

}

function addMarker(latPos, lngPos, name, description, draggable = false) {
	markerNum = markers + 1;
	var color;
	if (isDay) {
		color = 'black';
	}
	else {
		color = 'white';
	}

	if (!name || name.length < 3) {
		name = 'Treasure';
	}

	var marker = new google.maps.Marker({
		position: { lat: latPos, lng: lngPos },
		map: map,
		label: {
			color: color,
			text: markerNum.toString(),
			fontSize: '18px',
			fontWeight: 'bold',
		},
		icon: {
			url: 'img/icons/chest.png',
			scaledSize: new google.maps.Size(50, 50),
			origin: new google.maps.Point(0, 0),
			labelOrigin: new google.maps.Point(25, 54)
		},
		draggable: draggable,
		animation: google.maps.Animation.DROP,
		id: markerNum - 1,
		opacity: markerOpacity,
		name: name
	});

	if (!description || description.length < 10) {
		var description = 'There is treasure to be found here!<br>Get here fast!</br>';
	}

	var contentString = '<div id="content"><div id="siteNotice">Treasure Location</div>' +
		'<h4 id="firstHeading" class="firstHeading">' + markerNum + '. ' + name +
		'</h4><div id="bodyContent"><p> ' + description + '</p>' +
		'<input type="button" id="cluesButton"  value="Clues for this treasure" data-target="cluesPage" class="sidenav-trigger">' +
		'</div>'

	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -16),
		content: contentString,
	});

	var infoLabel = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -16),
		content: '<div id="bodyContent"><p> This location contains a hidden treasure. Click for more info. </p></div>'
	});

	var firstClick;

	marker.addListener('click', function () {
		if (activeInfoLabel) {
			activeInfoLabel.close(map, marker);
			activeInfoLabel = null;
		}

		var markerToBeSet;

		if (activeMarker) {
			markerToBeSet = activeMarker;
			markerSetAnimation(markerToBeSet, null);

			activeMarker.setOpacity(markerOpacity);
		}

		if (activeInfoWindow) {
			activeInfoWindow.close();
		}

		if (activeMarker != marker) {
			var label = this.getLabel();
			if (isDay) {
				label.color = '#007766';
			}
			else {
				label.color = '#00ED87';
			}
			this.setLabel(label);

			if (activeMarker) {
				var oldLabel = activeMarker.getLabel();
				if (isDay) {
					oldLabel.color = 'black';
				}
				else {
					oldLabel.color = 'white';
				}
				activeMarker.setLabel(oldLabel);
			}
		}
		else {
			var label = this.getLabel();
			if (isDay) {
				label.color = 'black';
			}
			else {
				label.color = 'white';
			}
			this.setLabel(label);
		}

		if (activeInfoWindow !== infoWindow) {
			if (enableAnimations) {
				if (firstClick) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					firstClick = false;
				}
				else {
					markerSetAnimation(marker, 'BOUNCE-IF');
				}
			}
			marker.setOpacity(1);
			infoWindow.open(map, marker);
			activeInfoWindow = infoWindow;
			activeMarker = marker;
		}
		else {
			markerSetAnimation(markerToBeSet, null);
			activeInfoWindow = null;
			activeMarker = null;
		}
	});

	var mouseOnMarker = false;

	marker.addListener('mouseover', function () {
		if (marker == activeMarker) {
			return null;
		}
		this.setOpacity(markerOpacity + 0.05);
		var label = this.getLabel();
		if (isDay) {
			label.color = '#007766';
			//label.fontWeight = 'normal';
		}
		else {
			label.color = '#00ED87';
		}
		this.setLabel(label);

		if (showLabelOnMouseOver) {
			mouseOnMarker = true;
			setTimeout(function () {
				if (mouseOnMarker && !activeInfoWindow && !activeInfoLabel) {
					infoLabel.open(map, marker);
					activeInfoLabel = infoLabel;
				}
			}, 2000);
		}
	});

	marker.addListener('mouseout', function () {
		if (marker == activeMarker) {
			return null;
		}
		this.setOpacity(markerOpacity);
		var label = this.getLabel();
		if (isDay) {
			label.color = 'black';
		}
		else {
			label.color = 'white';
		}
		this.setLabel(label);

		mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});

	infoWindow.addListener('closeclick', function () {
		markerSetAnimation(activeMarker, null);
		activeMarker.setOpacity(markerOpacity);
		activeMarker = null;
		activeInfoWindow = null;
		var label = marker.getLabel();
		if (isDay) {
			label.color = 'black';
		}
		else {
			label.color = 'white';
		}
		marker.setLabel(label);

		mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});

	markerList.push(marker);
	markers += 1;
}

function removeMarker(id) {
	markerList[id].setMap(null);
	marketList.splice(id);  // not sure if this is the correct syntax for removing an element from an array, check this later
	if (activeInfoLabel == markerList[id].infoWindow) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	if (activeMarker == markerList[id].infoWindow) {
		activeMarker = null;
		activeInfoWindow = null;
	}
}


function removeAllMarkers() {
	for (i = 0; i < markerList.length; i++) {
		marketList[id].setMap(null);
	}
	if (activeInfoLabel) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	marketList = null;
	activeMarker = null;
	activeInfoWindow = null;

}

function addCustomMarker() {
	var marker = new google.maps.Marker({
		position: { lat: 50.735700, lng: -3.531150 },
		map: map,
		label: {
			color: 'black',
			text: 'Drag Me',
			fontSize: '16px',
			fontWeight: 'bold',
		},
		icon: {
			url: 'img/icons/orange-custom2.png',
			scaledSize: new google.maps.Size(40, 40),
			origin: new google.maps.Point(0, 0),
			labelOrigin: new google.maps.Point(20, -30)
		},
		draggable: true,
		animation: google.maps.Animation.BOUNCE
	});

	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, 4),
		content: 'Double click the marker when you are done.',
		//maxWidth: 300
		isOpen: false
	});

	var isOpen = false;

	marker.addListener('dragstart', function () {
		marker.setAnimation(null);
		if (infoWindow.isOpen) {
			infoWindow.close(map, marker);
			infoWindow.isOpen = false;
		}
	});

	marker.addListener('dragend', function () {
		infoWindow.open(map, marker);
		infoWindow.isOpen = true;
		setTimeout(function () {
			if (infoWindow.isOpen) {
				infoWindow.close(map, marker);
				markerSetAnimation(marker, 'BOUNCE');
				infoWindow.isOpen = false;
			}
		}, 3500);
	});

	infoWindow.addListener('closeclick', function () {
		markerSetAnimation(marker, 'BOUNCE');
		infoWindow.isOpen = false;
	});

	marker.addListener('dblclick', function () {
		saveCustomMarker();
	});
	customMarker = marker;
}

function saveCustomMarker() {
	var name = prompt("Enter the name of the place (minimum 3 characters): ");
	var description = prompt("Enter the description of the place (minimum 10 characters): ");
	latPos = customMarker.getPosition().lat();
	lngPos = customMarker.getPosition().lng();
	addMarker(latPos, lngPos, name, description);
	customMarker.setMap(null);
	customMarker = null;
}

function markerSetAnimation(marker, animation) {
	switch (animation) {
		case null:
			setTimeout(function () {
				marker.setAnimation(null);
			}, 300);
			break;
		case 'BOUNCE-IF':
			// Has to be done this way because Google's API has a bug that breaks the animation sometimes
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function () {
				if (activeMarker == marker) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}, 800);
			break;
		case 'BOUNCE':
			// Has to be done this way because Google's API has a bug that breaks the animation sometimes
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function () {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}, 800);
			break;
		case 'DROP':
			marker.setAnimation(google.maps.Animation.DROP);
			break;
		default:
			marker.setAnimation(null);
	}
}

function checkTime() {
	if (isDay) {
		nightTime();
		isDay = false;
	}
	else {
		dayTime();
		isDay = true;
	}
}

function dayTime() {
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_daytime
	});

	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			label.color = 'black';
			markerList[i].setLabel(label);
		}
	}
	if (customMarker) {
		var label = customMarker.getLabel();
		label.color = 'black';
		customMarker.setLabel(label);
	}

}
function nightTime() {
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_nighttime
	});
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			label.color = 'white';
			markerList[i].setLabel(label);
		}
	}
	if (customMarker) {
		var label = customMarker.getLabel();
		label.color = 'white';
		customMarker.setLabel(label);
	}
}

function toggleMarkerNames() {
	if (!showMarkerNames) {
		showAllMarkerNames();
	}
	else {
		hideAllMarkerNames();
	}
}

function showAllMarkerNames() {
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			label.text = i + 1 + '. ' + markerList[i].name;
			label.fontSize = '14px';
			markerList[i].setLabel(label);
		}
	}
}

function hideAllMarkerNames() {
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			label.text = markerList[i].id + 1;
			label.fontSize = '18px';
			markerList[i].setLabel(label);
		}
	}
}

function setMarkerOpacity(value) {
	markerOpacity = value;
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			markerList[i].setOpacity(value);
		}
	}
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
	directionsService.route({
		origin: pointA,
		destination: pointB,
		travelMode: google.maps.TravelMode.WALKING
	},
		function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
}


///////////////////////////////////////////////////////////
// 				 TEMPORARY - REMOVE LATER				 //
///////////////////////////////////////////////////////////

function bob(size = 200) {
	var marker = new google.maps.Marker({
		position: { lat: 50.745882, lng: -3.534206 },
		map: map,
		//title: '',
		label: {
			color: 'black',
			text: 'Atmaram',
			fontSize: '18px',
			fontWeight: 'bold'
		},
		icon: {
			url: 'img/icons/creeper.png',
			scaledSize: new google.maps.Size(size, size),
			origin: new google.maps.Point(0, 0)
		},
		draggable: true,
		animation: google.maps.Animation.BOUNCE
	});
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -15),
		content: '<div id="content"><div id="siteNotice"></div><h4 id="firstHeading" class="firstHeading">Atmaram</h4><div id="bodyContent"><p>Beware! A wild Atmaram has appeared!</p></div>'
		//maxWidth: 50
	});
	marker.addListener('click', function () {
		infoWindow.open(map, marker);
	});
}


// Geolocation
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function (position) {
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		infoWindow.setPosition(pos);
		infoWindow.setContent('Location found.');
		infoWindow.open(map);
		map.setCenter(pos);
	},
		function () {
			handleLocationError(true, infoWindow, map.getCenter());
		});
}
else {
	// Browser doesn't support Geolocation
	handleLocationError(false, infoWindow, map.getCenter());
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}
