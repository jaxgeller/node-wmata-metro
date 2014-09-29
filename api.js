var helpers = require('./helpers');
var async = require('async');

/**
 * get all rail stations
 * @param  {Function} callback - returns err, data
 */
exports.getRailLines = function(done) {
  var route = '/Rail.svc/json/jLines?';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Lines) return done(new Error('no data'));
    return done(null, data.Lines);
  });
}

/**
 * get a specific rail station
 * @param  {String}   id - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailStations = function(id, done) {
  var route = '/Rail.svc/json/jStations?LineCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Stations) return done(new Error('no data'));
    return done(null, data.Stations);
  });
}

/**
 * get a specific rail station's info
 * @param  {String}   id - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailStationInfo = function(id, done) {
  var route = '/Rail.svc/json/jStationInfo?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data) return done(new Error('no data'));
    return done(null, data);
  });
}

/**
 * gets a rail path from one station to another
 * @param  {String}   from - station ID
 * @param  {String}   to - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailPaths = function(from, to, done) {
  var route = '/Rail.svc/json/jPath?FromStationCode='+from+'&ToStationCode='+to+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Path) return done(new Error('no data'));
    return done(null, data.Path);
  });
}

/**
 * gets a prediction for a specific station
 * @param  {String}   id - station ID
 * @param  {Boolean}   sort - bool for sorting the response into specific stations
 * @param  {Function} callback - returns err, data
 */
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

/**
 * gets the station entrances for a specific station
 * @param  {Object}   loc - `{lat: number, lon: number}`
 * @param  {Number}   radius - the radius of how far you want to collect Stations
 * @param  {Function} callback - returns err, data
 */
exports.getRailStationEntrances = function(loc, radius, done) {
  var route = '/rail.svc/json/jStationEntrances?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.Entrances) return done(new Error('no data'));
    return done(null, data.Entrances);
  });
}

/**
 * gets stations parking for a specific station
 * @param  {String}   id - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailStationParking = function(id, done) {
  var route = '/rail.svc/json/jStationParking?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationsParking) return done(new Error('no data'));
    return done(null, data.StationsParking);
  });
}

/**
 * gets operating hours of a speficic station
 * @param  {String}   id - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailStationTimes = function(id, done) {
  var route = '/rail.svc/json/jStationTimes?StationCode='+id+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationTimes) return done(new Error('no data'));
    return done(null, data.StationTimes);
  });
}

/**
 * gets info from one station to another
 * @param  {String}   from - station ID
 * @param  {String}   to - station ID
 * @param  {Function} callback - returns err, data
 */
exports.getRailStationToStationInfo = function(from, to, done) {
  var route = '/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode='+from+'&ToStationCode='+to+'&';
  helpers.get(this.url(route), function(err, data) {
    if (err) return done(err);
    if (!data.StationToStationInfos) return done(new Error('no data'));
    return done(null, data.StationToStationInfos);
  });
}

/**
 * [getClosestPrediction description]
 * @param  {[type]}   loc    [description]
 * @param  {[type]}   radius [description]
 * @param  {[type]}   limit  [description]
 * @param  {Function} done   [description]
 * @return {[type]}          [description]
 */
exports.getClosestPrediction = function(loc, radius, limit, done) {
  var self = this;
  self.getRailStationEntrances(loc, radius, function(err, res) {
    if (err) return done(err);
    else {
      res.slice(0, limit);
      async.map(res, function(stops, cb) {
        self.getRailStationPrediction(stops.StationCode1, false, function(err, data) {
          if (err) return cb(err);
          else return cb(null, data);
        });
      }, function(e, r) {
        if (e) return done(e);
        else return done(null, r);
      });
    }
  });
}