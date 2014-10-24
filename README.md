# node-wmata-metro

[![Build Status](https://travis-ci.org/jacksongeller/node-wmata-metro.svg?branch=master)](https://travis-ci.org/jacksongeller/node-wmata-metro)

## Looking for bus?
Check out [this](https://github.com/jacksongeller/node-wmata-bus)

## Install
`$ npm install node-wmata-metro --save`



## Get started

1. Grab your metro API key
2. Init the client

```js 

var Metro = require('metro');
var client = new Metro('api key here');
```


## Examples

```js

var Metro = require('wmata-metro-js');
var client = new Metro(process.env.METROPASSWORD);

// second param for sorting into separate stations
client.getRailStationPrediction('A10,C12', true, function(err, res) {
  if (err) throw err;
  else console.log(res);
});

client.getRailStationToStationInfo('A10', 'C12', function(err, res) {
  if (err) throw err;
  else console.log(res);
});
```


## API

### getRailLines(done) 

Get all rail lines

**Parameters**

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of lines with codes


### getRailStations(lineCode, done) 

For a given line, get all stations

**Parameters**

**lineCode**: `String`, the line code, ie: RD or SV

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of stations for a given line


### getRailStationInfo(stationCode, done) 

Get info for a station

**Parameters**

**stationCode**: `String`, a station code, ie: A10

**done**: `function`, callback(err, res)

**Returns**: `Object`, - object of properties corresponding to station


### getRailPaths(fromStationCode, toStationCode, done) 

Get stations between two different stations

**Parameters**

**fromStationCode**: `String`, start station code, ie: A10

**toStationCode**: `String`, end station code, ie: C03

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of stations between a start and end station


### getRailStationPrediction(stationCodes, done) 

Get prediction times for a station

**Parameters**

**stationCodes**: `String`, station code, ie: A10. Can also include a multiple stations separated by comma, ie:A10,A11,C02.

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of train predictions


### getRailStationEntrances(loc, radius, done) 

Get station entrance info via a location

**Parameters**

**loc**: `Object`, object of coordinates, ie: loc.lat, loc.lon

**radius**: `Number`, radius of search location in meters

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of meta info on the stations that are near the loc


### getRailStationParking(stationCode, done) 

Get rail station parking info

**Parameters**

**stationCode**: `String`, station code, ie: A10

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of parking info on the station


### getRailStationTimes(stationCode, done) 

Get rail station time info

**Parameters**

**stationCode**: `String`, station code, ie: A10

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of time info on the station


### getRailStationToStationInfo(fromStationCode, toStationCode, done) 

Get rail station to station info

**Parameters**

**fromStationCode**: `String`, start station code, ie: A10

**toStationCode**: `String`, end station code, ie: B05

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of station to station info on the stations


### getClosestStationsPrediction(loc, radius, limit, done) 

Get the closest stations and their predictions given a location

**Parameters**

**loc**: `Object`, the coordinates for a point to search, loc.lat, loc.lon

**radius**: `Number`, the search radius in meters

**limit**: `Number`, the number of of stations to return

**done**: `function`, callback(err, res)

**Returns**: `Array`, - list of stations closest to your coordinate and their predictions
