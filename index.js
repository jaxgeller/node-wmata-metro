var request = require('request');

var api = require('./api')
var coord1 = {
  latitude: 38.9059581,
  longitude: -77.0416805
}

function Metro(apikey) {
  var self = this;
  this.key = 'api_key=' + apikey;
  this.baseUrl = 'http://api.wmata.com/'
  this.url = function(type) {
    return self.baseUrl + type + self.key;
  }
  this.get = api.get;
  this.getStationPrediction = api.getStationPrediction;
  this.getClosestStations = api.getClosestStations;
}