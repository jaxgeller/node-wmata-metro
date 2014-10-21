var should = require('chai').should();
var Metro = require('../');
var client = new Metro(process.env.KEY);

var coordinates = {
  lat: 38.9059581,
  lon: -77.0416805
}
var radius = 350;
var limit = 5;

describe('Base Metro api', function() {

  beforeEach(function(done) {
    this.timeout(4000);
    setTimeout(function() {
      return done();
    }, 1000);
  });

  it('#getRailLines', function(done) {
    client.getRailLines(function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('DisplayName', 'EndStationCode', 'InternalDestination1', 'InternalDestination2', 'LineCode', 'StartStationCode')
      return done();
    });
  });

  it('#getRailStations', function(done) {
    client.getRailStations('RD', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('Address', 'Code', 'Lat', 'LineCode1', 'LineCode2', 'LineCode3', 'LineCode4', 'Lon', 'Name', 'StationTogether1', 'StationTogether2');
      return done();
    });
  }); 

  it('#getRailStationInfo', function(done) {
    client.getRailStationInfo('A10', function(err, res) {
      if (err) return done(err);
      res.should.have.keys('Address', 'Code', 'Lat', 'LineCode1', 'LineCode2', 'LineCode3', 'LineCode4', 'Lon', 'Name', 'StationTogether1', 'StationTogether2');
      res.Name.should.be.eql('Medical Center');
      return done();
    });
  });
  
  it('#getRailPaths', function(done) {
    client.getRailPaths('A10','A12', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('DistanceToPrev', 'LineCode', 'SeqNum', 'StationCode', 'StationName');
      res[0].LineCode.should.eql('RD');
      res[0].StationName.should.eql('Medical Center');
      return done();
    });
  });

  it('#getRailStationPrediction', function(done) {
    client.getRailStationPrediction('A10', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('Car', 'Destination', 'DestinationCode', 'DestinationName', 'Group', 'Line', 'LocationCode', 'LocationName', 'Min');
      res[0].Line.should.eql('RD');
      res[0].LocationName.should.eql('Medical Center');
      return done();
    });
  });
  
  it('#getRailStationEntrances', function(done) {
    client.getRailStationEntrances(coordinates, radius, function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('Description', 'ID', 'Lat', 'Lon', 'Name', 'StationCode1', 'StationCode2');
      res[0].ID.should.eql('105');
      return done();
    });
  });
  
  it('#getRailStationParking', function(done) {
    client.getRailStationParking('F06', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('Code', 'Notes', 'AllDayParking', 'ShortTermParking');
      res[0].Code.should.eql('F06')
      return done();
    });
  });
  
  it('#getRailStationTimes', function(done) {
    client.getRailStationTimes('A10', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('Code', 'StationName', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
      res[0].Code.should.eql('A10');
      return done();
    });
  });
  
  it('#getRailStationToStationInfo', function(done) {
    client.getRailStationToStationInfo('A10', 'B05', function(err, res) {
      if (err) return done(err);
      res[0].should.have.keys('CompositeMiles', 'DestinationStation', 'RailFare', 'RailTime', 'SourceStation');
      res[0].SourceStation.should.eql('A10');
      return done();
    });
  });

});



describe('Extended Metro API', function() {
  beforeEach(function(done) {
    this.timeout(4000);
    setTimeout(function() {
      return done();
    }, 1000);
  });

  it('#getClosestStationsPrediction', function(done) {
    this.timeout(8000);
    client.getClosestStationsPrediction(coordinates, radius, limit, function(err, res) {
      if (err) return done(err);
      if (res) {
        res[0].should.have.keys('Car', 'Destination', 'DestinationCode', 'DestinationName', 'Group', 'Line', 'LocationCode', 'LocationName', 'Min');
        return done();
      } 
    });
  });

});