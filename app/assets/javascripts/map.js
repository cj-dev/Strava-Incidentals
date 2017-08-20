var directionsDisplay;
var directionsService;
var map;

var startMarker;
var endMarker;


function initMap() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
          zoom:7,
          center: chicago
        }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    google.maps.event.addListener(map, "click", function(event) {
        addLocation(event.latLng);
    })

}

function addLocation(latLng) {
    if(startMarker === undefined) {
        addStartLocation(latLng);
    }
    else if (endMarker === undefined) {
        addEndLocation(latLng);
        calcRoute(startMarker, endMarker)
    }
    // else {
    //     addWaypoint(latLng);
    // }
}
function addStartLocation(latLng) {
    startMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Start'
    });

}
function addEndLocation(latLng) {
    endMarker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Finish'
    });
}
function calcRoute(start, end) {
    var request = {
        origin: start.position,
        destination: end.position,
        travelMode: 'BICYCLING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
        else {
            console.log("Something bad happened determining directions: " + status);
        }
    });
}
