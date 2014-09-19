# wmata-metro.js

[![Build Status](https://travis-ci.org/jacksongeller/wmata-metro.js.svg)](https://travis-ci.org/jacksongeller/wmata-metro.js)

### Install
`$ npm install wmata-metro-js --save`


---
### Get started

1. Grab your metro API key
2. Init the client

```js 
var Metro = require('metro');
var client = new Metro('api key here');
```

---
### API

#### getStationPrediction(stations, opts, callback)
+ `stations` string, comma delimited
+ `opts` object `{sort: bool, suffix: bool}`
+ `callback(err, data)`
+ returns prediction data on given stations. Options can add a min/mins suffix to minutes, and sort based on the station


#### getClosestStations(coord, range, callback)
+ `coord` object `{lat: number, lon:number}`
+ `range` number
+ `callback(err, data)`
+ returns list of closest stations based on a coordinate and a range


---
### Examples

```js
var Metro = require('wmata-metro-js');
var client = new Metro('api key');
var coord = {
  lat: 38.9059581,
  lon: -77.0416805
}

client.getStationPrediction('A10,A11', {sort: true, suffix: true}, function(err, data) {
  // returns sorted, and suffixed data
});

client.getClosestStations(coord, 1000, function(err, data) {
  // returns closest stations
});

```


