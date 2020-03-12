/*
	Test Suite for "map_script.js" (used by the TreasureHunt.php page and gameKeeper.php page)
*/

var testTarget = 'map_script.js (TreasureHunt.php and gameKeeper.php)';
var testCases = [];
//var test;

function testSuccessful(result = true) {
	if (result == true) {
		testCases.push(result);
		//console.log('TEST ' + test + ' SUCCESSFUL' + testCases[test-1]);
	}
	else {
		testCases.push(result);
		//console.log('TEST ' + test + ' FAILED!');
	}
}

function assertEquals(valueTested, expectedResult) {
	if (valueTested === expectedResult) {
		return true;
	}
	else {
		return false;
	}
}

function assertExists(valueTested) {
	if (valueTested) {
		return true;
	}
	else {
		return false;
	}
}

function logTestResults() {

	console.log('RUNNING TEST CASES FOR: ' + testTarget);

	var failed = 0;
	var passed = 0;
	
	for (i = 0; i < testCases.length; i++) {
		var result;
		if (testCases[i] === true) {
			result = 'Successful';
			passed += 1;
		}
		else {
			result = 'FAILED!';
			failed += 1;
		}
		console.log('TEST ' + (i+1) + ': ' + result);
	}
	var total = failed + passed;
	
	console.log('TESTS FINISHED:\n' + 
				'PASSED ' + passed + '/' + total + ' test cases successfully!\n' +
				'(FAILED: ' + failed + ')');
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



function endTest(){
	/*
		Resets all the variables when the test ends, so the next one is not affected by them.
	*/
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
	reduceFontSizeBy = reduceFontSizeBy2;
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
	
	map.setOptions({
		center: new google.maps.LatLng(50.735882, -3.534206),
		zoom: defaultZoom
	});
}

// Runs test
runTests1();

function runTests1() {
	
	// Tests
	addMarkerArrayTest();
	addMarkerCoordinatesTest();
	addMarkerNameDescriptionTest();
	addMarkerNoDescriptionTest();
	addMarkerNoNameTest();
	addMarkerDraggableTest();
	addMarkerNotDraggableTest();
	resetMapZoomTest();
	removeMarkerTest();
	removeAllMarkersTest();
	addCustomMarkerTest()
	addExtraMarkerTest()
	
	logTestResults();
}


// TEST 1
function addMarkerArrayTest(){
	//test = 1;
	// 1 Check if marker is added to array
	
	addMarker(50.735820, -3.538780);
	
	length1 = markerList.length;
	
	addMarker(50.735820, -3.538780);
	
	length2 = markerList.length;
	
	assert1 = assertEquals(length1, 1);
	
	assert2 = assertEquals(length2, 2);
	
	if (assert1 && assert2) {
		testSuccessful();
		
	} else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 2
function addMarkerCoordinatesTest(){
	//test = 2;
	// 2 Check for coordinates
	
	addMarker(50.735820, -3.538780);
	var lat = markerList[0].getPosition().lat();
	var lng = markerList[0].getPosition().lng();
	var a1 = assertEquals(lat, 50.735820);
	var a2 = assertEquals(lng, -3.538780);
	
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 3
function addMarkerNameDescriptionTest(){
	//test = 3;
	// 3 Check for name and description
	
	addMarker(50.735402, -3.538078, 'A name', 'A description <br>tags</br>');
	var a1 = assertEquals(markerList[0].name, 'A name');
	var a2 = assertEquals(markerList[0].description, 'A description <br>tags</br>');
	
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 4
function addMarkerNoDescriptionTest(){
	//test = 4;
	// 4 Check for no / too short description
	
	addMarker(50.735402, -3.538078, 'A name');
	var a1 = assertEquals(markerList[0].description, 'There is treasure to be found here!<br>Get here fast!</br>');  // default description
	
	if (a1) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 5
function addMarkerNoNameTest(){
	// 5 Check for empty / too short name
	
	addMarker(50.735402, -3.538078, '');
	var a1 = assertEquals(markerList[0].name, 'Treasure');  // default name
	
	if (a1) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 6
function addMarkerDraggableTest(){
	// 6 Check for draggable marker
	
	addMarker(50.735402, -3.538078, 'A name', 'A description', true);
	var a1 = assertEquals(markerList[0].draggable, true); 
	
	if (a1) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 7
function addMarkerNotDraggableTest(){
	// 7 Check for non-draggable marker
	
	addMarker(50.735402, -3.538078, 'A name', 'A description', false);
	var a1 = assertEquals(markerList[0].draggable, false); 
	
	addMarker(50.735402, -3.538078, 'A name', 'A description');  // should also be false by default
	var a2 = assertEquals(markerList[1].draggable, false); 
	
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 8
function resetMapZoomTest(){
	map.setOptions({
		zoom: 12
	});
	resetMapZoom();
	
	var a1 = assertEquals(map.getZoom(), 16);
	
	if (a1) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 9
function removeMarkerTest(){
	addMarker(50.735402, -3.538078);
	removeMarker(0);
	
	var a1 = assertEquals(markerList[i], undefined);
	var a2 = assertEquals(markers, 0);
	
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 10
function removeAllMarkersTest() {
	addMarker(50.735402, -3.538078);
	addMarker(50.735402, -3.538078);
	addMarker(50.735402, -3.538078);
	removeAllMarkers();
	
	var a1 = assertEquals(markerList[i], undefined);
	var a2 = assertEquals(markers, 0);
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 11
function addCustomMarkerTest() {
	
	var a1 = assertEquals(customMarker, undefined);
	addCustomMarker();
	
	var a2 = assertExists(customMarker);
	
	if (a1 && a2) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST 12
function addExtraMarkerTest() {
	
	var a1 = assertEquals(extraMarkersList, undefined);
	addExtraMarker(50.735402, -3.538078, 0);
	var a2 = assertExists(extraMarkersList); 
	var a3 = assertEquals(extraMarkers, 1);
	
	if (a1 && a2 && a3) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}

// TEST X
function setMarkerSizeTest(){
	// Checks icon size change for multiple markers (should change all)
	addMarker(50.735402, -3.538078);
	addMarker(50.735402, -3.538078);
	var iconSizeBefore1 = markerList[0].getIcon().scaledSize;
	var iconSizeBefore2 = markerList[1].getIcon().scaledSize;
	setMarkerSizeTest(20);
	var iconSizeAfter1 = markerList[0].getIcon().scaledSize;
	var iconSizeAfter2 = markerList[1].getIcon().scaledSize;
	
	var a1 = assertEquals(iconSizeBefore1, 50);
	var a2 = assertEquals(iconSizeBefore2, 50);
	
	var a3 = assertEquals(iconSizeAfter1, 20);
	var a4 = assertEquals(iconSizeAfter2, 20);
	
	
	if (a1 && a2 && a3 && a4) {
		testSuccessful();
	}
	else {
		testSuccessful(false);
	}
	endTest();
}



/*

	functions from map_script.js that are required here
	
	(copied directly from map_script.js - no difference in code)

*/



