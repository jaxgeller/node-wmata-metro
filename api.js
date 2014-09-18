var request = require('request');
var _ = require('lodash');

var self = this;

function sortData(data, opts, done) {
  if (!data.length) return done(new Error('No data'));
  
  var max = data.length;
  var holder = {};

  for (var i = 0; i < max; i++) {
    var item = data[i];
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







exports.get = function(url, done) {
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


exports.getStationPrediction = function(stations, opts, done) {
  var route = this.url('StationPrediction.svc/json/GetPrediction/'+stations + '?');
  this.get(route, function(err, data) {
    if (err) return done(err);
    if (opts.sort) {
      sortData(data.Trains, opts, function(err, data) {
        if (err) return done(err);
        return done(null, data);
      });
    }
    else {
      return done(null, data.Trains);  
    }
  });
}


exports.getClosestStations = function(loc, radius, done) {
  var route = this.url('rail.svc/json/jStationEntrances?lat=' + loc.lat + '&lon=' + loc.lat + '&radius=' + radius + '&');
  this.get(route, function(err, data) {
    if (err) return done(err);
    return done(null, data.Entrances);
  });
}


