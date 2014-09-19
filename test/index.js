var should = require('chai').should();
var Metro = require('../');
var client = new Metro(process.env.PASSWORD);

var coord1 = {
  lat: 38.9059581,
  lon: -77.0416805
}

describe('Metro api', function() {

  it('should be able to retrieve prediction data', function(done) {
    client.getStationPrediction('A10', {}, function(err, data) {
      if (err) return done(err);
      data.should.be.json;
      data.length.should.be.above(1);
      return done()
    });
  });

  it('should be able to retrieve prediction data and sort it', function(done) {
    client.getStationPrediction('A10', {sort:true}, function(err, data) {
      if (err) return done(err);
      data.should.have.keys('A10');
      data.A10.length.should.be.above(1);
      return done()
    });
  });

  it('should be able to retrieve closest stations', function(done) {
    client.getClosestStations(coord1, 2000, function(err, data) {
      if (err) return done(err);
      return done()
    });
  });

});