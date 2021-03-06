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
var defaultMarkerOpacity = 0.85;
var reducedMarkerOpacity = 0.45;
var markerOpacity = defaultMarkerOpacity;
var showMarkerNames = true;
var showInfoLabels = true;
var points; //array of all the waypoints
var clues;
var activeTreasure = 0; //Ideally in database. Used in fillClues().
var activeClue = -1; //Would be in database as determines the score. Used in fillClues().
var showHints = true; // Idiot-proof hints when openining the app, i.e. a window saying 'click here to find out how to play/use the app'
var defaultZoom = 16; // The zoom level of the map when the app is opened; default value is '16'; scaling works with other values, but the default is recommended
var defaultScaledSize = 50; // Default size of the icon of the marker
var defaultLabelOriginHeightOffset = 4; //
var defaultFontSize = 16;
var defaultFontSizeString = '16pt';
var reduceFontSizeBy = 4; // when switching to marker names option in settings
var idiotWindow;
var showExtraLocations = true;
var extraLocations = [];
var extraMarkersList = [];
var extraMarkers = extraMarkersList.length;
var routeID = 1;
var init = true;

var postData = {
	routeID: routeID,
};


function getMarkers() {
	$.ajax({
		url: "loadMarkers.php",
		type: "POST",
		data: postData,
		success: function (returnData) {
			console.log("return data loadmarkers:");
			console.log(returnData);
			points = JSON.parse(returnData);
			nextWaypoint();
		},
		error: function (xhr, textStatus, errorThrown) {
			alert("Load markers" + xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
}
getMarkers();

function getClues() {
	$.post('loadClues.php', function (data) {
		clues = JSON.parse(data);
	});
}
getClues();

function myMap() {
	/*
	Function that initializes the map
	*/
	map = new google.maps.Map(document.getElementById("googleMap"), {
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: defaultZoom
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayAndWatch, checkError);
	} else {
		alert("Your browser does not support the Geolocation API");
	}

	var directionsService = new google.maps.DirectionsService,
		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		});

	// addMarker(50.735882, -3.534206, 'Bob`s place', 'A nice and cozy place. Very well known by all Exeter students.<br>Bob likes to spend his time here. </br>');

	var pointA = new google.maps.LatLng(50.734882, -3.535206);
	var pointB = new google.maps.LatLng(50.736882, -3.534206);

	createDefaultExtraLocations();

	// Apply Settings
	setTime();
	enableAnimations = true;
	setMarkerNames();
	showHints = true;
	setMarkerOpacity(0.85);

	scaleMarkerSizeOnZoom(); // Calls the function which is made to scale the size of markers when zooming in/out.

	// addCustomMarker();

	//addExtraMarker(50.735902, -3.538078, 0, 'Student Health Centre', '', 'health.png', '');

	
}

function setMarkerSize(scaledSize = defaultScaledSize, fontSize = defaultFontSizeString, labelOriginHeightOffset = defaultLabelOriginHeightOffset) {
	/*
	Sets the size of the marker's icon and labels accordingly. Used by the "scaleMarkerSizeOnZoom()" function.
	Parameters:
		scaledSize: the scaled size of the marker's icon image,
		fontSize: the font size of the label corresponding to the marker,
		labelOriginHeightOffset: the gap between the top of the label and the bottom of the icon of the marker;
								 this must be increased as the marker's get smaller (or vice-versa).
	*/
	if (markerList) {
		for (i = 0; i < markerList.length; i++) {
			if (markerList[i].getLabel()) {
				var label = markerList[i].getLabel();
				label.color = getColor();
				label.fontSize = fontSize;
				markerList[i].setLabel(label);
			}	
			if (markerList[i].getIcon()) {
				var icon = markerList[i].getIcon();
				icon.scaledSize = new google.maps.Size(scaledSize, scaledSize);
				icon.labelOrigin = new google.maps.Point((scaledSize / 2), scaledSize + labelOriginHeightOffset);
				markerList[i].setIcon(icon);
			}
		}
	}
}

function scaleMarkerSizeOnZoom() {
	/*
	Scales the size of the markers when zooming in/out the map by adding a 'zoom_changed' listener and
	handling the event change, using the "setMarkerSize" function. The defaultZoom should be set to 16.
	Parameter:
		scaledSizeMultiplier: the constant used in calculation to set the size of the marker (recommended: 5).
	*/
	var scaledSizeMultiplier = 5; // Do not change this value (recommended).

	idiotWindow = new google.maps.InfoWindow({
		content: '<div id="bodyContent" style="text-align:center"><p> Hey! You are zooming too far away! Click the button below or zoom<br>back in and continue your treasure hunt. Don`t let your team down!</br></p>' +
			'<input type="button" id="zoomBackInButton" + class="waves-effect waves-light btn-small" value="Zoom Back In" onclick="resetMapZoom()"></div>'
	});

	google.maps.event.addListener(map, 'zoom_changed', function () {
		zoom = map.getZoom();
		console.log('map zoom: ' + zoom);
		if (!markerList) {
			console.log('zoom_changed event: marker array is empty');
			return -1;
		}
		if (zoom < defaultZoom && zoom > (defaultZoom - scaledSizeMultiplier)) {
			var scaledSize = defaultScaledSize - (scaledSizeMultiplier * (defaultZoom - zoom));
			var scaledFontSize;
			var scaledFontSizeNum = (defaultFontSize - (defaultZoom - zoom));
			scaledFontSize = scaledFontSizeNum.toString() + 'pt';
			console.log('scaledFontSize = ' + scaledFontSize);
			var scaledLabelOriginHeightOffset = (defaultScaledSize / 2) / scaledSizeMultiplier;
			setMarkerSize(scaledSize, scaledFontSize, scaledLabelOriginHeightOffset);
		}
		if (zoom == defaultZoom) {
			var scaledSize = defaultScaledSize - (scaledSizeMultiplier * (defaultZoom - zoom));
			var scaledFontSize = defaultFontSizeString;
			console.log('scaledFontSize = ' + scaledFontSize);
			var scaledLabelOriginHeightOffset = (defaultScaledSize / 2) / scaledSizeMultiplier;
			setMarkerSize(scaledSize, scaledFontSize, scaledLabelOriginHeightOffset);
		}
		if (zoom < (defaultZoom - scaledSizeMultiplier + 2)) {

			if (zoom < (defaultZoom - scaledSizeMultiplier) && zoom > (defaultZoom - scaledSizeMultiplier - 2)) {
				for (i = 0; i < markerList.length; i++) {
					markerList[i].setVisible(false);
					if (activeInfoWindow) {
						activeInfoWindow.close();
						activeInfoWindow = null;
						activeMarker = null;
					}
					if (activeInfoLabel) {
						activeInfoLabel.close();
						activeInfoLabel = null;
					}
					idiotWindow.open(map, markerList[markerList.length - 1]);
				}
			} else if (zoom >= (defaultZoom - scaledSizeMultiplier) && zoom < (defaultZoom - scaledSizeMultiplier + 2)) {
				for (i = 0; i < markerList.length; i++) {
					idiotWindow.close();
					markerList[i].setVisible(true);
				}
			}
		}
		if (zoom == defaultZoom - scaledSizeMultiplier + 3) {
			if (extraMarkersList) {
				for (i = 0; i < extraMarkersList.length; i++) {
					extraMarkersList[i].setVisible(false);
					if (activeInfoWindow) {
						activeInfoWindow.close();
						activeInfoWindow = null;
						activeMarker = null;
					}
				}
			}
		}
		else if (zoom == defaultZoom - scaledSizeMultiplier + 4) {
			if (extraMarkersList && showExtraLocations === true) {
				for (i = 0; i < extraMarkersList.length; i++) {
					extraMarkersList[i].setVisible(true);
				}
			}
		}
		if (zoom >= (defaultZoom + 2) && showMarkerNames) {
			showAllMarkerNames();
		}
		else if (zoom == (defaultZoom + 1)) {
			hideAllMarkerNames();
		}
		if (zoom == defaultZoom || zoom == defaultZoom + 1) {
			if (showMarkerNames) {
				showAllExtraMarkerNames();
			}
			if (extraMarkersList) {
				for (i = 0; i < extraMarkersList.length; i++) {
					var label = extraMarkersList[i].getLabel();
					if (zoom == defaultZoom) {
						label.fontSize = '9pt';
						label.fontWeight = 'normal';
					}
					else if (zoom > defaultZoom) {
						label.fontSize = '12pt';
						label.fontWeight = 'bold';
					}
					extraMarkersList[i].setLabel(label);
				}
			}
		}
		else if (zoom == defaultZoom - 1) {
			hideAllExtraMarkerNames();
			if (extraMarkersList) {
				for (i = 0; i < extraMarkersList.length; i++) {
					var label = extraMarkersList[i].getLabel();
					label.fontSize = '10pt';
					label.fontWeight = 'normal';
					extraMarkersList[i].setLabel(label);
				}
			}
		}
	});
}

function resetMapZoom() {
	/*
	Resets the map zoom level and places the view at the centre. Used when zooming out too far.
	*/
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: defaultZoom
	});
	if (idiotWindow) {
		idiotWindow.close();
	}
	if (markerList) {
		for (i = 0; i < markerList.length; i++) {
			markerList[i].setVisible(true);
		}
	}
	if (extraMarkersList && showExtraLocations === true) {
		for (i = 0; i < extraMarkersList.length; i++) {
			extraMarkersList[i].setVisible(true);
		}
	}
}

function nextWaypoint() {
	/*
	Function that displays the next waypoint when the current is found
	*/
	if (points.length > 0) {
		console.log(points[0]);
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
	} else if (points.length === 0) {
		$(document).ready(function () {
			$('#modal').modal();
			$('#modal').modal('open');
		});
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
			url: 'img/icons/purple-custom.png',
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
	if (!name || name.length < 3 || name.length > 32) {
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
			fontSize: defaultFontSizeString,
			fontWeight: 'bold',
		},
		icon: {
			url: 'img/icons/chest.png',
			scaledSize: new google.maps.Size(defaultScaledSize, defaultScaledSize),
			origin: new google.maps.Point(0, 0),
			labelOrigin: new google.maps.Point((defaultScaledSize / 2), defaultScaledSize + defaultLabelOriginHeightOffset)
		},
		draggable: draggable,
		animation: google.maps.Animation.DROP,
		id: markerNum - 1,
		opacity: markerOpacity,
		name: name,
		description: description, // used for testing
		mouseOnMarker: false // used to determine if mouse is on marker; used by event listeners
	});

	var contentString = '<div id="content" style="text-align:center">' +
		'<h4 id="firstHeading" class="firstHeading">' + markerNum + '. ' + name +
		'</h4><div id="bodyContent"><p> ' + description +
		'<br><input type="button" id="showClueButton-' + markerNum + '" + class="waves-effect waves-light btn-small" value="Show Clue (-1 point)" onclick="showNextClue(' + markerNum + ')">' +
		'</p></div><br>' +
		'<div class="clues-section" id="showClue-' + markerNum + '"></div>'

	// Creates a new Google Maps Info Window for the marker (pop-up window when marker is clicked)
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -16),
		content: contentString
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

function addMarkerClickListeners(marker, infoWindow, infoLabel) {
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
			var label = marker.getLabel();
			if (isDay) {
				label.color = '#007766';
			} else {
				label.color = '#00ED87';
			}
			this.setLabel(label);

			//sets marker label for new marker
			if (activeMarker && activeMarker.getLabel()) {
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
					markerSetAnimation(marker, 'BOUNCE-IF'); // This function has to be used to set the animation.
				}
			}
			marker.setOpacity(1);
			infoWindow.open(map, marker);
			activeInfoWindow = infoWindow;
			activeMarker = marker;
		} else {
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

function addMarkerMouseOverListeners(marker, infoWindow, infoLabel) {
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

		if (showLabelOnMouseOver && showHints) {
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
	if (activeInfoWindow) {
		activeInfoWindow.close();
		activeInfoWindow = null;
	}
	if (activeInfoLabel) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	if (activeMarker === markerList[id]) {
		activeMarker = null;
		activeInfoWindow = null;
	}
	markerList[id].setMap(null);
	markerList.splice(id); // removing an element from an array
	
	markers -= 1;
}

function removeAllMarkers() {
	for (i = 0; i < markerList.length; i++) {
		markerList[i].setMap(null);
	}
	if (activeInfoWindow) {
		activeInfoWindow.close();
		activeInfoWindow = null;
	}
	if (activeInfoLabel) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	markerList = [];
	activeMarker = null;
	activeInfoWindow = null;
	markers = 0;
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
		if (enableAnimations) {
			setTimeout(function () {
				if (infoWindow.isOpen) {
					infoWindow.close(map, marker);
					markerSetAnimation(marker, 'BOUNCE');
					infoWindow.isOpen = false;
				}
			}, 3500);
		}

	});

	infoWindow.addListener('closeclick', function () {
		if (enableAnimations) {
			markerSetAnimation(marker, 'BOUNCE');
		}
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
				if (activeMarker == marker && enableAnimations) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
			}, 800);
			break;
		case 'BOUNCE':
			// Has to be done this way because Google's API has a bug that breaks the animation sometimes
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function () {
				if (enableAnimations) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
				}
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
	if (extraMarkersList) {
			for (i = 0; i < extraMarkersList.length; i++) {
				var icon = extraMarkersList[i].getIcon();
				var url = icon.url;
				icon.url = icon.url2;
				icon.url2 = url;
				extraMarkersList[i].setIcon(icon);
				var label = extraMarkersList[i].getLabel();
				label.color = 'black';
				extraMarkersList[i].setLabel(label);
			}
	}
	map.setOptions({
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_daytime
	});
	if (markerList) {
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

// sets night mode
function nightTime() {
	if (extraMarkersList) {
		for (i = 0; i < extraMarkersList.length; i++) {
			var icon = extraMarkersList[i].getIcon();
			var url = icon.url;
			icon.url = icon.url2;
			icon.url2 = url;
			extraMarkersList[i].setIcon(icon);
			var label = extraMarkersList[i].getLabel();
			label.color = 'white';
			extraMarkersList[i].setLabel(label);
		}
	}
	map.setOptions({
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_nighttime
	});
	if (markerList) {
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

/*
	Toggle options used by settings
*/

function toggleExtraLocations() {
	if (showExtraLocations) {
		if (activeInfoWindow) {
			activeInfoWindow.close();
		}
		if (extraMarkersList) {
			for (i = 0; i < extraMarkersList.length; i++) {
				extraMarkersList[i].setVisible(false);
			}
		}
		showExtraLocations = false;
	} else {
		if (extraMarkersList && map.getZoom() > defaultZoom - 2) {
			for (i = 0; i < extraMarkersList.length; i++) {
				extraMarkersList[i].setVisible(true);
			}
		}
		showExtraLocations = true;
	}
}

function toggleHints() {
	if (showHints) {
		showHints = false;
	} else {
		showHints = true;
	}
}

function toggleMarkerOpacity() {
	if (markerOpacity == defaultMarkerOpacity) {
		setMarkerOpacity(reducedMarkerOpacity);
	} else {
		setMarkerOpacity(defaultMarkerOpacity)
	}
}

function toggleMarkerAnimations() {
	if (enableAnimations) {
		enableAnimations = false;
		if (activeMarker) {
			activeMarker.setAnimation(null);
		}
	} else {
		enableAnimations = true;
		if (activeMarker) {
			markerSetAnimation(activeMarker, 'BOUNCE');
		}
	}
}

function toggleMarkerNames() {
	if (!showMarkerNames) {
		showMarkerNames = true;
		showAllMarkerNames();
		if (map.getZoom() >= (defaultZoom-1)) {
			showAllExtraMarkerNames();
		}
	} else {
		showMarkerNames = false;
		hideAllMarkerNames();
		hideAllExtraMarkerNames();
	}
}

function setMarkerNames() {
	if (showMarkerNames) {
		showAllMarkerNames();
		showAllExtraMarkerNames();
	} else {
		hideAllMarkerNames();
		hideAllExtraMarkerNames();
	}
}

// shows marker names
function showAllMarkerNames() {

	var newFontSize = (defaultFontSize - reduceFontSizeBy); // reduce font size as names are displayed (which take up more space on screen)
	var newFontSizeString = newFontSize.toString() + 'pt';

	if (markerList) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			labelContent = i + 1 + '. ' + markerList[i].name;
			string = labelContent.toString();
			label.text = string;
			label.fontSize = newFontSizeString;
			markerList[i].setLabel(label);
		}
	}
}

function showAllExtraMarkerNames() {
	var newFontSize = (defaultFontSize - reduceFontSizeBy); // reduce font size as names are displayed (which take up more space on screen)
	var newFontSizeString = newFontSize.toString() + 'pt';

	if (extraMarkersList) {
		for (i = 0; i < extraMarkersList.length; i++) {
			var label = extraMarkersList[i].getLabel();
			label.text = (label.name).toString();
			extraMarkersList[i].setLabel(label);
		}
	}
}

// hide marker names
function hideAllMarkerNames() {

	var newFontSize = (defaultFontSize); // increase font size as names are no longer displayed
	var newFontSizeString = newFontSize.toString() + 'pt';

	if (markerList) {
		for (i = 0; i < markerList.length; i++) {
			var label = markerList[i].getLabel();
			labelContent = markerList[i].id + 1;
			string = labelContent.toString();
			label.text = string;
			label.fontSize = newFontSizeString;
			markerList[i].setLabel(label);
		}
	}
}

function hideAllExtraMarkerNames() {
	if (extraMarkersList) {
		for (i = 0; i < extraMarkersList.length; i++) {
			var label = extraMarkersList[i].getLabel();
			label.text = ' ';
			extraMarkersList[i].setLabel(label);
		}
	}
}

// sets opacity of markers
function setMarkerOpacity(value) {
	markerOpacity = value;
	if (markerList) {
		for (i = 0; i < markerList.length; i++) {
			markerList[i].setOpacity(value);
		}
	}
	if (extraMarkersList) {
		for (i = 0; i < extraMarkersList.length; i++) {
			extraMarkersList[i].setOpacity(value);
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

function addExtraMarker(latPos, lngPos, typeID, name, description, iconURL = 'img/icons/yellow.png', iconURL2 = iconURL) {
	/*
	Function that adds a Google Maps marker that shows places such as the health centre, restaurants,
	libraries, restaurants

	Parameters:
		latPos: latitutde coordinates of the marker,
		lngPos: longitude coordinates of the marker,
		name: name of the location, e.g. "Exeter Library",
		description: a descrition of the location,
		type: id of type of location, e.g. id 0 being "health", id 1 being "food" etc.,
		iconURL: URL of the icon (part of URL, e.g. "chest.png" - img/icons/chest.png),
		imageURL: (Optional) URL of the image (part of URL, e.g. "library.png" - img/photos/library.png).
	*/
	var color = getColor();
	// Sets a default name in case the given one is too short or long
	if (!name || name.length < 3 || name.length > 32) {
		name = 'Place of Interest';
	}
	// Sets a default description in case the given one is too short or long
	if (!description || description.length < 10 || description.length > 500) {
		var description = 'An additional location that you can visit!';
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
			text: ' ',
			fontSize: '9pt',
			fontWeight: 'normal',
			name: name,
		},
		icon: {
			url: iconURL2,
			url2: iconURL,
			scaledSize: new google.maps.Size(24, 24),
			origin: new google.maps.Point(0, 0),
			labelOrigin: new google.maps.Point(12, 32)
		},
		animation: google.maps.Animation.DROP,
		opacity: markerOpacity,
		type: typeID
	});

	var contentString = '<div id="siteNotice">' + getExtraMarkerType(marker) + '</div><div id="content" style="text-align:center">' +
		'<h4 id="firstHeading" class="firstHeading">' + name +
		'</h4><div id="bodyContent"><p> ' + description + '</p></div>';

	// Creates a new Google Maps Info Window for the marker (pop-up window when marker is clicked)
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -20),
		content: contentString
	});

	// Creates a new Google Maps Info Window for the marker (that will act as an 'info/help' window when hovered over)
	var infoLabel = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0, -20),
		content: '<div id="bodyContent"><p> This is a place of interest. Click for more info. </p></div>'
	});

	addExtraMarkerClickListeners(marker, infoWindow, infoLabel);

	extraMarkersList.push(marker);
	extraMarkers += 1;
}

function addExtraMarkerClickListeners(marker, infoWindow, infoLabel) {
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

		// Sets a bounce animation correctly when a marker is clicked on (if animations are enabled)
		if (activeInfoWindow !== infoWindow) {
			if (enableAnimations) {
				if (firstClick) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					firstClick = false;
				} else {
					markerSetAnimation(marker, 'BOUNCE-IF'); // This function has to be used to set the animation.
				}
			}
			marker.setOpacity(1);
			infoWindow.open(map, marker);
			activeInfoWindow = infoWindow;
			activeMarker = marker;
		} else {
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

		marker.mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});
}

function getExtraMarkerType(extraMarker) {
	switch (extraMarker.type) {
		case 0:
			return 'Health';
		case 1:
			return 'Food';
		case 2:
			return 'Library';
		case 3:
			return 'Fitness';
		case 4:
			return 'College';
		default:
			return 'Place of Interest';
	}
}

function createDefaultExtraLocations() {

	// INSTRUCTIONS:
		// addExtraMarker(LAT, LNG, TYPE, NAME, DESCRIPTION, ICON)
		// ICON example: 'nameOfIcon.png' (make sure it's in the www/img/icons folder)
		// TYPE: use integer representing the type of the place (see the function above to see the types).

			// use type id '4' for office or other college locations.

	addExtraMarker(50.735902, -3.538078, 0, 'Student Health Centre', 'Come here when you are feeling sick', 'img/icons/health.png');
	addExtraMarker(50.7374657, -3.5337152, 4, "David's Office","In Laver you will find the office of David Wakeling.", 'img/icons/david.png');
	addExtraMarker(50.737943, -3.537214, 3, "Sports Park", "This is where sports activities take place", 'img/icons/sport-black.png','img/icons/sport-white.png');
	addExtraMarker(50.735618, -3.533184, 2, "Forum Library", "Our university's library and central hub", 'img/icons/books-black.png','img/icons/books-white.png');
	addExtraMarker(50.735311, -3.534423, 1, "The Ram Bar", "Most popular cafe in the campus!", 'img/icons/cafe-black.png', 'img/icons/cafe-white.png');
	addExtraMarker(50.735034, -3.529763, 1, "Lemon Grove", "Bar, Club, Concert, we have it all here!", 'img/icons/cafe-black.png', 'img/icons/cafe-white.png');
	addExtraMarker(50.734611, -3.529446, 3, "Outdoor Pool", "Wanna go for a swim?", 'img/icons/swim-black.png','img/icons/swim-white.png');
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
