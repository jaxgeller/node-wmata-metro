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



function get(url, done) {
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

















exports.getRailLines = function(done) {
  var route = '/Rail.svc/json/jLines?';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Lines) return done(new Error('no data'));
    return done(null, data.Lines);
  });
}


exports.getRailStations = function(id, done) {
  var route = '/Rail.svc/json/jStations?LineCode='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Stations) return done(new Error('no data'));
    return done(null, data.Stations);
  });
}


exports.getRailStationInfo = function(id, done) {
  var route = '/Rail.svc/json/jStationInfo?StationCode='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data) return done(new Error('no data'));
    return done(null, data);
  });
}


exports.getRailPaths = function(from, to, done) {
  var route = '/Rail.svc/json/jPath?FromStationCode='+from+'&ToStationCode='+to+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Path) return done(new Error('no data'));
    return done(null, data.Path);
  });
}


exports.getRailStationPrediction = function(id, done) {
  var route = '/StationPrediction.svc/json/GetPrediction/'+id+'?';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Trains) return done(new Error('no data'));
    return done(null, data.Trains);
  });
}


exports.getRailStationEntrances = function(loc, radius, done) {
  var route = '/rail.svc/json/jStationEntrances?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Entrances) return done(new Error('no data'));
    return done(null, data.Entrances);
  });
}


exports.getRailStationParking = function(id, done) {
  var route = '/rail.svc/json/jStationParking?StationCode='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationsParking) return done(new Error('no data'));
    return done(null, data.StationsParking);
  });
}


exports.getRailStationTimes = function(id, done) {
  var route = '/rail.svc/json/jStationTimes?StationCode='+id+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationTimes) return done(new Error('no data'));
    return done(null, data.StationTimes);
  });
}


exports.getRailStationToStationInfo = function(from, to, done) {
  var route = '/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode='+from+'&ToStationCode='+to+'&';
  get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationToStationInfos) return done(new Error('no data'));
    return done(null, data.StationToStationInfos);
  });
}





