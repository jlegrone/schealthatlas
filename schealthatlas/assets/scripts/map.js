$(document).ready(function() {

  //Change the map to the correct parent node when window is resized
  $( window ).resize(changeMapDiv);

  //Listens for when the value of a filter is changed
  $(".placeTypeToggle").on("change",function(){filterMarkers(this)});

	$(function () {
    	$('#myTab a:first').tab('show')
  })
   
   //initialize the map
   initialize();
   
   //Initialize the zoom level control/visualizer
  $(function() {
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 21,
      step:1,
      value: mapZoom,
      slide: function( event, ui ) {
        map.setZoom(ui.value);
      }
    });
    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
  });

});

var qrcode = new QRCode(document.getElementById("shareQRCode"), "http://www.schealthatlas.org/");