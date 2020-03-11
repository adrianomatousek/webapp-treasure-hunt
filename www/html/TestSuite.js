/*
	Test Suite for "map_script.js"
*/

var fileName = 'map_script.js';
var testCases = [];

function testSuccessful(result = true) {
	if (result == true) {
		testCases.push(result);
	}
	else {
		testCases.push(result);
	}
}

// Pre-defined variables for this test suite
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
var showMarkerNames = false;
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

function resetAll(){
	var map2;
	map = map2;
	var currentPositionMarker2;
	currentPositionMarker = currentPositionMarker2;
	var markerList2 = [];
	markerList = markerList2;
	var isDay2 = true;
	isDay = isDay2;
	var markers2 = markerList.length;
	markers = markers2;
	var activeInfoWindow2;
	activeInfoWindow = activeInfoWindow2;
	var activeInfoLabel2;
	activeInfoLabel = activeInfoLabel2;
	var activeMarker2;
	activeMarker = activeMarker2;
	var showLabelOnMouseOver2 = true; // displays small info/help label when mouse cursor is over a marker
	showLabelOnMouseOver = showLabelOnMouseOver2;
	var enableAnimations2 = true;
	enableAnimations = enableAnimations2;
	var customMarker2;
	customMarker = customMarker2;
	var defaultMarkerOpacity2 = 0.85;
	defaultMarkerOpacity = defaultMarkerOpacity2;
	var reducedMarkerOpacity2 = 0.45;
	reducedMarkerOpacity = reducedMarkerOpacity2;
	var markerOpacity2 = defaultMarkerOpacity;
	markerOpacity = markerOpacity2;
	var showMarkerNames2 = false;
	showMarkernames = showMarkerNames2;
	var showInfoLabels2 = true;
	showInfoLabels = showInfoLabels2;
	var points2; //array of all the waypoints
	points = points2;
	var clues2;
	clues = clues2;
	var activeTreasure2 = 0; //Ideally in database. Used in fillClues().
	activeTreasure = activeTreasure2;
	var activeClue2 = -1; //Would be in database as determines the score. Used in fillClues().
	activeClue = activeClue2;
	var showHints2 = true; // Idiot-proof hints when openining the app, i.e. a window saying 'click here to find out how to play/use the app'
	showHints = showHints2;
	var defaultZoom2 = 16; // The zoom level of the map when the app is opened; default value is '16'; scaling works with other values, but the default is recommended
	defaultzoom = defaultZoom2;
	var defaultScaledSize2 = 50; // Default size of the icon of the marker
	defaultScaledSize = defaultScaledSize2;
	var defaultLabelOriginHeightOffset2 = 4; //
	defaultLabelOriginHeightOffset = defaultLabelOriginHeightOffset2;
	var defaultFontSize2 = 16;
	defaultFontSize = defaultFontSize2;
	var defaultFontSizeString2 = '16pt';
	defaultFontSizeString = defaultFontSize2;
	var reduceFontSizeBy2 = 4; // when switching to marker names option in settings
	reduceFontSizeBy = reduceFontSizeby2;
	var idiotWindow2;
	idiotWindow = idiotWindow2;
	var showExtraLocations2 = true;
	showExtraLocations = showExtraLocations2;
	var extraLocations2 = [];
	extraLocations = extraLocations2;
	var extraMarkersList2 = [];
	extraMarkersList = extraMarkersList2;
	var extraMarkers2 = extraMarkersList.length;
	extraMarkers = extraMarkers2;
}

// Initialize test-suite
function initTests1() {
	
	
	
	
	
	console.log('add');
} 

function runTests1() {
	// Test 1: check if marker is added to array
	
	console.log('RUNNING TEST CASES FOR: ' + fileName);
	
	addMarkerTest();
}

function addMarkerArrayTest(){
	// 1 Check if marker is added to array
	
	addMarker(50.735820, -3.538780);
	
	length1 = markerList.length;
	
	addMarker(50.735820, -3.538780);
	
	length2 = markerList.length;
	
	if (length1 == 1 && length2 == 2) {
		testSuccessful();
		console.log('TEST 1 SUCCESSFUL');
		
	} else {
		testSuccessful(false);
		console.log('TEST 1 NOT');
	}
	resetAll();
}

function addMarkerCoordinatesTest(){
	addMarker(50.735820, -3.538780);
	markerList[0].
}
	
	
	
	// 2 Check for coordinates
	addMarker(50.735820, -3.538780);
	// 3 Check for name and description
	addMarker(50.735402, -3.538078, 'A name', 'A description <br>tags</br>');
	// 4 Check for name and no description
	addMarker(50.735402, -3.538078, 'A name');
	// 5 Check for empty / too short name
	addMarker(50.735402, -3.538078, '', 'A description');
	// 6 Check for empty / too short description
	addMarker(50.735402, -3.538078, 'A name', '');
	// 7 Check for draggable marker
	addMarker(50.735402, -3.538078, 'A name', 'A description', true);
	// 8 Check for non-draggable marker
	addMarker(50.735402, -3.538078, '', '', false);
}



// Runs test
runTests1();