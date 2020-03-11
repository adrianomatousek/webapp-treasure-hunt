/*
	Test Suite for "map_script.js"
*/

// Pre-defined variables
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

// Initializing the test-suite
myMap();
console.log('test');