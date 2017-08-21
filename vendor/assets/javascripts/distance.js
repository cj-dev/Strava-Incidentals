/**
* Largely ripped from Daniel Vassallo's answer to
* https://stackoverflow.com/questions/2698112/how-to-add-markers-on-google-maps-polylines-based-on-distance-along-the-line
* in turn based off Chris Veness's work on lat/lon distance calculators
* and modified for use with GMaps API v3 and the context of this project.
*/


Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
    return this * 180 / Math.PI;
}

distance = function() {

    var earthRadius = 6378 // kilometers

    /** 
    * Returns a new LatLng object given a LatLng object and changes
    * in latitude and longitude. Based on
    * https://stackoverflow.com/questions/7477003/calculating-new-longtitude-latitude-from-old-n-meters
    */
    function dLatLng(point, dLat, dLng) {
        resultLat = point.lat() + ((dLat/1000) / earthRadius) * (180/Math.PI);
        resultLng = point.lng() + ((dLng/1000) / earthRadius) * (180/Math.PI)
            / Math.cos(point.lat() * Math.PI/180);
        return new google.maps.LatLng(resultLat, resultLng)
    }

    function modLatLng() {
        google.maps.LatLng.prototype.moveTowards = function(point, distance) {
            var lat1 = this.lat().toRad();
            var lon1 = this.lng().toRad();
            var lat2 = point.lat().toRad();
            var lon2 = point.lng().toRad();
            var dLon = (point.lng() - this.lng()).toRad();

            // Find the bearing from this point to the next.
            var brng = Math.atan2(Math.sin(dLon) * Math.cos(lat2),
                Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) *
                Math.cos(dLon));

            var angDist = distance / 6371000;  // Earth's radius.

            // Calculate the destination point, given the source and bearing.
            lat2 = Math.asin(Math.sin(lat1) * Math.cos(angDist) +
                Math.cos(lat1) * Math.sin(angDist) *
                Math.cos(brng));

            lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angDist) *
                Math.cos(lat1),
                Math.cos(angDist) - Math.sin(lat1) *
                Math.sin(lat2));

            if (isNaN(lat2) || isNaN(lon2)) return null;

            return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
        }
    }

    function moveAlongPath(points, distance, index) {
        index = index || 0;  // Set index to 0 by default.

        if (index < points.length - 1) {
            // There is still at least one point further from this point.

            // Construct a PolyLine to use the getLength() method.
            var polyline = new google.maps.Polyline({
                path:[points[index], points[index + 1]]
            });

            // Get the distance from this point to the next point in the polyline.
            // This for v3
            var distanceToNextPoint = google.maps.geometry.spherical.computeLength(
                polyline.getPath().getArray())
            // This for v2
            // var distanceToNextPoint = polyline.getLength();

            if (distance <= distanceToNextPoint) {
                // distanceToNextPoint is within this point and the next.
                // Return the destination point with moveTowards().
                return points[index].moveTowards(points[index + 1], distance);
            }
            else {
                // The destination is further from the next point. Subtract
                // distanceToNextPoint from distance and continue recursively.
                return moveAlongPath(points,
                    distance - distanceToNextPoint,
                    index + 1);
            }
        }
        else {
            // There are no further points. The distance exceeds the length
            // of the full path. Return null.
            return null;
        }
    }

    var nextMarkerAt = 0;     // Counter for the marker checkpoints.
    var nextPoint = null;     // The point where to place the next marker.

    // Find the checkpoint markers every given meters.
    function findPointsEveryMeters(points, meters) {
        intervalPoints = [points[0]];
        nextMarkerAt = meters;
        while (true) {
            // Call moveAlongPath which will return the LatLng with the next
            // marker on the path.
            nextPoint = moveAlongPath(points, nextMarkerAt);

            if (nextPoint) {
                intervalPoints.push(nextPoint);
                nextMarkerAt += meters;
            }
            else {
                // moveAlongPath returned null, so there are no more check points.
                break;
            }
        }
        intervalPoints.push(points[points.length-1]);
        return intervalPoints;
    }

    return { dLatLng:dLatLng, modLatLng:modLatLng, findPointsEveryMeters:findPointsEveryMeters }
}();
