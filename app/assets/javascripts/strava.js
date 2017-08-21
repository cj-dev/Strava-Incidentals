// var segments = [];

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
        overlaySegments(data.segments);
    });
}

function fetchPointSegments(center, radius) {
    var bounds = defineBoundingBox(center, radius);
    var swBound = bounds[0]
    var neBound = bounds[1]

    var requestData = {
        "bounds": `${swBound.lat()},${swBound.lng()},${neBound.lat()},${neBound.lng()}`}
    var queryEndpoint = window.location.origin + '/strava/segments/explore'
    $.get(queryEndpoint, requestData, function(data) {
        overlaySegments(data.segments);
    });
}


function defineBoundingBox(center, radius) {
    var theDiagonal = radius * Math.sqrt(2)
    var sw = dLatLng(center, -theDiagonal, -theDiagonal);
    var ne = dLatLng(center, theDiagonal, theDiagonal);
    return [sw, ne]
}


function scrutinize(directions, segments) {
    //etcetera
}
