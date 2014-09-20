var request = require('request');
var _ = require('lodash');

function suffix(item) {
  if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) > 1) return ' mins';
  if (typeof parseInt(item.Min) === 'number' && parseInt(item.Min) <= 1) return ' min';
}

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
        minSuffix = suffix(item);
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
  var route = this.url('rail.svc/json/jStationEntrances?lat=' + loc.lat + '&lon=' + loc.lon + '&radius=' + radius + '&');
  this.get(route, function(err, data) {
    if (err) return done(err);
    return done(null, data.Entrances);
  });
}




// http://api.wmata.com/Rail.svc/json/jLines?api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailLines = function(done) {
  var route = '/Rail.svc/json/jLines?';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/Rail.svc/json/jStations?LineCode=RD&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStations = function(id, done) {
  var route = '/Rail.svc/json/jStations?LineCode=RD&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/Rail.svc/json/jStationInfo?StationCode=A10&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationInfo = function(id, done) {
  var route = '/Rail.svc/json/jStationInfo?StationCode=A10&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/Rail.svc/json/jPath?FromStationCode=A10&ToStationCode=A12&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailPaths = function(from, to, done) {
  var route = '/Rail.svc/json/jPath?FromStationCode=A10&ToStationCode=A12&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/StationPrediction.svc/json/GetPrediction/A10?api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationPrediction = function(id) {
  var route = '/StationPrediction.svc/json/GetPrediction/A10?';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/rail.svc/json/jStationEntrances?lat=38.9059581&lon=-77.0416805&radius=300&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationEntrances = function(loc, radius, done) {
  var route = '/rail.svc/json/jStationEntrances?lat=38.9059581&lon=-77.0416805&radius=300&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/rail.svc/json/jStationParking?StationCode=F06&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationParking = function(id, done) {
  var route = '/rail.svc/json/jStationParking?StationCode=F06&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/rail.svc/json/jStationTimes?StationCode=A10&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationTimes = function(id, done) {
  var route = '/rail.svc/json/jStationTimes?StationCode=A10&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}

// http://api.wmata.com/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode=A10&ToStationCode=B05&api_key=n7ch87y8fapve2g8dukccnbv
exports.getRailStationToStationInfo = function(from, to, done) {
  var route = '/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode=A10&ToStationCode=B05&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
}





