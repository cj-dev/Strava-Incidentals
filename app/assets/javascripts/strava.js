var segments = [];

function fetchRouteSegments(intervals, radius) {
    $.each( intervals, function( index, value ){
        fetchPointSegments(value, radius);
    });
}

function fetchPointSegments(center, radius) {
    var bounds = defineBoundingBox(center, radius);
    var swBound = bounds[0]
    var neBound = bounds[1]

    var requestData = {
        "bounds": `${swBound.lat()},${swBound.lng()},${neBound.lat()},${neBound.lng()}`}
    console.log(requestData);
    var queryEndpoint = window.location.origin + '/strava/segments/explore'
    $.get(queryEndpoint, requestData, function(data) {
        segments.push(data.segments);
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
