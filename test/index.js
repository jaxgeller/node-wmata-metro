var should = require('chai').should();
var Metro = require('../');
var client = new Metro(process.env.PASSWORD);

var coord1 = {
  lat: 38.9059581,
  lon: -77.0416805
}

describe('Metro api', function() {

  it('.getRailLines', function(done) {
    client.getRailLines(function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res.length.should.be.above(3);
      res[0].should.have.keys('DisplayName','EndStationCode', 'InternalDestination1', 'InternalDestination2', 'LineCode', 'StartStationCode');
      return done();
    });
  });

  it('.getRailStations', function(done) {
    client.getRailStations('RD', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res.length.should.be.above(3);
      res[0].should.have.keys('Address', 'Code', 'Lat', 'LineCode1', 'LineCode2', 'LineCode3', 'LineCode4', 'Lon', 'Name', 'StationTogether1', 'StationTogether2');
      return done();
    });
  }); 

  it('.getRailStationInfo should', function(done) {
    client.getRailStationInfo('A10', function(err, res) {
      if (err) return done(err);
      res.should.be.an.object;
      res.should.have.keys('Address', 'Code', 'Lat', 'LineCode1', 'LineCode2', 'LineCode3', 'LineCode4', 'Lon', 'Name', 'StationTogether1', 'StationTogether2');
      return done();
    });
  });
  
  it('.getRailPaths should', function(done) {
    client.getRailPaths('A10','A12', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('DistanceToPrev', 'LineCode', 'SeqNum', 'StationCode', 'StationName');
      return done();
    });
  });

  it('.getRailStationPrediction should', function(done) {
    client.getRailStationPrediction('A10', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('Car', 'Destination', 'DestinationCode', 'DestinationName', 'Group', 'Line', 'LocationCode', 'LocationName', 'Min');
      return done();
    });
  });
  
  it('.getRailStationEntrances should', function(done) {
    client.getRailStationEntrances(coord1, 350, function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('Description', 'ID', 'Lat', 'Lon', 'Name', 'StationCode1', 'StationCode2');
      return done();
    });
  });
  
  it('.getRailStationParking should', function(done) {
    client.getRailStationParking('F06', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('Code', 'Notes', 'AllDayParking', 'ShortTermParking');
      return done();
    });
  });
  
  it('.getRailStationTimes should', function(done) {
    client.getRailStationTimes('A10', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('Code', 'StationName', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
      return done();
    });
  });
  
  it('.getRailStationToStationInfo should', function(done) {
    client.getRailStationToStationInfo('A10', 'B05', function(err, res) {
      if (err) return done(err);
      res.should.be.an.array;
      res[0].should.have.keys('CompositeMiles', 'DestinationStation', 'RailFare', 'RailTime', 'SourceStation');
      return done();
    });
  });

});