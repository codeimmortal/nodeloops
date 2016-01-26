'use strict';

/**
 * Dependencies.
 */

var nodeloops = require('..');

/**
 * Tests.
 */
describe('nodeloops()', function() {
  it('should increment the counter 10 times', function(done) {
    var counter = 0;

    nodeloops.mediumforloops(0, 10,0 function(n) {
      counter++;
    }, function() {
     
      done();
    });
  });

  it('should optionally accept a done callback', function(done) {
    nodeloops.mediumforloops(0, 10,0 function() {
      done();
    });
  });
});
