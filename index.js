var request = require('request');
var geo = require('node-geo-distance');
var _ = require('lodash');

// var api = require('./api')
var coord1 = {
  latitude: 38.9059581,
  longitude: -77.0416805
}

function Metro(apikey) {
  var self = this;
  
  self.key = 'api_key=' + apikey;
  self.baseUrl = 'http://api.wmata.com/'
  self.url = function(type) {
    return self.baseUrl + type + self.key;
  }

  self.get = function(url, done) {
    request(url, function(err, res, body) {
      if (err) return done(err);
      if (res.statusCode !== 200) return done(new Error('Returned: ' + res.statusCode));
      if (body) {
        try {
          return done(null, JSON.parse(body));
        } catch (e) {
          return done(err);
        }
      }
    });
  }


  self.getStationPrediction = function(stations, opts, done) {
    opts = opts || {};
    var route = self.url('StationPrediction.svc/json/GetPrediction/'+stations + '?');
    
    self.get(route, function(err, data) {
      if (err) return done(err);
      var holder = {};
      var max = data.Trains.length;
      
      if (opts.sort) {
        for (var i=0; i< max; i++) {
          var item = data.Trains[i];
          if (!_.isArray(holder[item.LocationCode])) holder[item.LocationCode] = [];  
          if (item.LocationCode) {
            var minSuffix = '';   
            if (opts.suffix) {
              if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) > 1) minSuffix = ' mins';
              if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) <= 1) minSuffix = ' min';
            }
            holder[item.LocationCode].push({
              car: item.Car,
              group: item.Group,
              min: item.Min + minSuffix,
              destName: item.DestinationName,
              destCode: item.DestinationCode,
              locName: item.LocationName,
              locCode: item.LocationCode,
              line: item.Line
            });
          }
        }
        return done(null, holder);
      }
      return done(null, data.Trains);
    });
  }

  self.getClosestStations = function(loc, radius, limit, done){
    var route = self.url('rail.svc/json/jStationEntrances?lat=' + loc.lat + '&lon=' + loc.lat + '&radius=' + radius + '&');
    self.get(route, function(err, data) {
      if (err) return done(err);
      return done(null, data.Entrances);
    });
  }


}


var a = new Metro('kfgpmgvfgacx98de9q3xazww')

a.getStationPrediction('A11', {}, function(err, res) {
  console.log(res)
});