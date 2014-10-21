var request = require('request')
var async = require('async');
var geo = require('node-geo-distance');

// Private functions

var _get = function _get(url, done) {
  var opts = {
    url: url,
    timeout: 5000,
    pool: {maxSockets: Infinity}
  }
  
  request(opts, function(err, res, body) {
    if (err)
      return done(err);
    
    else if (res.statusCode === 504 || res.statusCode === 408) {
      return (setTimeout(function() {
        get(url, done);
      }, 2500));
    }
    
    else if (res.statusCode !== 200)
      return done(new Error(body.replace(/<..>/, '').replace(/<...>/,'')));

    else if (res.statusCode === 200 && body) {
      try {
        return done(null, JSON.parse(body));
      } catch(e) {
        return done(e);
      }
    }

    else
      return done(new Error('no response'));

  });
}

// Base Functions

/**
 * Get all rail lines
 * @param  {Function} done - callback(err, res)
 * @return {Array}        - list of lines with codes
 */
exports.getRailLines = function getRailLines(done) {
  var route = this.url('/Rail.svc/json/jLines?');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.Lines);
  });
}

/**
 * For a given line, get all stations
 * @param  {String}   lineCode - the line code, ie: RD or SV
 * @param  {Function} done     - callback(err, res)
 * @return {Array}            - list of stations for a given line
 */
exports.getRailStations = function getRailStations(lineCode, done) {
  var route = this.url('/Rail.svc/json/jStations?LineCode='+lineCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.Stations);
  });
}

/**
 * Get info for a station
 * @param  {String}   stationCode - a station code, ie: A10
 * @param  {Function} done        - callback(err, res)
 * @return {Object}               - object of properties corresponding to station
 */
exports.getRailStationInfo = function getRailStationInfo(stationCode, done) {
  var route = this.url('/Rail.svc/json/jStationInfo?StationCode='+stationCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res);
  });
}

/**
 * Get stations between two different stations
 * @param  {String}   fromStationCode - start station code, ie: A10
 * @param  {String}   toStationCode   - end station code, ie: C03
 * @param  {Function} done            - callback(err, res)
 * @return {Array}                    - list of stations between a start and end station
 */
exports.getRailPaths = function getRailPaths(fromStationCode, toStationCode, done) {
  var route = this.url('/Rail.svc/json/jPath?FromStationCode='+fromStationCode+'&ToStationCode='+toStationCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.Path);
  });
}

/**
 * Get prediction times for a station
 * @param  {String}   stationCodes - station code, ie: A10. Can also include a multiple stations separated by comma, ie:A10,A11,C02. 
 * @param  {Function} done         - callback(err, res)
 * @return {Array}                 - list of train predictions
 */
exports.getRailStationPrediction = function getRailStationPrediction(stationCodes, done) {
  var route = this.url('/StationPrediction.svc/json/GetPrediction/'+stationCodes+'?');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.Trains);
  });
}


/**
 * Get station entrance info via a location
 * @param  {Object}   loc    - object of coordinates, ie: loc.lat, loc.lon
 * @param  {Number}   radius - radius of search location in meters
 * @param  {Function} done   - callback(err, res)
 * @return {Array}           - list of meta info on the stations that are near the loc
 */
exports.getRailStationEntrances = function getRailStationEntrances(loc, radius, done) {
  var route = this.url('/rail.svc/json/jStationEntrances?lat='+loc.lat+'&lon='+loc.lon+'&radius='+radius+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.Entrances);
  });
}


/**
 * Get rail station parking info
 * @param  {String}   stationCode - station code, ie: A10
 * @param  {Function} done        - callback(err, res)
 * @return {Array}                - list of parking info on the station 
 */
exports.getRailStationParking = function getRailStationParking(stationCode, done) {
  var route = this.url('/rail.svc/json/jStationParking?StationCode='+stationCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.StationsParking);
  });
}


/**
 * Get rail station time info
 * @param  {String}   stationCode - station code, ie: A10
 * @param  {Function} done        - callback(err, res)
 * @return {Array}               - list of time info on the station
 */
exports.getRailStationTimes = function getRailStationTimes(stationCode, done) {
  var route = this.url('/rail.svc/json/jStationTimes?StationCode='+stationCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.StationTimes);
  });
}


/**
 * Get rail station to station info
 * @param  {String}   fromStationCode - start station code, ie: A10
 * @param  {String}   toStationCode   - end station code, ie: B05
 * @param  {Function} done            - callback(err, res)
 * @return {Array}                    - list of station to station info on the stations
 */
exports.getRailStationToStationInfo = function getRailStationToStationInfo(fromStationCode, toStationCode, done) {
  var route = this.url('/rail.svc/json/JSrcStationToDstStationInfo?FromStationCode='+fromStationCode+'&ToStationCode='+toStationCode+'&');
  _get(route, function(err, res) {
    if (err)
      return done(err);
    else
      return done(null, res.StationToStationInfos);
  });
}

/**
 * Get the closest stations and their predictions given a location
 * @param  {Object}   loc    - the coordinates for a point to search, loc.lat, loc.lon
 * @param  {Number}   radius - the search radius in meters
 * @param  {Number}   limit  - the number of of stations to return
 * @param  {Function} done   - callback(err, res)
 * @return {Array}           - list of stations closest to your coordinate and their predictions
 */
exports.getClosestStationsPrediction = function getClosestStationsPrediction(loc, radius, limit, done) {
  var self = this;
  
  self.getRailStationEntrances(loc, radius, function(err, res) {
    if (err)
      return done(err);
    else {
      var listOfStations = res.slice(0, limit);
      
      async.map(listOfStations, function(station, cb) {
        
        self.getRailStationPrediction(station.StationCode1, function(err, data) {
          if (err)
            return cb(err);
          else
            return cb(null, data);
        });

      }, function(err, mappedData) {
        if (err)
          return done(err);
        else 
          return done(null, mappedData[0]);
      });   
    }
  });
}



// Extended functions

// exports.getClosestPrediction = function(loc, radius, limit, done) {
//   var self = this;
//   self.getRailStationEntrances(loc, radius, function(err, res) {
//     if (err) return done(err);
//     else {
//       res.slice(0, limit);
//       async.map(res, function(stops, cb) {
//         self.getRailStationPrediction(stops.StationCode1, false, function(err, data) {
//           if (err) return cb(err);
//           else return cb(null, data);
//         });
//       }, function(e, r) {
//         if (e) return done(e);
//         else return done(null, r);
//       });
//     }
//   });
// }