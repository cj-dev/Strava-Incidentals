function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 7,
	center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
	calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
}
