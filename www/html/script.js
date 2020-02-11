var map;
var markerList = [];
var isDay = false;

function myMap() {
	map = new google.maps.Map(document.getElementById("googleMap"));
	dayTime();
	addMarker(50.735882, -3.534206);
}

function addMarker(value1, value2) {
	var marker = new google.maps.Marker({
		position: { lat: value1, lng: value2 },
		map: map,
		title: 'Hello',
		label: {
			color: 'black',
			text: 'Hello',
			fontSize: '18px',
			fontWeight: 'bold',
		},
		//labelAnchor: new google.maps.Point(50, 0),
		icon: {
			url: 'img/creeper.png',
			scaledSize: new google.maps.Size(50, 50), // scaled size
			origin: new google.maps.Point(0, 0) // origin
		},
		//draggable: true,
		animation: google.maps.Animation.DROP
	});
	markerList.append
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