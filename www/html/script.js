console.log("hello world");
var map;

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

	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
	addMarker(50.735882,-3.534206);
}

function addMarker(value1,value2) {
		var marker = new google.maps.Marker({
			position: {lat: value1, lng: value2}, 
			map: map,
			title: 'Hello',
			label: {
				color: 'black',
				text: 'Hello',
				fontSize: '18px',
				fontWeight: 'bold',
			},
			//labelAnchor: new google.maps.Point(50, 0),
			//icon: 'img/creeper.png',
			//draggable: true,
			animation: google.maps.Animation.DROP
		});
}
