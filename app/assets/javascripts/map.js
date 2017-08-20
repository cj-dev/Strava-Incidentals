var directionsDisplay;
var directionsService;
var main_map;

var startLoc;
var endLoc;
var startMarker;


function initMap() {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
          zoom:7,
          center: chicago
        }
    main_map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(main_map);

    google.maps.event.addListener(main_map, "click", function(event) {
        addLocation(event.latLng);
    })

}

function addLocation(latLng) {
    if(startLoc === undefined) {
        startLoc = latLng;
        startMarker = new google.maps.Marker({
            position: latLng,
            map: main_map,
            title: 'Start'
        });

    }
    else if (endLoc === undefined) {
        endLoc = latLng;
        calcRoute(startLoc, endLoc);
    }
}
function clearIt() {
    startLoc = undefined;
    endLoc = undefined;
    startMarker.setMap(null);
    directionsDisplay.set('directions', null);
}

function calcRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: 'BICYCLING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            startMarker.setMap(null);
        }
        else {
            console.log("Something bad happened determining directions: " + status);
        }
    });
}
