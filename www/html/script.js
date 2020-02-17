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

function myMap() {
	map = new google.maps.Map(document.getElementById("googleMap"));
	dayTime();
	addMarker(50.735882, -3.534206, 'Bob`s place', 'A nice and cozy place. Very well known by all Exeter students.<br>Bob likes to spend his time here.</br>', true);
	addMarker(50.734882, -3.535206);
	addMarker(50.735882, -3.536206);
	addMarker(50.736882, -3.534206);
	//addMarker(50.736882, -3.534206, '2', true);
	//addMarker(50.736882, -3.534206, '3', true);
	//addMarker(50.736882, -3.534206, '4', true);
	//removeMarker(3);
	
	bob();
	
	addCustomMarker();
}

function addMarker(latPos, lngPos, name, description, /*imageURL,*/ draggable = false) {
	markerNum = markers + 1;
	var color;
	if (isDay){
		color = 'black';
	}
	else {
		color = 'white';
	}
	var marker = new google.maps.Marker({
		position: { lat: latPos, lng: lngPos },
		map: map,
		//title: name,
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
		opacity: markerOpacity
	});
	
	if (!name || name.length < 3){
		name = 'Treasure';
	}
	
	if (!description || description.length < 10){
		var description = 'There is treasure to be found here!<br>Get here fast!</br>';
	}
	
	/*
	if (!imageURL || imageURL.length < 9){
		imageURL = '';
	}*/
	
	var contentString = '<div id="content"><div id="siteNotice">Treasure Location</div>' + 
		'<h4 id="firstHeading" class="firstHeading">' + markerNum + '. ' + name + 
		'</h4><div id="bodyContent"><p> ' + description + ' </p></div>' //+
		//'<div style="background-image: url('+ imageURL +'); height: 200px; width: 300px;">Picture of Bob:</div>';
	
	
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0,-16),
		content: contentString,
		//maxWidth: 300
	});
	
	var infoLabel = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0,-16),
		content: '<div id="bodyContent"><p> This location contains a hidden treasure. Click for more info. </p></div>'
	});
	
	var firstClick;
	
	marker.addListener('click', function () {	
		if (activeInfoLabel) {
			activeInfoLabel.close(map, marker);
			activeInfoLabel = null;
		}
		
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////// 									  //////////////////////
		////////////////////// re-write this entire garbage below //////////////////////
		////////////////////// (so label changes work)			  //////////////////////
		////////////////////// 									  //////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////
		
		var markerToBeSet;
		
		if (activeMarker) {
			markerToBeSet = activeMarker;
			setTimeout(function() {
				markerToBeSet.setAnimation(null);
			}, 300);
			
			activeMarker.setOpacity(markerOpacity);
			//activeMarker = null;
		}
		
		if (activeInfoWindow) {
			activeInfoWindow.close();
		}
	
		if (activeInfoWindow !== infoWindow) {
			if (enableAnimations) {
				if (firstClick) {
					marker.setAnimation(google.maps.Animation.BOUNCE);
					firstClick = false;
				}
				else {
					markerSetAnimation(marker, 'BOUNCE');
				}
			}
			marker.setOpacity(1);
			infoWindow.open(map, marker);
			activeInfoWindow = infoWindow;
			/*
			if (activeMarker && activeMarker !== marker) {
				// try to set/change the label contents of the marker without replacing the entire label
				var label = this.getLabel();
				var oldLabel = activeMarker.getLabel();
				marker.set('labelContent', 'sdda');
				label.fontWeight = 'normal';			
				oldLabel.fontWeight = 'bold';
				this.setLabel(label);
				var markerToBeSet = activeMarker;
				setTimeout(function(){
					markerToBeSet.setLabel(oldLabel);
				}, 1000);
			}*/
			activeMarker = marker;
		}
		else {
			/*
			if (activeMarker) {
				var label = this.getLabel();
				label.fontWeight = 'bold';			
				this.setLabel(label);
			}*/
			
			setTimeout(function() {
				markerToBeSet.setAnimation(null);
			}, 300);
			activeInfoWindow = null;
			activeMarker = null;
		}	
		//activeMarker = marker;
	}); 
	
	infoWindow.addListener('closeclick', function() {
		activeMarker.setAnimation(null);
		activeMarker.setOpacity(markerOpacity);
		activeMarker = null;
		activeInfoWindow = null;
	});
	
	var mouseOnMarker = false;
	
	marker.addListener('mouseover', function() {
		if (marker == activeMarker) {
			
		}
		this.setOpacity(0.9);
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
			setTimeout(function(){
				if(mouseOnMarker && !activeInfoWindow && !activeInfoLabel) {
					infoLabel.open(map, marker);
					activeInfoLabel = infoLabel;				
				}
			}, 2000);
		}
	});

	marker.addListener('mouseout', function() {
		this.setOpacity(markerOpacity);
		var label = this.getLabel();
		if (isDay) {
			label.color = 'black';
		} 
		else {
			label.color = 'white';
		}
		label.fontWeight = 'bold';
		this.setLabel(label);
		
		mouseOnMarker = false;
		if(activeInfoLabel){
			setTimeout(function(){
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
	for (i=0; i < markerList.length; i++) {
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
		pixelOffset: new google.maps.Size(0,4),
		content: 'Double click the marker when you are done.',
		//maxWidth: 300
		isOpen: false
	});
	
	/*
	marker.addListener('click', toggleBounce);
	
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} 
		else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
	*/
	
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
		setTimeout(function(){
			if (infoWindow.isOpen) {
				infoWindow.close(map, marker);
				markerSetAnimation(marker, 'BOUNCE');
				infoWindow.isOpen = false;
			}
		}, 3500);
	});
	
	infoWindow.addListener('closeclick', function() {
		markerSetAnimation(marker, 'BOUNCE');
		infoWindow.isOpen = false;
		
	});
	
	marker.addListener('dblclick', function() {
		saveCustomMarker();
	});
	customMarker = marker;
}

function saveCustomMarker() {
	var name = prompt("Enter the name of the place (minimum 3 characters): ");
	var description = prompt("Enter the description of the place (minimum 10 characters): ");
	latPos = customMarker.getPosition().lat();
	lngPos = customMarker.getPosition().lng();
	addMarker(latPos, lngPos, name, description, /*imageURL,*/);
	customMarker.setMap(null);
	customMarker = null;
}
/*
function markerSetBounceAnimation(marker) {
	// Has to be done this way because Google's API has a bug that breaks the animation sometimes
	marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function() {
		if (activeMarker == marker) {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}, 800);
}
*/
function markerSetAnimation(marker, animation) {
	switch (animation) {
		case null:
			setTimeout(function() {
				marker.setAnimation(null);
			}, 300);
			break;
		case 'BOUNCE':
		// Has to be done this way because Google's API has a bug that breaks the animation sometimes
			marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				if (activeMarker == marker) {
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
		for (i=0; i < markerList.length; i++) {
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
		for (i=0; i < markerList.length; i++) {
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
			text: 'Bob',
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
		pixelOffset: new google.maps.Size(0,-15),
		content: '<div id="content"><div id="siteNotice"></div><h4 id="firstHeading" class="firstHeading">Bob</h4><div id="bodyContent"><p>Beware! A wild Bob has appeared!</p></div>'
		//maxWidth: 50
	});
	marker.addListener('click', function () {                
        infoWindow.open(map, marker);
    });
}