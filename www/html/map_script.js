var map;
var currentPositionMarker;
var markerList = [];
var isDay = true;
var markers = markerList.length;
var activeInfoWindow;
var activeInfoLabel;
var activeMarker;
var showLabelOnMouseOver = true; // displays small info/help label when mouse cursor is over a marker
var enableAnimations = true;
var customMarker;
var markerOpacity = 0.85;
var showMarkerNames = false;
var showInfoLabels = true;
var points; //array of all the waypoints
var clues;
var activeTreasure = 0; //Ideally in database. Used in fillClues().
var activeClue = -1; //Would be in database as determines the score. Used in fillClues().
var showHints = true;  // Idiot-proof hints when openining the app, i.e. a window saying 'click here to find out how to play/use the app' 

$.post('loadMarkers.php', function (data) {
	points = JSON.parse(data);
	//retireves a JSON array of points and is converted to a JavaScript array
});

$.post('loadClues.php', function (data) {
	clues = JSON.parse(data);
	console.log(clues[1][1]);
	console.log(clues);
});

function myMap() {
	/*
	Function that initializes the map
	*/
	map = new google.maps.Map(document.getElementById("googleMap"));
	map.getZoom();

	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(displayAndWatch, checkError);
	} else {
			alert("Your browser does not support the Geolocation API");
	}

	var directionsService = new google.maps.DirectionsService,
		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
	});

	addMarker(50.735882, -3.534206, 'Bob`s place', 'A nice and cozy place. Very well known by all Exeter students.<br>Bob likes to spend his time here. </br>');

	var pointA = new google.maps.LatLng(50.734882, -3.535206);
	var pointB = new google.maps.LatLng(50.736882, -3.534206);
	
	
	// Apply Settings
	setTime();	
	enableAnimations = true;
	setMarkerNames();
	showHints = true;
	setMarkerOpacity(0.85);
	
	addCustomMarker();
	
	
}

function nextWaypoint() {
	/*
	Function that displays the next waypoint when the current is found
	*/
	if (points.length > 0) {
		var marker = points[0].split(','); //split at the comma
		var lat = parseFloat(marker[0]);
		var lng = parseFloat(marker[1]);
		addMarker(lat, lng); //adds the marks to the map
		points.shift();

		activeTreasure += 1;
		if (document.getElementById("showClueButton-" + activeTreasure)) {
			document.getElementById("showClueButton-" + activeTreasure).remove();
		}

		activeClue = -1; //reset the clue count

		addScore(5);
	}
}

function checkError(error) {
		 // the current position could not be located
		 alert("The current position could not be found!");
 }

 function setCurrentPosition(pos) {
		 currentPositionMarker = new google.maps.Marker({
				 map: map,
				 position: new google.maps.LatLng(
						 pos.coords.latitude,
						 pos.coords.longitude
				 ),
				 title: "Current Position",
				 icon: {
		 			url: 'img/icons/blue-dot.png',
					scaledSize: new google.maps.Size(40, 40),
					origin: new google.maps.Point(0, 0),
					labelOrigin: new google.maps.Point(20, -30)
		 		}
		 });
		 map.panTo(new google.maps.LatLng(
						 pos.coords.latitude,
						 pos.coords.longitude
				 ));
 }

 function displayAndWatch(position) {
		 // set current position
		 setCurrentPosition(position);
		 // watch position
		 watchCurrentPosition();
 }

 function watchCurrentPosition() {
		 var positionTimer = navigator.geolocation.watchPosition(
				 function (position) {
						 setMarkerPosition(
								 currentPositionMarker,
								 position
						 );
				 });
 }

function setMarkerPosition(marker, position) {
		 marker.setPosition(
				 new google.maps.LatLng(
						 position.coords.latitude,
						 position.coords.longitude)
		 );
 }


function addMarker(latPos, lngPos, name, description, draggable = false) {
	/*
	Function that adds a Google Maps marker with event listeners on the map and 
	stores its information, such as the position and name in an array. 
	
	Parameters:
		latPos: latitutde coordinates of the marker,
		lngPos: longitude coordinates of the marker,
		name: name of the location, e.g. "Exeter Library",
		description: a descrition of the location,
		draggable: boolean representing whether the marker can be dragged around when clicked on.
	*/
	markerNum = markers + 1;
	var color = getColor();
	// Sets a default name in case the given one is too short or long
	if (!name || name.length < 3 || name.length > 24) {
		name = 'Treasure';
	}
	// Sets a default description in case the given one is too short or long
	if (!description || description.length < 10 || description.length > 500) {
		var description = 'There is treasure to be found here!<br>Get here fast!</br>';
	}

	// Creates new Google Maps marker
	var marker = new google.maps.Marker({
		position: {
			lat: latPos,
			lng: lngPos
		},
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
		name: name,
		mouseOnMarker: false  // used to determine if mouse is on marker; used by event listeners
	});

	var contentString = '<div id="content" style="text-align:center">' +
		'<h4 id="firstHeading" class="firstHeading">' + markerNum + '. ' + name +
		'</h4><div id="bodyContent"><p> ' + description +
		'<br><input type="button" id="showClueButton-' + markerNum + '" + class="waves-effect waves-light btn-small" value="Show Clue (-1)" onclick="showNextClue(' + markerNum + ')">' +
		'</p></div><br>' +
		'<div class="clues-section" id="showClue-' + markerNum + '"></div>'
		
	// Creates a new Google Maps Info Window for the marker (pop-up window when marker is clicked)
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -16),
		content: contentString,
	});

	// Creates a new Google Maps Info Window for the marker (that will act as an 'info/help' window when hovered over)
	var infoLabel = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -16),
		content: '<div id="bodyContent"><p> This location contains a hidden treasure. Click for more info. </p></div>'
	});
	
	// Event listeners for markers when clicked or hovered over
	addMarkerClickListeners(marker, infoWindow, infoLabel);
	addMarkerMouseOverListeners(marker, infoWindow, infoLabel);
	
	markerList.push(marker);
	markers += 1;
}

function addMarkerClickListeners(marker, infoWindow, infoLabel){
	/*
		Function adds event listeners to the marker for a 'click' event.
		Parameters:
			marker: the object of the marker that is to have event listeners added,
			infoWindow: the Info Window associated with this marker,
			infoLabel: the info/help label associated with this marker.
	*/
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

		//Changes label content when the marker is clickedon
		if (activeMarker != marker) {
			var label = this.getLabel();
			if (isDay) {
				label.color = '#007766';
			} else {
				label.color = '#00ED87';
			}
			this.setLabel(label);

			//sets marker label for new marker
			if (activeMarker) {
				var oldLabel = activeMarker.getLabel();
				if (isDay) {
					oldLabel.color = 'black';
				} else {
					oldLabel.color = 'white';
				}
				activeMarker.setLabel(oldLabel);
			}
		} else {
			var label = this.getLabel();
			if (isDay) {
				label.color = 'black';
			} else {
				label.color = 'white';
			}
			this.setLabel(label);
		}

		// Sets a bounce animation correctly when a marker is clicked on (if animations are enabled)
		if (activeInfoWindow !== infoWindow) {
			if (enableAnimations) {
				if (firstClick) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					firstClick = false;
				} else {
					markerSetAnimation(marker, 'BOUNCE-IF');  // This function has to be used to set the animation.
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
	
	// Handles the event when 'X' is pressed to close the Info Window
	infoWindow.addListener('closeclick', function () {
		markerSetAnimation(activeMarker, null);
		activeMarker.setOpacity(markerOpacity);
		activeMarker = null;
		activeInfoWindow = null;
		var label = marker.getLabel();
		if (isDay) {
			label.color = 'black';
		} else {
			label.color = 'white';
		}
		marker.setLabel(label);

		marker.mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});
}

function addMarkerMouseOverListeners(marker, infoWindow, infoLabel){
	/*
		Function adds event listeners to a marker for a 'mouseover' and a 'mouseout' event.
		Parameters:
			marker: the object of the marker that is to have event listeners added,
			infoWindow: the Info Window associated with this marker,
			infoLabel: the info/help label associated with this marker.
	*/
	// Listener for when hovering over the marker; used on PC only
	marker.addListener('mouseover', function () {
		if (marker == activeMarker) {
			return null;
		}
		this.setOpacity(markerOpacity + 0.05);
		var label = this.getLabel();
		if (isDay) {
			label.color = '#007766';
			//label.fontWeight = 'normal';
		} else {
			label.color = '#00ED87';
		}
		this.setLabel(label);

		if (showLabelOnMouseOver) {
			marker.mouseOnMarker = true;
			setTimeout(function () {
				if (marker.mouseOnMarker && !activeInfoWindow && !activeInfoLabel) {
					infoLabel.open(map, marker);
					activeInfoLabel = infoLabel;
				}
			}, 2000);
		}
	});

	// Follows from listener above for when mouse is taken off the marker.
	marker.addListener('mouseout', function () {
		if (marker == activeMarker) {
			return null;
		}
		this.setOpacity(markerOpacity);
		var label = this.getLabel();
		if (isDay) {
			label.color = 'black';
		} else {
			label.color = 'white';
		}
		this.setLabel(label);

		marker.mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});
}

function removeMarker(id) {
	/*
	Function to remove a marker
	parameter:
	id - Index of marker in array
	*/
	markerList[id].setMap(null);
	marketList.splice(id); // removing an element from an array
	if (activeInfoLabel == markerList[id].infoWindow) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	if (activeMarker == markerList[id].infoWindow) {
		activeMarker = null;
		activeInfoWindow = null;
	}
	markers -= 1;
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
	markers = 0;
}

function setMarkerIcons(size = 50){
	
	
}

// Function that allows the game masters to add a custom marker when needed
function addCustomMarker() {
	var marker = new google.maps.Marker({
		position: { // setting the original position of the marker
			lat: 50.735700,
			lng: -3.531150
		},
		map: map,
		label: { // Text "Drag Me" that follows the marker
			color: 'black',
			text: 'Drag Me',
			fontSize: '16px',
			fontWeight: 'bold',
		},
		icon: {
			url: 'img/icons/orange-custom2.png', // marker icon
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

// Adds a new Treasure Location
function saveCustomMarker() {
	var name = prompt("Enter the name of the place (minimum 3 characters): ");
	var description = prompt("Enter the description of the place (minimum 10 characters): ");
	latPos = customMarker.getPosition().lat();
	lngPos = customMarker.getPosition().lng();
	addMarker(latPos, lngPos, name, description);
	customMarker.setMap(null);
	customMarker = null;
}

// Setting the bounce animation for the treasure markers
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


// Utility function for checking time
function checkTime() {
	if (isDay) {
		nightTime();
		isDay = false;
	} else {
		dayTime();
		isDay = true;
	}
}

function setTime() {
	if (isDay) {
		dayTime();
	} else {
		nightTime();
	}
}

function getColor() {
	var color;
	if (isDay) {
		color = 'black';
	} else {
		color = 'white';
	}
	return color;
}

// sets light mode
function dayTime() {
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_daytime
	});
	
	zoom = map.getZoom();
	console.log('map zoom: ' + zoom);

	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			label.color = 'black';
			label.fontSize = '12pt';
			markerList[i].setLabel(label);
			var icon = markerList[i].getIcon();
			icon.scaledSize = new google.maps.Size(20, 20);
			icon.labelOrigin = new google.maps.Point(10, 28);
		}
	}
	if (customMarker) {
		var label = customMarker.getLabel();
		label.color = 'black';
		customMarker.setLabel(label);
	}

}

// sets night mode
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

// utility function changing the numbers to names
function toggleMarkerNames() {
	if (!showMarkerNames) {
		showAllMarkerNames();
		showMarkerNames = true;
	} else {
		hideAllMarkerNames();
		showAllMarkerNames = false;
	}
}

function setMarkerNames() {
	if (showMarkerNames) {
		showAllMarkerNames();
	}
	else {
		hideAllMarkerNames();
	}
}

// shows marker names
function showAllMarkerNames() {
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			labelContent = i + 1 + '. ' + markerList[i].name;
			string = labelContent.toString();
			label.text = string;
			label.fontSize = '14px';
			markerList[i].setLabel(label);
		}
	}
}

// hide marker names
function hideAllMarkerNames() {
	if (markerList.length > 0) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			labelContent = markerList[i].id + 1;
			string = labelContent.toString();
			label.text = string;
			label.fontSize = '18px';
			markerList[i].setLabel(label);
		}
	}
}

// sets opacity of markers
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
		position: {
			lat: 50.745882,
			lng: -3.534206
		},
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
