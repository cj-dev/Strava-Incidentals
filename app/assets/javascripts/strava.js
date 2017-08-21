// var segments = [];

strava = function() {

    /**
    * Requests strava segments along an array representing a sampling
    * of locations along a route. Supply larger radius to expand the search
    * further from the original route.
    */
    function fetchRouteSegments(intervalLocs, radius) {
        var requestData = {"boundsArray": []};
        $.each( intervalLocs, function( index, value ){

            var bounds = defineBoundingBox(value, radius);
            var swBound = bounds[0]
            var neBound = bounds[1]

            requestData.boundsArray.push(
                `${swBound.lat()},${swBound.lng()},${neBound.lat()},${neBound.lng()}`)
        });

        var queryEndpoint = window.location.origin + '/strava/segments/explore'
        $.post(queryEndpoint, requestData, function(data) {
            map.overlaySegments(data.segments);
        });
    }

    /** Requests segments around a single point */
    function fetchPointSegments(center, radius) {
        var bounds = defineBoundingBox(center, radius);
        var swBound = bounds[0]
        var neBound = bounds[1]

        var requestData = {
            "bounds": `${swBound.lat()},${swBound.lng()},${neBound.lat()},${neBound.lng()}`}
        var queryEndpoint = window.location.origin + '/strava/segments/explore'
        $.get(queryEndpoint, requestData, function(data) {
            map.overlaySegments(data.segments);
        });
    }


    /**
    * Given a centerpoint and a "radius", calculates a bounding box using
    * radius as the distance from the center to a corner of the box. Strava
    * demands boxes.
    */
    function defineBoundingBox(center, radius) {
        var theDiagonal = radius * Math.sqrt(2)
        var sw = distance.dLatLng(center, -theDiagonal, -theDiagonal);
        var ne = distance.dLatLng(center, theDiagonal, theDiagonal);
        return [sw, ne]
    }


    /**
    * Determine on behalf of the user whether this is a feasible segment
    * to add to one's route based on the start and end locations and direction
    *
    * To be implemented?
    */
    function scrutinize(directions, segments) {
        //etcetera
    }

    return { fetchRouteSegments:fetchRouteSegments, fetchPointSegments:fetchPointSegments }
}();
