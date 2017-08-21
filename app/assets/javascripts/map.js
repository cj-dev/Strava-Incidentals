$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

map = function() {
    var directionsDisplay;
    var directionsService;
    var main_map;

    var startLoc;
    var endLoc;
    var intervalLocs;
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

        distance.modLatLng();
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
                intervalLocs = distance.findPointsEveryMeters(
                    result.routes[0].overview_path, 1000);
                strava.fetchRouteSegments(intervalLocs, 500);
                // drawIntervals(intervalLocs); // debugging
            }
            else {
                console.log("Something bad happened determining directions: " + status);
                clearIt();
            }
        });
    }

    function overlaySegments(segments) {
        $.each(segments, function( index, segment ) {
            segmentMarker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    segment.start_latlng[0], segment.start_latlng[1]),
                map: main_map,
                title: segment.name
            });
            google.maps.event.addListener(segmentMarker, 'click', function() {
                // add to route
            });
            segmentPath = new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(segment.points),
                strokeColor: 'DarkOrange',
                map: main_map,
            });

        });
    }

    function drawIntervals(intervals) {
        if( intervals.length < 1 ) {
            return;
        }
        $.each( intervals, function( index, value ){
            intervalMarker = new google.maps.Marker({
                position: value,
                map: main_map,
                title: "interval " + index
            });
        });
    };

    return { initMap: initMap, overlaySegments: overlaySegments }
}();
