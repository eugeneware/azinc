function series() {
  var work = [].slice.call(arguments)
    , last = work.pop()
    , results = [];

  if (work.length && work[0] instanceof Array) {
    work = work[0];
  }

  function next() {
    var job = work.shift();
    if (job) {
      job(function (err, result) {
        results.push(result);
        if (err) {
          return last(err, results);
        }
        next();
      });
    } else {
      last(null, results);
    }
  };

  next();
};

function parallel() {
  var work = [].slice.call(arguments)
    , last = work.pop()
    , results = [];

  if (work.length && work[0] instanceof Array) {
    work = work[0];
  }

  var n = work.length;

  work.forEach(function (job, i) {
    job(function (err, result) {
      results[i] = result;

      if (err) {
        last(err, results);
        last = function() {}
      } else if (--n === 0 || err) {
        return last(err, results);
      }
    });
  });
}

module.exports = {
  series: series
, parallel: parallel
};
