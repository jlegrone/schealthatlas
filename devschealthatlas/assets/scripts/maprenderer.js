//Global variables
var maxDistance = 5;
var resultsLimit = 10;
var mylocation;
var units = "mile"
var plural = "s"
var clustering = true;
var mapDivId = 'google_map';
var markers = [];
var myLocation = 0;
var newDestination;
var markerPosition;
var markerCluster;
var kmlLayer;
var placeResults;
var currentLocation = 0;
var prevLocation = 0;
var myAddress;
var latLng;
var zoomOnClick = true;
var displayHeatmap = document.getElementById('heatmapToggle');
var clusterToggle = document.getElementById('clusterToggle');
var heatmap = new google.maps.visualization.HeatmapLayer();
var kmlOverlay = new google.maps.KmlLayer({
  suppressInfoWindows: false,
  preserveViewport: true
});
var layerSelector = document.getElementById('layerSelector');
var geocoder;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;
var travelMode;
var maptype = "custom";
var sepiaStyle = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{featureType: "poi", "elementType": "labels.text", stylers: [{visibility: "off"}]},{featureType: "poi", "elementType": "labels.icon", stylers: [{visibility: "off"}]},{"featureType":"road","stylers":[{"lightness":20}]}];
var grayStyle = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{featureType: "poi", "elementType": "labels.text", stylers: [{visibility: "off"}]},{featureType: "poi", "elementType": "labels.icon", stylers: [{visibility: "off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
var subtleStyle = [{"featureType":"poi","stylers":[{"visibility":"off"}]},{"stylers":[{"saturation":-70},{"lightness":37},{"gamma":1.15}]},{"elementType":"labels","stylers":[{"gamma":0.26},{"visibility":"off"}]},{"featureType":"road","stylers":[{"lightness":0},{"saturation":0},{"hue":"#ffffff"},{"gamma":0}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"lightness":50},{"saturation":0},{"hue":"#ffffff"}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"},{"lightness":-50}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":20}]}];
var darkStyle = [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{featureType: "poi", "elementType": "labels.text", stylers: [{visibility: "off"}]},{featureType: "poi", "elementType": "labels.icon", stylers: [{visibility: "off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}];
var stockStyle = [
{stylers: [{ visibility: 'simplified' }]},
{
  "featureType": "water",
  elementType: "geometry",
  "stylers": [{
    "visibility": "on"
  }, {
    "color": "#7fc8ed"
  }]},

  {featureType: "poi", "elementType": "labels.text", stylers: [{visibility: "off"}]},{featureType: "poi", "elementType": "labels.icon", stylers: [{visibility: "off"}]},

  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
    { "visibility": "on" }
    ]
  },

  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
    { "visibility": "on" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
    { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
    { "visibility": "off" }
    ]
  }
  ];
  var customStyle = [{featureType: "landscape", elementType: "all", stylers: [{saturation: -100}, {lightness: 20}, {hue: "#FFFFFF"}]}, {featureType: "poi.park", elementType: "geometry", stylers: [{hue: "#000000"}, {saturation: -100}, {lightness: 46}]}, {featureType: "road", elementType: "labels", stylers: [{hue: "#FFFFFF"}, {saturation: -100}, {gamma: 1.5}, {visibility: "on"}]}, {featureType: "road.arterial", elementType: "all", stylers: [{hue: "#ffcc00"}, {lightness: 30}, {saturation: -100}]}, {featureType: "road.highway", elementType: "geometry", stylers: [{hue: "#ffc300"}, {saturation: -100}, {lightness: 40}]}, {featureType: "landscape.natural", elementType: "all", stylers: [{visibility: "off"}]}, {featureType: "all", elementType: "all", stylers: []}, {featureType: "poi.park", "elementType": "labels.text", stylers: [{visibility: "off"}]}, {featureType: "poi", elementType: "geometry", stylers: [{visibility: "off"}]}];
  var flatStyle = [ 
  {
    "stylers": [
    { "visibility": "on" },
    { "saturation": -100 }
    ]
  },{featureType: "landscape.natural", elementType: "all", stylers: [{visibility: "off"}]},
  {
    "featureType": "road",
    elementType: "geometry",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#ffffff"
    }]
  }, {
    "featureType": "road.arterial",
    elementType: "geometry",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#fee379"
    }]
  }, {
    "featureType": "road.highway",
    elementType: "geometry",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#EBBC6C"
    }]
  }, {
    "featureType": "water",
    elementType: "geometry",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#7fc8ed"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#BAE5B6"
    }]
  }, {featureType: "poi", "elementType": "labels.text", stylers: [{visibility: "off"}]},
  {featureType: "poi", "elementType": "labels.icon", stylers: [{visibility: "off"}]},
  {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{
      "visibility": "off"
    }]
  },{
    "elementType": "labels.text.stroke",
    "stylers": [{
      "color": "#555555"
    }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
    { lightness: 100 },
    { visibility: "simplified" }
    ]
  }];

  var locationTypes = [];
  var mapStyle;
  var mapType = "default";
  var mapCenter = new google.maps.LatLng(33.70822692863357,-80.83962782031251);
  var mapZoom = 8;
  var mapTab = "filter";
  var mapURL = "http://schealthatlas.org/";

  var urlParameters = location.search.replace('?', '').split('&').map(function(val){
    return val.split('=');
  });

  if (urlParameters.length > 1 || urlParameters[0] != ""){
    for (var i = 0; i < urlParameters.length; i++) {

      var parameterName = urlParameters[i][0];
      var parameterValue = urlParameters[i][1];
      //console.log(parameterName + ": " + parameterValue);

      if (parameterName == 'type'){
        mapType = parameterValue;
        if (mapType == 'terrain' || mapType == 'hybrid'){mapStyle = stockStyle;}
        else{
          mapStyle = flatStyle;
        };
      };
      if (parameterName == 'zoom'){mapZoom = Number(parameterValue);};
      if (parameterName == 'center'){
        parameterValue = parameterValue.split(',');
        var mapCenter = new google.maps.LatLng(parameterValue[0],parameterValue[1]);
      };
      if (parameterName == 'services'){
        parameterValue = parameterValue.split(',');
        for (var n = 0; n < parameterValue.length; n++){
          locationTypes.push(parameterValue[n]);
        };
      };
      if (parameterName == 'tab'){
        mapTab = parameterValue;
      };

    }
  };

  function getMapSettings() {
    mapType = map.getMapTypeId();
    if (mapType == 'terrain' || mapType == 'hybrid'){mapStyle = stockStyle;}
    else{mapStyle = flatStyle};
    mapCenter = map.getCenter();
    mapZoom = map.getZoom();
  };

  function generateMapLink() {
    getMapSettings();
    // Generate a link to share this view of the map
    mapURL = "http://schealthatlas.org/";
    mapURL = mapURL + "?center=" + mapCenter.lat() + "," + mapCenter.lng() + "&zoom=" + mapZoom + "&type=" + mapType;
    if (locationTypes.length > 0){
      var mapLocations = locationTypes.join(",");
      mapURL = mapURL + "&services=" + mapLocations;
    };
  }

  var mapOptions = {
     zoom: mapZoom,
     center: mapCenter,
     scrollwheel: true,
     mapTypeControl: false,
     disableDefaultUI: true,
     mapTypeId: mapType,
     draggableCursor:'default',
     styles: mapStyle
   }
  var map = new google.maps.Map(document.getElementById(mapDivId), mapOptions);

  function initialize() {

   markers = [];

   directionsDisplay = new google.maps.DirectionsRenderer({
     draggable:false,
   });

   directionsDisplay.setPanel(document.getElementById("directionslist"));
   geocoder = new google.maps.Geocoder();

   toggleKML();

   google.maps.event.addListener(kmlOverlay, 'click', function(kmlEvent) {
    var kmlData = kmlEvent.featureData;
    //showInContentWindow(kmlData);
  });

   function showInContentWindow(text) {
    console.log(text);
  }

  function toggleKML(){
    var kmlID = layerSelector.options[layerSelector.selectedIndex].value;
    var legendImage = document.getElementById('overlayLegend');
    if (kmlID == 0){
      kmlOverlay.setMap(null);
    //hide legend
    legendImage.style.visibility="hidden";
  }
  else {
    kmlOverlay.setUrl("http://schealthatlas.org/assets/overlaydata/KMZ/" + kmlID + ".kmz");
    kmlOverlay.setMap(map);
    //show legend
    if (kmlID != "counties"){
      legendImage.src="assets/overlaydata/legends/" + kmlID + ".png";
      legendImage.style.visibility="visible";
    };
  }
}

map.mapTypes.set("default", new google.maps.StyledMapType(flatStyle, {name: "Default"}));

map.mapTypes.set("google", new google.maps.StyledMapType(stockStyle, {name: "Google Map"}));

map.mapTypes.set("greyscale", new google.maps.StyledMapType(grayStyle, {name: "Greyscale"}));

map.mapTypes.set("sepia", new google.maps.StyledMapType(sepiaStyle, {name: "Sepia"}));

map.mapTypes.set("light", new google.maps.StyledMapType(subtleStyle, {name: "Light Map"}));

map.mapTypes.set("dark", new google.maps.StyledMapType(darkStyle, {name: "Dark Map"}));

map.mapTypes.set("OSM", new google.maps.ImageMapType({
  getTileUrl: function(coord, zoom) {
    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
  },
  tileSize: new google.maps.Size(256, 256),
  name: "OpenStreetMap",
  maxZoom: 19
}));

map.mapTypes.set("mapquest", new google.maps.ImageMapType({
  getTileUrl: function(coord, zoom) {
    return "http://otile1.mqcdn.com/tiles/1.0.0/map/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
  },
  tileSize: new google.maps.Size(256, 256),
  name: "MapQuest OSM",
  maxZoom: 19
}));

map.mapTypes.set("mapquestaerial", new google.maps.ImageMapType({
  getTileUrl: function(coord, zoom) {
    return "http://otile1.mqcdn.com/tiles/1.0.0/sat/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
  },
  tileSize: new google.maps.Size(256, 256),
  name: "MapQuest Aerial",
  maxZoom: 18
}));

var agenciesMapped = 0;
for (var i = 0; i < locationTypes.length; i++) {
	if (locationTypes[i] == "snap"){locations = snapLocations;};
	if (locationTypes[i] == "fqhc"){locations = fqhcLocations;};
  if (locationTypes[i] == "wic"){locations = wicLocations;};
  if (locationTypes[i] == "headstart"){locations = headstartLocations;};
  if (locationTypes[i] == "chealth" || 
    locationTypes[i] == "cdental" || 
    locationTypes[i] == "schoolclinic" || 
    locationTypes[i] == "hospital" || 
    locationTypes[i] == "nonprofit" || 
    locationTypes[i] == "agency" || 
    locationTypes[i] == "publichealth" || 
    locationTypes[i] == "mentalhealth" || 
    locationTypes[i] == "substanceabuse" || 
    locationTypes[i] == "freemed" || 
    locationTypes[i] == "freedental"){locations = agencyLocations;agenciesMapped = agenciesMapped + 1;};

    $("input:checkbox[value=" + locationTypes[i] + "]").attr("checked", true);
    $("input:checkbox[value=" + locationTypes[i] + "]").parent('label').removeClass("disabled");

    addMarkers();
}

function addMarkers() {
      // Add filtered locations to markers array.
      for (var i = 0; i < locations.length; i++) {
      	var placemark = locations[i];

      	var iconType = placemark.Type[0];
        var placemarkSubType = iconType;
        if (placemark.Type.length > 1){
          iconType="other";
        };
        if (placemark.OrgType != undefined){
          if (placemark.OrgType == "State Agencies"){
            iconType="agency"; // No datapoints currently exist which do not have subtypes; uncomment 'other state agencies' <li> in map.html if any are added in the future.
            if (placemark.SubType == "Substance Abuse"){iconType="substanceabuse";};
            if (placemark.SubType == "Mental Health"){iconType="mentalhealth";};
            if (placemark.SubType == "Public Health"){iconType="publichealth";};
          };

          if (placemark.OrgType == "Community Health Center"){
            iconType="chealth";
            if (placemark.SubType == "Dental Site"){iconType="cdental";};
            if (placemark.SubType == "School-based Clinic"){iconType="schoolclinic";};
          };

          if (placemark.OrgType == "Hospital"){
            iconType="hospital";
          };

          if (placemark.OrgType == "Non-profit organization"){
            iconType="nonprofit";
          };

          if (placemark.OrgType == "Free Dental Clinic"){
            iconType="freedental";
          };

          if (placemark.OrgType == "Free Medical Clinic"){
            iconType="freemed";
          };

          // Move to next dataset if 'agencies' dataset has already been added to the map
          if(agenciesMapped > 1){continue;};
        };
        placemarkSubType = iconType;

        // Move to next datapoint if current type is not selected to be mapped
        if ($.inArray(iconType, locationTypes) == -1){continue;};

        var coordinates = placemark.Latitude + "," + placemark.Longitude;

      // Decide which values to use for Latitude and Longitude (some data includes geometry, some does not)
      if (placemark.geometry != undefined){
        latLng = new google.maps.LatLng(placemark.geometry.y, placemark.geometry.x);
      }
      else{
        if (placemark.Latitude == 0){
          // Move to next datapoint if current datapoint has bad geometry, and log these points so they may be fixed
          // console.log(placemark);
          continue;
        };
        latLng = new google.maps.LatLng(placemark.Latitude, placemark.Longitude);
      }

      // Move to next datapoint if current datapoint has bad geometry, and log these points so they may be fixed
      if (isNaN(latLng.lat())){
        // console.log(placemark);
        continue;
      };

      // Do not add markers to map if heatmap option is on
      if (displayHeatmap != undefined && displayHeatmap.checked){var mapdiv = null;}
      else{var mapdiv = map};

      var markerIcon = 'assets/images/markers/' + iconType + '.png';

      var marker = new google.maps.Marker({'map': mapdiv, 'position': latLng, 'icon': markerIcon, 'origIcon': markerIcon, 'title':placemark.SiteName, 'addressLineOne':placemark.Address, 'addressLineTwo':placemark.City + ' ' + placemark.State, 'coordinates':coordinates, 'type':placemarkSubType});
      
      markers.push(marker);
      mylocation = marker;
      google.maps.event.addListener(marker, 'click', getMarker);
      google.maps.event.addListener(marker, 'dblclick', function(){map.setZoom(map.zoom + 1);});
      if (markers.length != 0){$("#clearButton").removeClass( "disabled");}
      else {$("#clearButton").addClass( "disabled" );}
    }
  }

  setMarkers();

  function setMarkers(){
    if (clusterToggle.checked && displayHeatmap.checked){
      if (markerCluster != undefined){markerCluster.clearMarkers();};
      toggleHeatmap();
    };
    if (clusterToggle.checked == false && displayHeatmap.checked){
      if (markerCluster != undefined){markerCluster.clearMarkers();};
      for (var i in markers){markers[i].setMap(null);};
      toggleHeatmap();
    };
    if (clusterToggle.checked && displayHeatmap.checked == false){
      if(heatmap != undefined){heatmap.setMap(null);};
      if (markerCluster != undefined){markerCluster.clearMarkers();};
      markerClusterInitialize();
    };
    if (clusterToggle.checked == false && displayHeatmap.checked == false){
      if(heatmap != undefined){heatmap.setMap(null);};
      if (markerCluster != undefined){markerCluster.clearMarkers();};
      markersInitialize();
    };
  }

  function markerClusterInitialize(){
    markerCluster = new MarkerClusterer(map, markers,{
      gridSize: 52,
      minimumClusterSize: 50,
    });

    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
     if (zoomOnClick==true){
      var center = cluster.getCenter();
      map.panTo(center);
      var magnify = 1;
      if (map.zoom < 11){
       magnify = 3;
     };
     var newZoom = map.zoom + magnify;
     map.setZoom(newZoom);
   };
 });
  }

  function markersInitialize() {
    for (var i = 0; i < markers.length; i++){
      markers[i].setMap(map);
    };
  }

 function toggleHeatmap() {
   heatmap.setMap(null);
   var heatMarkers = [];
   var heatmapPointArray = [];
   if (displayHeatmap.checked){
    for (var i = 0; i < markers.length; i++) {
     heatMarkers.push(markers[i].position);
   };
   heatmapPointArray = new google.maps.MVCArray(heatMarkers);
   heatmap.setData(heatmapPointArray);
   heatmap.set('radius', 0.02);
   heatmap.set('dissipating', false);
   heatmap.setMap(map);
 };
}

  //-----Autocomplete Input
  var autocompleteOptions = { types: ['geocode'] };
  var input = document.getElementById('searchBox');

  var autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);

  var startPoint = document.getElementById('startPoint');
  var autocompleteStart = new google.maps.places.Autocomplete(startPoint, autocompleteOptions);

  var mapSearchBox = document.getElementById('mapSearchBox');
  var autocompleteMap = new google.maps.places.Autocomplete(mapSearchBox, autocompleteOptions);

  var endPoint = document.getElementById('endPoint');
  var autocompleteEnd = new google.maps.places.Autocomplete(endPoint);

  autocomplete.bindTo('bounds', map);
  autocompleteStart.bindTo('bounds', map);
  autocompleteEnd.bindTo('bounds', map);
  autocompleteMap.bindTo('bounds', map);


    //Define event listeners within the scope of initialize() function

    google.maps.event.addDomListener(document.getElementById('mapToggle'), 'click', function(){
      changeMapDiv();  		
    });

    google.maps.event.addListener(map,'dragstart',function(){
      zoomOnClick=false;});

    google.maps.event.addListener(map,'mouseup',function(){setTimeout(function(){
      zoomOnClick=true;},50);});

    google.maps.event.addDomListener(document.getElementById('heatmapToggle'), 'change', function(){
      setMarkers();
    });

    google.maps.event.addDomListener(document.getElementById('layerSelector'), 'change', toggleKML);

    google.maps.event.addDomListener(document.getElementById('clusterToggle'), 'change', function(){
    	setMarkers();
     });

    google.maps.event.addDomListener(map, 'zoom_changed', function(){
      $('#slider-vertical').slider('value', map.zoom);
    });

    $('#mapSearchBox').bind('input', function() { 
      document.getElementById('searchBox').value = $(this).val() // get the current value of the input field.
    });

    $('#mapShareButton').on('click', function() {
      ga('send', 'event', 'button', 'click', 'share-buttons');
    });

    $('#directionsShareButton').on('click', function() {
      ga('send', 'event', 'button', 'click', 'share-buttons', 'Map view share');
    });

    $(".placeTypeToggle").on("change",function(){
        if (this.checked){
          $(this).parent('label').removeClass('disabled');
        }
        else{
          $(this).parent('label').addClass('disabled');
        }
      });

    // directions, search, generate map, track tabs


    //  create the ContextMenuOptions object, which appears when the user right clicks the map
    var contextMenuOptions={};
    contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};

//  create an array of ContextMenuItem objects
var menuItems=[];
menuItems.push({className:'context_menu_item', id:'searchNearHere', eventName:'search_near_here', label:'Search Near Here'});
menuItems.push({className:'context_menu_item', eventName:'center_map_click', label:'Zoom In'});
//  a menuItem with no properties will be rendered as a separator
menuItems.push({});
menuItems.push({className:'context_menu_item', id:'shareView', eventName:'share_view', label:'Share this map view'});
menuItems.push({className:'context_menu_item', id:'clearDirectionsItem', eventName:'clear_directions', label:'Clear Directions'});
contextMenuOptions.menuItems=menuItems;

//  create the ContextMenu object
var contextMenu = new ContextMenu(map, contextMenuOptions);

//  display the ContextMenu on a Map right click
google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
  contextMenu.show(mouseEvent.latLng);
});

//  listen for the ContextMenu 'menu_item_selected' event
google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
  //  latLng is the position of the ContextMenu
  //  eventName is the eventName defined for the clicked ContextMenuItem in the ContextMenuOptions
  switch(eventName){
    case 'search_near_here':
    document.getElementById("searchBox").value = latLng.toUrlValue();
    $('#myTab a[href="#search"]').tab('show');
    codeAddress(document.getElementById('searchBox').value);
    break;
    case 'share_view':
    generateMapLink();
    share(mapURL,'Share This Map');
    $('#urlLink').val(mapURL);
    break;
    case 'center_map_click':
    map.panTo(latLng);
    if (map.zoom < 7){map.setZoom(map.zoom+3)}
     else {map.setZoom(map.zoom+2)};
   break;
   case 'clear_directions':
   directionsDisplay.setMap(null);
   document.getElementById('clearDirectionsItem').style.display="none";
   break;
 }
});

// Show tab passed from URL parameters
$('#myTab a[href="#' + mapTab + '"]').tab('show');

}; //end of initialize function


google.maps.event.addDomListener(window, 'load', initialize);

//global functions

function clearMap() {
  // for (var i in markers){markers[i].setMap(null);console.log(markers[i]);};
  // markers = [];
  // markerCluster.clearMarkers();
  // heatmap.setMap(null);
  // directionsDisplay.setMap(null);
  getMapSettings();
  document.getElementById('clearDirectionsItem').style.display="none";
  // remove any KML overlays
  $("#layerSelector").val(0);
  // kmlOverlay.setMap(null);
  document.getElementById('overlayLegend').style.visibility="hidden";

  $(".placeTypeToggle").attr("checked", false);
  $(".placeTypeToggle").parent('label').addClass('disabled');
  locationTypes = [];
  initialize();
  $('#resultsArea').hide();
}

function showDirections(origin, destination) {
	$('#directionslist').hide();
	$('input#startPoint').val(origin);
	$('input#endPoint').val(destination);
	$('#myTab a[href="#directions"]').tab('show');
	var startInput = document.getElementById('startPoint');
	if (startInput.value == ""){
		setTimeout(function(){
      startInput.focus();
    }, 500);
	};
}

function getRoute(origin, destination) {
  //origin = origin.replace(/ /g,'');
  var selector = document.getElementById('directionsTypeSelector');
  var travelModeSelected = selector.options[selector.selectedIndex].value;
  if (travelModeSelected == "DRIVING"){travelMode = google.maps.TravelMode.DRIVING};
  if (travelModeSelected == "WALKING"){travelMode = google.maps.TravelMode.WALKING};
  if (travelModeSelected == "BICYCLING"){travelMode = google.maps.TravelMode.BICYCLING};
  if (travelModeSelected == "TRANSIT"){travelMode = google.maps.TravelMode.TRANSIT};
  var request = {
    origin:origin,
    destination:destination,
    travelMode: travelMode
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directions = "https://maps.google.com/maps?q=from:+" + origin + "+to:+" + destination;
  		//document.getElementById('googlemapslink').href=directions;
      directionsDisplay.setDirections(result);
      directionsDisplay.setMap(map);
      $('#directionslist').hide();
      $('#directionslist').fadeIn('slow');
      document.getElementById('directionsActions').style.display="block";
      document.getElementById('directionsActions').style.visibility="visible";
      document.getElementById('clearDirectionsItem').style.display="block";
    }
    //--If the start point was not parsed by Google
    else {
    	alert("Directions from this address could not be found. Please try again.");
    		//--If there was no address entered
       if (start == 0){
    			//document.getElementById('directionslist').innerHTML = "<div class='alert alert-error' style='margin:0px;font-size:15px;'>Please enter a starting point.</div>";
    		};
      };
    });
}

function codeAddress(address) {
  document.getElementById('searchBox').value = address;
  document.getElementById('mapSearchBox').blur();
	if (locationTypes.length==0){
		$('#resultsArea').hide();
    $('#noResultsWarning').hide();
    $('#noResultsWarning').html("Select locations to search from the filter tab.");
    $('#noResultsWarning').fadeIn('fast');
    $('#myTab a[href="#search"]').tab('show');
    return;
  }
  else{
    if (markers.length==0){
      initialize();
      changeMapDiv();
    }
    $('#myTab a[href="#search"]').tab('show');
  }
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      myAddress = results[0].geometry.location;
      find_closest_marker(myAddress);
    } 
    else {
      $('#resultsArea').hide();
      $('#noResultsWarning').hide();
      $('#noResultsWarning').html("There was a problem getting this location. Please check the value you entered and try again.");
      $('#noResultsWarning').fadeIn('fast');
    }
  });
}

function rad(x) {return x*Math.PI/180;}
function find_closest_marker(event) {
  $('input#startPoint').val($('input#searchBox').val());
  maxDistance = $('#maxDistanceInput').val();
  if (maxDistance == 1){plural = ""}else{plural = "s"};
  var lat = myAddress.lat();
  var lng = myAddress.lng();
    var Rmetric = 6371; // radius of earth in km
    var R = 3959; // radius of earth in mi
    var distances = [];
    placeResults = [];
    var closest = -1;
    for( i=0;i<markers.length; i++ ) {
      var mlat = markers[i].position.lat();
      var mlng = markers[i].position.lng();
      var dLat  = rad(mlat - lat);
      var dLong = rad(mlng - lng);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      distances[i] = d;
      if (d < maxDistance){placeResults.push({"placeName":markers[i],"placeDistance":d})};
      if ( closest == -1 || d < distances[closest] ) {
        closest = i;
      }
    }
    sortPlaceResults();
  }

  function sortPlaceResults() {
   document.getElementById('resultsArea').innerHTML="";
	//check that there are search results available
	if (placeResults[0] != undefined){
    	//sort the search results by distance
    	placeResults.sort(function(a, b){
    		var a1= a.placeDistance, b1= b.placeDistance;
    		if(a1== b1) return 0;
    		return a1> b1? 1: -1;
      });
      var selector = document.getElementById('resultNumberSelector');
      resultsLimit = selector.options[selector.selectedIndex].value;
      if (resultsLimit == "All"){resultsLimit = placeResults.length;};
      setBounds();
      for( i=0;i<resultsLimit; i++ ) {
        if (placeResults[i] != undefined){
         var myResult = placeResults[i].placeName;
         var prettyDistance = Math.round(placeResults[i].placeDistance * 100)/100;
         if (prettyDistance == 1){prettyDistance = prettyDistance + " " + units}
           else {prettyDistance = prettyDistance + " " + units + "s";}
         var resultHTML = '<div class="media"' + 'onclick="mylocation=placeResults[' + i + '].placeName;fillInfoPane(mylocation);zoomin(placeResults[' + i + ']);switchToMapTab();"><img class="media-object pull-left" src="assets/images/places/' + myResult.type + '.png" alt="result icon"><div class="media-body"><h4 class="media-heading">' + myResult.title + '</h4>' + myResult.addressLineOne + ' ' + myResult.addressLineTwo + '<br><b>' + prettyDistance + '</b></div></div>';
         $('#resultsArea').hide();
         $('#resultsArea').append(resultHTML);
         $('#resultsArea').fadeIn('fast');
       };
     }
     $('#noResultsWarning').hide();
     $('#myTab a[href="#search"]').tab('show');
   }
   else{
     $('#noResultsWarning').hide();
     $('#noResultsWarning').html("Sorry, no results were found within " + maxDistance + " " + units + plural + " of this location. Try widening your search.");
     $('#noResultsWarning').fadeIn('fast');
   };
 }

 function getMarker(){mylocation = this;fillInfoPane(mylocation);}
 
 function fillInfoPane(location) {
   //if (prevLocation != 0){prevLocation.setIcon(prevLocation.origIcon);console.log(prevLocation);};
   //prevLocation = location;
   fillInfoPaneTwo(location);
   // $('#placeInfoContent').hide();
   // location.setIcon(location.selectedIcon);
   // document.getElementById('placeName').innerHTML = location.title;
   // document.getElementById('placeImage').src = 'assets/images/places/' + location.type + '.png';
   // document.getElementById('placeDescription').innerHTML = location.addressLineOne + '<br>' + location.addressLineTwo;
   // newDestination = location.addressLineOne + " " + location.addressLineTwo;
   // $('#placeInfoContent').fadeIn('fast');
   // document.getElementById('infoPane').style.bottom = "0px";
   // document.getElementById('infoPane').style.opacity = "0.9";
   // markerPosition = location.position;
   // openStreetView('google_map', markerPosition);
 }
 function fillInfoPaneTwo(location) {
   currentLocation = location;
   $('#placeInfoContent').hide();
   //location.setIcon('http://maps.google.com/intl/en_us/mapfiles/ms/micons/red.png');
   document.getElementById('placeName').innerHTML = location.title;
   document.getElementById('placeImage').src = 'assets/images/places/' + location.type + '.png';
   document.getElementById('placeDescription').innerHTML = location.addressLineOne + '<br>' + location.addressLineTwo;
   // newDestination = location.addressLineOne + " " + location.addressLineTwo;
   newDestination = location.position.lat() + "," + location.position.lng();
   $('#placeInfoContent').fadeIn('fast');
   document.getElementById('infoPane').style.bottom = "0px";
   document.getElementById('infoPane').style.opacity = "0.9";
   markerPosition = location.position;
   openStreetView('google_map', markerPosition);
 }

 function setBounds() {
  var bounds = new google.maps.LatLngBounds();
  for (var i=0; i < placeResults.length; i++) {
    bounds.extend(placeResults[i].placeName.getPosition());
  }
  map.fitBounds(bounds);
}

function zoomtomarker(){
  map.panTo(markerPosition);
  if (map.zoom < 15){map.setZoom(15)}
    else {map.setZoom(map.zoom + 1)};
}

function getLocation() {
	var locationDiv = document.getElementById('searchBox');
 locationDiv.placeholder="Getting location...";
 document.getElementById('startPoint').placeholder="Getting location...";
 if (navigator.geolocation){
   navigator.geolocation.getCurrentPosition(showPosition);
 }
 else{locationDiv.placeholder="Location not found.";document.getElementById('startPoint').placeholder="Location not found.";}
}
function showPosition(position) {
	var lat = Math.round(position.coords.latitude * 1000000)/1000000;
 var longi = Math.round(position.coords.longitude * 1000000)/1000000;
 var myCoords = lat + "," + longi;
 document.getElementById('searchBox').value = myCoords;
 document.getElementById('startPoint').value = myCoords;
}

function zoomin(point){
	map.panTo(point.placeName.position);
	if (map.zoom < 15){map.setZoom(15)}
}

function toggleMapDiv(parent) {
	var element = $('#google_map_wrapper').detach();
	$(parent).append(element);
}

function openStreetView(strMapCanvasID, coordinates){

//once the document is loaded, see if google has a streetview image within 100 meters of the given location, and load that panorama
  var sv = new google.maps.StreetViewService();

  sv.getPanoramaByLocation(coordinates, 50, function(data, status) {
  if (status == 'OK') {
          //google has a streetview image for this location, so attach it to the streetview div
          panoramaOptions = {
            pano: data.location.pano,
            addressControl: false,
            //navigationControl: false,
            //scrollwheel:false,
            visible:false
          }; 
          panorama = new google.maps.StreetViewPanorama(document.getElementById(strMapCanvasID), panoramaOptions);
          document.getElementById("streetviewbutton").disabled="";
          
          //calculate correct heading for streetview
          panoramaCoordinates = data.location.latLng;
          var myHeading = google.maps.geometry.spherical.computeHeading(panoramaCoordinates,coordinates);
          panorama.setOptions({pov:{heading:myHeading,pitch:0}});
        }
        else{
          //code to execute if streetview is not available at specified coordinates
          document.getElementById("streetviewbutton").disabled="disabled";
        }
      });
}

function displayStreetView() {
  panorama.setOptions({visible:true});
  $('.overMap').css("z-index", "-100");
  $('#streetviewClose').css("display", "block");
  currentLocation.setMap(panorama);
}

function closeStreetView() {
  panorama.setOptions({visible:false});
  $('.overMap').css("z-index", "100");
  $('#streetviewClose').css("display", "none");
  currentLocation.setMap(map);
}




















function changeMapDiv(){
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  if(windowWidth <= 770){
    if($('#mapSearchBox').is( ":focus" )){return;};
    if(windowWidth <= 400){
      $('#mapTab').css('height', windowHeight - 102 + 'px');
    }
    else{
      $('#mapTab').css('height', windowHeight - 122 + 'px');
    }
    toggleMapDiv('#mapTab');
    setTimeout(function(){
     google.maps.event.trigger(map, "resize");
   }, 500);
  }
  else{
    var currentTab = $("ul#myTab li.active")[0].textContent;
    if (currentTab == "Map"){
     $('#myTab a[href="#filter"]').tab('show');
   };
   toggleMapDiv(document.body);
 }
}

function switchToMapTab(){
  var windowWidth = $(window).width();
  if(windowWidth <= 770){
    $('#myTab a[href="#mapTab"]').tab('show');
    map.setCenter(mapCenter);
  };
}

function filterMarkers(toggle) {
 if (toggle.checked){
  locationTypes.push(toggle.value);
}
else{
 var index = $.inArray(toggle.value, locationTypes);
 if (index>=0) locationTypes.splice(index, 1);
}
if (locationTypes.length > 0){
 $("#generateButton").removeClass( "disabled" );
}
else {
 $("#generateButton").addClass( "disabled" );
};
}

function print(divId) {
  window.frames["print_frame"].document.body.innerHTML= document.getElementById(divId).innerHTML;
  window.frames["print_frame"].window.focus();
  window.frames["print_frame"].window.print();
}

function share(content, modalTitle) {
 //  $('#sharepopover').popover('show')
 //  $('#urlLink').val(content);
	//window.prompt('Copy to clipboard: Ctrl+C or ⌘+C, Enter', content);
  $('#shareModal').modal('show');
    document.getElementById('shareModalTitle').innerHTML = modalTitle;
  $('#urlLink').val(content);
  var emailLink = "mailto:?subject=SC Health Atlas&body=" + encodeURIComponent(content);
  $("#shareByMailLink").attr("href", emailLink);
  qrcode.clear();
  qrcode.makeCode(content);
}

(function(console){

  console.save = function(data, filename){

    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

      if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
      }

      var blob = new Blob([data], {type: 'text/json'}),
      e    = document.createEvent('MouseEvents'),
      a    = document.createElement('a')

      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
  })(console)

// function urlObject(options) {
//     "use strict";
//     /*global window, document*/

//     var url_search_arr,
//         option_key,
//         i,
//         urlObj,
//         get_param,
//         key,
//         val,
//         url_query,
//         url_get_params = {},
//         a = document.createElement('a'),
//         default_options = {
//             'url': window.location.href,
//             'unescape': true,
//             'convert_num': true
//         };

//     if (typeof options !== "object") {
//         options = default_options;
//     } else {
//         for (option_key in default_options) {
//             if (default_options.hasOwnProperty(option_key)) {
//                 if (options[option_key] === undefined) {
//                     options[option_key] = default_options[option_key];
//                 }
//             }
//         }
//     }

//     a.href = options.url;
//     url_query = a.search.substring(1);
//     url_search_arr = url_query.split('&');

//     if (url_search_arr[0].length > 1) {
//         for (i = 0; i < url_search_arr.length; i += 1) {
//             get_param = url_search_arr[i].split("=");

//             if (options.unescape) {
//                 key = decodeURI(get_param[0]);
//                 val = decodeURI(get_param[1]);
//             } else {
//                 key = get_param[0];
//                 val = get_param[1];
//             }

//             if (options.convert_num) {
//                 if (val.match(/^\d+$/)) {
//                     val = parseInt(val, 10);
//                 } else if (val.match(/^\d+\.\d+$/)) {
//                     val = parseFloat(val);
//                 }
//             }

//             if (url_get_params[key] === undefined) {
//                 url_get_params[key] = val;
//             } else if (typeof url_get_params[key] === "string") {
//                 url_get_params[key] = [url_get_params[key], val];
//             } else {
//                 url_get_params[key].push(val);
//             }

//             get_param = [];
//         }
//     }

//     urlObj = {
//         protocol: a.protocol,
//         hostname: a.hostname,
//         host: a.host,
//         port: a.port,
//         hash: a.hash.substr(1),
//         pathname: a.pathname,
//         search: a.search,
//         parameters: url_get_params
//     };

//     return urlObj;
// }


/*
  ContextMenu v1.0
  
  A context menu for Google Maps API v3
  http://code.martinpearman.co.uk/googlemapsapi/contextmenu/
  
  Copyright Martin Pearman
  Last updated 21st November 2011
  
  developer@martinpearman.co.uk
  
  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

  You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function ContextMenu(map, options){
  options=options || {};
  
  this.setMap(map);
  
  this.classNames_=options.classNames || {};
  this.map_=map;
  this.mapDiv_=map.getDiv();
  this.menuItems_=options.menuItems || [];
  this.pixelOffset=options.pixelOffset || new google.maps.Point(0,0);
}

ContextMenu.prototype=new google.maps.OverlayView();

ContextMenu.prototype.draw=function(){
  if(this.isVisible_){
    var mapSize=new google.maps.Size(this.mapDiv_.offsetWidth, this.mapDiv_.offsetHeight);
    var menuSize=new google.maps.Size(this.menu_.offsetWidth, this.menu_.offsetHeight);
    var mousePosition=this.getProjection().fromLatLngToDivPixel(this.position_);
    
    var left=mousePosition.x;
    var top=mousePosition.y;
    
    if(mousePosition.x>mapSize.width-menuSize.width-this.pixelOffset.x){
      left=left-menuSize.width-this.pixelOffset.x;
    } else {
      left+=this.pixelOffset.x;
    }
    
    if(mousePosition.y>mapSize.height-menuSize.height-this.pixelOffset.y){
      top=top-menuSize.height-this.pixelOffset.y;
    } else {
      top+=this.pixelOffset.y;
    }
    
    this.menu_.style.left=left+'px';
    this.menu_.style.top=top+'px';
  }
};

ContextMenu.prototype.getVisible=function(){
  return this.isVisible_;
};

ContextMenu.prototype.hide=function(){
  if(this.isVisible_){
    this.menu_.style.display='none';
    this.isVisible_=false;
  }
};

ContextMenu.prototype.onAdd=function(){
  function createMenuItem(values){
    var menuItem=document.createElement('div');
    menuItem.innerHTML=values.label;
    if(values.className){
      menuItem.className=values.className;
    }
    if(values.id){
      menuItem.id=values.id;
    }
    menuItem.style.cssText='cursor:pointer; white-space:nowrap';
    menuItem.onclick=function(){
      google.maps.event.trigger($this, 'menu_item_selected', $this.position_, values.eventName);
    };
    return menuItem;
  }
  function createMenuSeparator(){
    var menuSeparator=document.createElement('div');
    if($this.classNames_.menuSeparator){
      menuSeparator.className=$this.classNames_.menuSeparator;
    }
    return menuSeparator;
  }
  var $this=this; //  used for closures
  
  var menu=document.createElement('div');
  if(this.classNames_.menu){
    menu.className=this.classNames_.menu;
  }
  menu.style.cssText='display:none; position:absolute';
  
  for(var i=0, j=this.menuItems_.length; i<j; i++){
    if(this.menuItems_[i].label && this.menuItems_[i].eventName){
      menu.appendChild(createMenuItem(this.menuItems_[i]));
    } else {
      menu.appendChild(createMenuSeparator());
    }
  }
  
  delete this.classNames_;
  delete this.menuItems_;
  
  this.isVisible_=false;
  this.menu_=menu;
  this.position_=new google.maps.LatLng(0, 0);
  
  google.maps.event.addListener(this.map_, 'click', function(mouseEvent){
    $this.hide();
  });
  
  this.getPanes().floatPane.appendChild(menu);
};

ContextMenu.prototype.onRemove=function(){
  this.menu_.parentNode.removeChild(this.menu_);
  delete this.mapDiv_;
  delete this.menu_;
  delete this.position_;
};

ContextMenu.prototype.show=function(latLng){
  if(!this.isVisible_){
    this.menu_.style.display='block';
    this.isVisible_=true;
  }
  this.position_=latLng;
  this.draw();
};