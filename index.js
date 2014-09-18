var request = require('request');
var api = require('./api')

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

module.exports = Metro;