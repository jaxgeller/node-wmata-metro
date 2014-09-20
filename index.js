var api = require('./api')

function Metro(apikey) {
  this.key = 'api_key=' + apikey;
  this.baseUrl = 'http://api.wmata.com/'
  this.url = function(type) {
    return this.baseUrl + type + this.key;
  }
  this.get = api.get;
  this.getStationPrediction = api.getStationPrediction;
  this.getClosestStations = api.getClosestStations;
}

module.exports = Metro;