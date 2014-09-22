var request = require('request');
var _ = require('lodash');

function suffix(item) {
  if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) > 1) return ' mins';
  if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) <= 1) return ' min';
  else return '';
}

function assembleData(item) {
  return {
    Car: item.Car,
    Destination: item.Destination,
    DestinationCode: item.DestinationCode,
    DestinationName: item.DestinationName,
    Group: item.Group,
    Line: item.Line,
    LocationCode: item.LocationCode,
    LocationName: item.LocationName,
    Min: item.Min + suffix(item)
  }
}



exports.sortData = function(data, done) {
  if (!data.length) return done(new Error('No data'));
  
  var max = data.length;
  var holder = {};

  for (var i = 0; i < max; i++) {
    var item = data[i];
    if (!_.isArray(holder[item.LocationCode])) holder[item.LocationCode] = [];  
    if (item.LocationCode) {
      holder[item.LocationCode].push(assembleData(item));
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