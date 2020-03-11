/*
	Test Suite for "map_script.js"
*/

var fileName = 'map_script.js';
var testCases = [];

function testSuccessful(result = true) {
	if (result) {
		testCases.add(testCase);
	}
	else {
		testCases.add(testCase);
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

// Initialize test-suite
function initTests1() {
	
	
	
	
	
	console.log('add');
} 

function runTests1() {
	// Test 1: check if marker is added to array
	
	console.log('RUNNING TEST CASES FOR: ' + fileName);
	
	addMarkerTest();
}

function addMarkerTest(){
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
		console.log('TEST 2 NOT');
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
