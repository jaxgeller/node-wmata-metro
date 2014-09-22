# wmata-metro.js

[![Build Status](https://travis-ci.org/jacksongeller/wmata-metro.js.svg)](https://travis-ci.org/jacksongeller/wmata-metro.js)

# Install
`$ npm install wmata-metro-js --save`


---
# Get started

1. Grab your metro API key
2. Init the client

```js 

var Metro = require('metro');
var client = new Metro('api key here');
```

---
# Examples

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

---
# API

## getRailLines(callback)

get all rail stations

### Params: 

* **Function** *callback* - returns err, data

## getRailStations(id, callback)

get a specific rail station

### Params: 

* **String** *id* - station ID
* **Function** *callback* - returns err, data

## getRailStationInfo(id, callback)

get a specific rail station's info

### Params: 

* **String** *id* - station ID
* **Function** *callback* - returns err, data

## getRailPaths(from, to, callback)

gets a rail path from one station to another

### Params: 

* **String** *from* - station ID
* **String** *to* - station ID
* **Function** *callback* - returns err, data

## getRailStationPrediction(id, sort, callback)

gets a prediction for a specific station

### Params: 

* **String** *id* - station ID
* **Boolean** *sort* - bool for sorting the response into specific stations
* **Function** *callback* - returns err, data

## getRailStationEntrances(loc, radius, callback)

gets the station entrances for a specific station

### Params: 

* **Object** *loc* - `{lat: number, lon: number}`
* **Number** *radius* - the radius of how far you want to collect Stations
* **Function** *callback* - returns err, data

## getRailStationParking(id, callback)

gets stations parking for a specific station

### Params: 

* **String** *id* - station ID
* **Function** *callback* - returns err, data

## getRailStationTimes(id, callback)

gets operating hours of a speficic station

### Params: 

* **String** *id* - station ID
* **Function** *callback* - returns err, data

## getRailStationToStationInfo(from, to, callback)

gets info from one station to another

### Params: 

* **String** *from* - station ID
* **String** *to* - station ID
* **Function** *callback* - returns err, data