var api = require('./api')

function Metro(key) {
  if (!key) throw new Error('must provide key');

  this.key = 'api_key=' + key;
  this.url = function(type) {
    return 'http://api.wmata.com/' + type + this.key;
  }

  // Base
  this.getRailLines                 = api.getRailLines;
  this.getRailStations              = api.getRailStations;
  this.getRailStationInfo           = api.getRailStationInfo;
  this.getRailPaths                 = api.getRailPaths;
  this.getRailStationPrediction     = api.getRailStationPrediction;
  this.getRailStationEntrances      = api.getRailStationEntrances;
  this.getRailStationParking        = api.getRailStationParking;
  this.getRailStationTimes          = api.getRailStationTimes;
  this.getRailStationToStationInfo  = api.getRailStationToStationInfo;

  // Extended
  this.getClosestStationsPrediction = api.getClosestStationsPrediction;


}

module.exports = Metro;