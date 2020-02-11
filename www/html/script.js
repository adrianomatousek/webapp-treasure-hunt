var map;
var markerList = [];
var markers = markerList.length;
var isDay = false;
var windowOpen = false;

function myMap() {
	map = new google.maps.Map(document.getElementById("googleMap"));
	dayTime();
	addMarker(50.735882, -3.534206, 'Bob`s place');
	addMarker(50.734882, -3.535206);
	addMarker(50.735882, -3.536206);
	addMarker(50.736882, -3.534206);
	//removeMarker(3);
}

function addMarker(latValue, lngValue, name, draggable = false) {
	markerNum = markers + 1;

	var marker = new google.maps.Marker({
		position: { lat: latValue, lng: lngValue },
		map: map,
		title: name,
		label: {
			color: 'white',
			text: markerNum.toString(),
			fontSize: '18px',
			fontWeight: 'bold'
		},
		icon: {
			url: 'img/chest.png',
			scaledSize: new google.maps.Size(50, 50), // scaled size
			origin: new google.maps.Point(0, 0) // origin
		},
		draggable: draggable,
		animation: google.maps.Animation.DROP
	});
	
	if (!name){
		name = 'Treasure';
	}
	
	var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' + '<div id="bodyContent">'+
	  '<p>There is treasure waiting to be found here!</p>' + '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	marker.addListener('click', function() {
		if (!windowOpen) {
			infowindow.open(map, marker);
			windowOpen = true;
		}
		else {
			infowindow.close(map, marker);
			//infowindow.close(map, marker);
			windowOpen = false;
		}
	});
	markerList.push(marker)
	markers += 1;
}

function removeMarker(id) {
	markerList[id].setMap(null);
	marketList.splice(id);
}

function closeAllMarkerWindows() {
	for (i=0; i < markerList.length; i++) {
		markerList[i].infowindow.close(map, marker);
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
		// center:new google.maps.LatLng(51.508742,-0.120850),
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			}
		]
	});
}
function nightTime() {
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
			{
				"featureType": "poi",
				"stylers": [
					{ "visibility": "off" }
				]
			},

			{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
			{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
			{
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [{ color: '#263c3f' }]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#6b9a76' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [{ color: '#38414e' }]
			},
			{
				featureType: 'road',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#212a37' }]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#9ca5b3' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry',
				stylers: [{ color: '#746855' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.stroke',
				stylers: [{ color: '#1f2835' }]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#f3d19c' }]
			},
			{
				featureType: 'transit',
				elementType: 'geometry',
				stylers: [{ color: '#2f3948' }]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#d59563' }]
			},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{ color: '#17263c' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{ color: '#515c6d' }]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{ color: '#17263c' }]
			}
		]
	});
}