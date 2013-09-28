# azinc

A simple control-flow library for series and parallel operations.

[![build status](https://secure.travis-ci.org/eugeneware/azinc.png)](http://travis-ci.org/eugeneware/azinc)

## Usage

Install via npm:

``` bash
$ npm install azinc
```

## Example Usage

### azinc.series([cb1, cb2, cb3...,] complete)

Takes a list of async operations, wit the l

``` js
var series = require('azinc').series;
series(
  function (cb) {
    cb(null, 'a');
  }
, function (cb) {
    cb(null, 'b');
  }
, function (err, results) {
    // results -> ['a', 'b']
  }
);
```

### azinc.series([async function array] complete)

``` js
var series = require('azinc').series;
series(
  [
    function (cb) {
      cb(null, 'c');
    }
  , function (cb) {
      cb(null, 'd');
    }
  ]
, function (err, results) {
    // results -> ['c', 'd']
  }
);
```

### azinc.parallel([cb1, cb2, cb3...,] complete)

``` js
var parallel = require('azinc').parallel;
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
  // results -> ['x', 'y'];
  }
);
```

### azinc.parallel([async function array] complete)

``` js
var parallel = require('azinc').parallel;
parallel(
  [
    function (cb) {
      setTimeout(function () {
        cb(null, 'x');
      }, 5);
    }
  , function (cb) {
      cb(null, 'y');
    }
  ]
, function (err, results) {
  // results -> ['x', 'y'];
  }
);
```

## License

Copyright (c) 2013, Eugene Ware
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. Neither the name of Eugene Ware nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY EUGENE WARE ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL EUGENE WARE BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
