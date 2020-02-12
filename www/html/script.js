var map;
var markerList = [];
var isDay = true;
var markers = markerList.length;
var activeInfoWindow;
var activeInfoLabel;
var activeMarker;
var showLabelOnMouseOver = true;  // displays small info/help label when mouse cursor is over a marker
					
								// could be one of the options that can be toggled on/off in settings

function myMap() {
	map = new google.maps.Map(document.getElementById("googleMap"));
	/*
	infoWindow = new google.maps.InfoWindow({
		content: ''
	});
	*/
	dayTime()
	addMarker(50.735882, -3.534206, 'Bob`s place', 'A nice and cozy place. Very well known by all Exeter students.<br>Bob likes to spend his time here.</br>', true);
	addMarker(50.734882, -3.535206);
	addMarker(50.735882, -3.536206);
	addMarker(50.736882, -3.534206);
	//addMarker(50.736882, -3.534206, '2', true);
	//addMarker(50.736882, -3.534206, '3', true);
	//addMarker(50.736882, -3.534206, '4', true);
	//removeMarker(3);
	
	bob();
	
}

function addMarker(latValue, lngValue, name, description, /*imageURL,*/ draggable = false) {
	markerNum = markers + 1;

	var marker = new google.maps.Marker({
		position: { lat: latValue, lng: lngValue },
		map: map,
		//title: name,
		label: {
			color: 'white',
			text: markerNum.toString(),
			fontSize: '18px',
			fontWeight: 'bold',
		},
		icon: {
			url: 'img/chest.png',
			scaledSize: new google.maps.Size(50, 50),
			origin: new google.maps.Point(0, 0)
		},
		draggable: draggable,
		animation: google.maps.Animation.DROP
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
	
	/*
	marker.addListener('click', function () {                
        infoWindow.setContent(marker.contentString);
        infoWindow.open(map, marker);
    });
	*/
	
	/* 
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		isOpen: false
	});
	
	marker.addListener('click', function() {
		//closeAllMarkerWindows();
		if (anyWindowOpen) {
			if (infowindow.isOpen){
			infowindow.close(map, marker);
			infowindow.isOpen = false;
			}
			else { 
				//closeAllMarkerWindows();
				infowindow.open(map, marker);
				infowindow.isOpen = true;
			}
			anyWindowOpen = false;
		}
		else{  
			infowindow.open(map, marker);
			infowindow.isOpen = true;
			anyWindowOpen = true;
		}	
	});
	*/
	
	var infoWindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0,-16),
		content: contentString,
		//maxWidth: 300
	});
	
	var infoLabel = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(0,-16),
		content: '<div id="bodyContent"><p> This location contains a hidden treasure. Click for more info. </p></div>'
	});
	
	marker.addListener('click', function () {
		if (activeInfoLabel) {
			activeInfoLabel.close(map, marker);
		}
		if (activeInfoWindow) {
			activeInfoWindow.close();
		}
		if (activeInfoWindow !== infoWindow){
			marker.setAnimation(google.maps.Animation.BOUNCE);
			infoWindow.open(map, marker);
			activeInfoWindow = infoWindow;
			if (activeMarker) {
				activeMarker.setAnimation(null);
				activeMarker = null;
			}
			activeMarker = marker;
			
		}
		else {
			activeInfoWindow = null;
			//activeMarker = null;
		}	
	});
	
	/*
	var timer;
	var timeout = function () {
		alert('No movement!');
	}
	timer = setTimeout(timeout, 5000);
	window.onmousemove = function() {
		clearTimeout(timer);
		timer = setTimeout(timeout, 5000);
	};
	*/
	
	if (showLabelOnMouseOver) {
	
		var mouseOnMarker = false;
		
		marker.addListener('mouseover', function() {
			mouseOnMarker = true;
			setTimeout(function(){
				if(mouseOnMarker && !activeInfoWindow) {
					infoLabel.open(map, marker); 
					activeInfoLabel = infoLabel;
				}
			}, 2000);
		});

		marker.addListener('mouseout', function() {
			mouseOnMarker = false;
			setTimeout(function(){
				infoLabel.close(map, marker); 
			}, 1200);
		});
	}
	
	markerList.push(marker);
	markers += 1;
}

function removeMarker(id) {
	markerList[id].setMap(null);
	marketList.splice(id);
}

function removeAllMarkers() {
	for (i=0; i < markerList.length; i++) {
		marketList[id].setMap(null);
	}
	marketList = null;
}

/*
function closeAllMarkerWindows() {
	for (i=0; i < markerList.length; i++){
		markerList[i].infowindow.close(map, marker);
	}	
}
*/

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
}
function nightTime() {
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: map_theme_nighttime
	});
}







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
			url: 'img/creeper.png',
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