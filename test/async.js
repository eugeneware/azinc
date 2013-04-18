var should = require('should');
var azinc = require('../index')
  , series = azinc.series
  , parallel = azinc.parallel;

describe('async', function () {
  describe('series', function () {
    it('should be able to handle multiple results', function (done) {
      series(
        function (cb) {
          cb(null, 'a');
        }
      , function (cb) {
          cb(null, 'b');
        }
      , function (err, results) {
          should.not.exist(err);
          results.should.eql['a', 'b'];

          done();
        }
      );
    });

    it('should be able to handle errors', function (done) {
      series(
        function (cb) {
          cb(new Error('oh noes'), 'a');
        }
      , function (cb) {
          cb(null, 'b');
        }
      , function (err, results) {
          should.exist(err);
          err.message.should.equal('oh noes');
          results.should.eql['a', 'b'];

          done();
        }
      );
    });

    it('should be able to handle function arrays', function (done) {
      series(
        [
          function (cb) {
            cb(new Error('oh noes'), 'c');
          }
        , function (cb) {
            cb(null, 'd');
          }
        ]
      , function (err, results) {
          should.exist(err);
          err.message.should.equal('oh noes');
          results.should.eql['c', 'd'];

          done();
        }
      );
    });
  });

  describe('parallel', function () {
    it('should be able to handle multiple results', function (done) {
      parallel(
        function (cb) {
          setTimeout(function () {
            cb(null, 'x');
          }, 5);
        }
      , function (cb) {
          cb(null, 'y');
        }
      , function (err, results) {
          should.not.exist(err);
          results.should.eql(['x', 'y']);

          done();
        }
      );
    });
  });
});
