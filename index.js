var api = require('./api')

function Metro(apikey) {
  this.key = 'api_key=' + apikey;
  this.baseUrl = 'http://api.wmata.com/'
  this.url = function(type) {
    return this.baseUrl + type + this.key;
  }

  this.getRailLines = api.getRailLines;
  this.getRailStations = api.getRailStations;
  this.getRailStationInfo = api.getRailStationInfo;
  this.getRailPaths = api.getRailPaths;
  this.getRailStationPrediction = api.getRailStationPrediction;
  this.getRailStationEntrances = api.getRailStationEntrances;
  this.getRailStationParking = api.getRailStationParking;
  this.getRailStationTimes = api.getRailStationTimes;
  this.getRailStationToStationInfo = api.getRailStationToStationInfo;
  this.getClosestPrediction = api.getClosestPrediction;
}

module.exports = Metro;