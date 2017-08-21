# Strava Incidental

The best way to K or Q OM by happenstance

## Why?

We like segments. Not just so we can flex our e-quads to strangers on the Internet, but because segments often feature challenging climbs, exciting descents, and landmarks for you to see out of the corner of your eye at 60kph.

Strava's segment explorer is not the most usable, but it's the only one in town. It uses a bounding box defined by what you're looking at in your browser or on your phone to retrieve segments. The problems are:

* Maximum 10 results returned per view
* Those 10 results are unpredictable at different zoom levels
* Those results could be miles away from where you're focused on!

## What's this do?

Strava Incidental uses a route you define in a google-maps-like interface to suggest segments that are along the way. It takes samples of locations along your route and uses the Strava API to dig for as many relevant and feasible segments as possible near those locations.

## Any limitations?

We use Google maps' waypoints to add a Strava segment's path to your route. Google maps only allows [23 waypoints](https://developers.google.com/maps/documentation/javascript/directions#UsageLimits) per direction query. Maybe we can get clever to work around this.

Because of that 10 result limit mentioned earlier, there's a scalability problem. This app must make a large number of requests to perform what seems pretty simple. That eats up API access quotas.

## What to do next?

* Sometimes the bounding boxes defined by a route's sample locations contain more than 10 results each, so some segments are being left out. We should devise a way to query bounding boxes within the maxed-out box for maximum fidelity.
 
* Work with the maximum waypoint limitation to add more segments to your route so you can unleash your accidental KOM potential.
 
* Download a GPX file of the resulting route including segments.
 
* Upload the resulting route to a user's Strava account so they can get riding.

### Personal Note

This project started as a learning experience for Rails and some Javascript. I appreciate bug reports, PRs, and any other feedback, because I could definitely use all of it.
