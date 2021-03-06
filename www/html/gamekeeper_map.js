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
var routeName = "";

//NEW stores created markers and clues
var newMarkers = [];
var newClues = [];
var newMarkerNames = [];

//NEW handles click on addClue button, TODO add clue to waypoint dialog box
function addClue(positionInRoute) {
	var clueText = prompt("Enter the clue text:");
	if (newClues.length > 0) {
		newClues[positionInRoute - 1].push(clueText);
	}
}

//NEW sends ajax request and should remove all markers
function saveRoute() {
	if (newMarkers.length == 0) {
		alert("Please add a marker before creating a route!");
	} else if (newClues.length == 0) {
		alert("Please add atleast one clue.");
	} else {
		askForRouteName();
		if (routeName == "") {
			routeName = "Undefinded Route";
		}

		console.log("Route Name: " + routeName);
		var postData = {
			waypoints: newMarkers,
			clues: newClues,
			waypoint_names: newMarkerNames,
			route_name: routeName
		};
		console.log(postData);

		$.ajax({
			url: "saveRoute.php",
			type: "POST",
			data: postData,
			success: function (returnData) {
				alert("Route added");
				alert(returnData);
			},
			error: function (xhr, textStatus, errorThrown) {
				alert("Route saving unsuccessful" + xhr.statusText);
				console.log(textStatus);
				console.log(error);
			}
		});
		removeAllMarkers();
		newMarkers = [];
		newClues = [];
		routeName = "";
		newMarkerNames = [];
	}
}

function askForRouteName() {
	routeName = prompt("Name of your new route:");
}


function nextWaypoint() {
	/*
	Function that displays the next waypoint when the current is found
	*/
	if (points.length > 0) {
		var marker = points[0].split(','); //split at the comma
		var lat = parseFloat(marker[0]);
		var long = parseFloat(marker[1]);
		addMarker(lat, long); //adds the marks to the map
		points.shift();

		activeTreasure += 1;
		if (document.getElementById("showClueButton-" + activeTreasure)) {
			document.getElementById("showClueButton-" + activeTreasure).remove();
		}

		activeClue = -1; //reset the clue count
	}
}

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

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayAndWatch, checkError);
	} else {
		alert("Your browser does not support the Geolocation API");
	}

	var directionsService = new google.maps.DirectionsService,
		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		});
	dayTime();

	var pointA = new google.maps.LatLng(50.734882, -3.535206);
	var pointB = new google.maps.LatLng(50.736882, -3.534206);

	addCustomMarker();
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
	Functions that adds a marker on the maps
	parameters:
	latPos - Latitutde coordinates of the marker
	lngPos - Longitude coordinates of the marker
	name - Name of the location
	description - Descrition of the location
	draggable - Whether it can be dragged or not
	*/
	markerNum = markers + 1;
	var color;
	if (isDay) {
		color = 'black';
	} else {
		color = 'white';
	}

	if (!name || name.length < 3) {
		name = 'Treasure';
	}

	var marker = new google.maps.Marker({ //adds marker
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
		name: name
	});

	//description if its too long
	if (!description || description.length < 10) {
		var description = 'There is treasure to be found here!<br>Get here fast!</br>';
	}
	//NEW changes text of button to Add Clue, and sets click listener to addClue func
	var contentString = '<div id="content" style="text-align:center">' +
		'<h4 id="firstHeading" class="firstHeading">' + markerNum + '. ' + name +
		'</h4><div id="bodyContent"><p> ' + description +
		'<br><input type="button" id="showClueButton-' + markerNum + '" + class="waves-effect waves-light btn-small" value="Add Clue" onclick="addClue(' + markerNum + ')">' +
		'</p></div><br>' +
		'<div class="clues-section" id="showClue-' + markerNum + '"></div>'


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

		//animation for marker and opens/closes info window (if its open)
		if (activeInfoWindow !== infoWindow) {
			if (enableAnimations) {
				if (firstClick) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					firstClick = false;
				} else {
					markerSetAnimation(marker, 'BOUNCE-IF');
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

	var mouseOnMarker = false;

	//TO DO Not useful on mobile delete later
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
			mouseOnMarker = true;
			setTimeout(function () {
				if (mouseOnMarker && !activeInfoWindow && !activeInfoLabel) {
					infoLabel.open(map, marker);
					activeInfoLabel = infoLabel;
				}
			}, 2000);
		}
	});

	// TO DO Remove later as not useful on mobile
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

		mouseOnMarker = false;
		if (activeInfoLabel) {
			setTimeout(function () {
				infoLabel.close(map, marker);
				activeInfoLabel = null;
			}, 1200);
		}
	});

	//closes info window when you click X button
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
	/*
	Function to remove a marker
	parameter:
	id - Index of marker in array
	*/
	markerList[id].setMap(null);
	markerList.splice(id); // removing an element from an array
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
		markerList[i].setMap(null);
	}
	if (activeInfoLabel) {
		activeInfoLabel.close();
		activeInfoLabel = null;
	}
	markerList = null;
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
	latPos = customMarker.getPosition().lat();
	lngPos = customMarker.getPosition().lng();
	//NEW removed description
	addMarker(latPos, lngPos, name, "");
	customMarker.setMap(null);
	customMarker = null;
	//NEW adds waypoints to new markers array and sets up new marker
	//descriptions for waypoints are not presently stored in the database, maybe have it as clue
	newMarkers.push("" + latPos + "," + lngPos);
	newMarkerNames.push(name);
	//adds empty clue array to newClues
	newClues.push([]);
	addCustomMarker();
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

// sets light mode
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
		if (customMarker) {
			customMarker.setAnimation(null);
		}
	} else {
		enableAnimations = true;
		if (customMarker) {
			markerSetAnimation(customMarker, 'BOUNCE');
		}
	}
}

// utility function changing the numbers to names
function toggleMarkerNames() {
	if (!showMarkerNames) {
		showAllMarkerNames();
	} else {
		hideAllMarkerNames();
	}
}

// shows marker names
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

// hide marker names
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