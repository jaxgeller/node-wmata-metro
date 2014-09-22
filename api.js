var helpers = require('./helpers');



exports.getRailLines = function(done) {
  var route = '/Rail.svc/json/jLines?';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Lines) return done(new Error('no data'));
    return done(null, data.Lines);
  });
}


exports.getRailStations = function(id, done) {
  var route = '/Rail.svc/json/jStations?LineCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Stations) return done(new Error('no data'));
    return done(null, data.Stations);
  });
}


exports.getRailStationInfo = function(id, done) {
  var route = '/Rail.svc/json/jStationInfo?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data) return done(new Error('no data'));
    return done(null, data);
  });
}


exports.getRailPaths = function(from, to, done) {
  var route = '/Rail.svc/json/jPath?FromStationCode='+from+'&ToStationCode='+to+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Path) return done(new Error('no data'));
    return done(null, data.Path);
  });
}


exports.getRailStationPrediction = function(id, sort, done) {
  var route = '/StationPrediction.svc/json/GetPrediction/'+id+'?';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Trains) return done(new Error('no data'));
    if (sort) {
      helpers.sortData(data.Trains, function(err, data) {
        if (err) return done(err);
        return done(null, data);
      });
    }
    else {
      return done(null, data.Trains);  
    }
  });
}


exports.getRailStationEntrances = function(loc, radius, done) {
  var route = '/rail.svc/json/jStationEntrances?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Entrances) return done(new Error('no data'));
    return done(null, data.Entrances);
  });
}


exports.getRailStationParking = function(id, done) {
  var route = '/rail.svc/json/jStationParking?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationsParking) return done(new Error('no data'));
    return done(null, data.StationsParking);
  });
}


exports.getRailStationTimes = function(id, done) {
  var route = '/rail.svc/json/jStationTimes?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationTimes) return done(new Error('no data'));
    return done(null, data.StationTimes);
  });
}


exports.getRailStationToStationInfo = function(from, to, done) {
  var route = '/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode='+from+'&ToStationCode='+to+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationToStationInfos) return done(new Error('no data'));
    return done(null, data.StationToStationInfos);
  });
}