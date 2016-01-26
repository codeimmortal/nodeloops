/*!
 * 
 * https://github.com/awesomehimanshu/nodeloops
 *
 * Author:- Himanshu sharma
 * 
 */
(function () {

    var nodeloops = {};
    function noop() {}
   
    // global on the server, window in the browser
   
var root = typeof self === 'object' && self.self === self && self ||
            typeof global === 'object' && global.global === global && global ||
            this;

    if (root != null) {
        previous_async = root.async;
    }
    //
    function only_once(fn) {
        return function() {
            if (fn === null) throw new Error("Callback was already called.");
            fn.apply(this, arguments);
            fn = null;
        };
    }

    function _once(fn) {
        return function() {
            if (fn === null) return;
            fn.apply(this, arguments);
            fn = null;
        };
    }

    //// cross-browser compatiblity functions ////

    function _restParam(func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : +startIndex;
        return function() {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0: return func.call(this, rest);
                case 1: return func.call(this, arguments[0], rest);
            }
         
        };
    }

  var _setImmediate = typeof setImmediate === 'function' && setImmediate;

    var _delay = _setImmediate ? function(fn) {
     
        _setImmediate(fn);
    } : function(fn) {
        setTimeout(fn, 0);
    };

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
        nodeloops.nextTick = process.nextTick;
    } else {
        nodeloops.nextTick = _delay;
    }
    nodeloops.setImmediate = _setImmediate ? _delay : nodeloops.nextTick;


    nodeloops.fastforloops = function (fn, callback) {
        var done = only_once(callback || noop);
        var task = ensureloops(fn);
        function next(err) {
            if (err) {
                return done(err);
            }
            task(next);
        }
        next();
    };

     nodeloops.mediumforloops = function(start, stop,microsecond, callback, done) {
  var task, iterator;
  var current = start;

  iterator = function() {
    if (current >= stop) {
      clearInterval(task);
      if (done) {
        done();
      }
    } else {
      callback(current++);
    }
  }

  task = setInterval(iterator, microsecond);
};
    
    function ensureloops(fn) {
        return _restParam(function (args) {
            var callback = args.pop();
            args.push(function () {
                var innerArgs = arguments;
                if (sync) {
                    nodeloops.setImmediate(function () {
                        callback.apply(null, innerArgs);
                    });
                } else {
                    callback.apply(null, innerArgs);
                }
            });
            var sync = true;
            fn.apply(this, args);
            sync = false;
        });
    }

    nodeloops.ensureloops = ensureloops;

    nodeloops.constant = _restParam(function(values) {
        var args = [null].concat(values);
        return function (callback) {
            return callback.apply(this, args);
        };
    });

 
   //  Node.js
    if (typeof module === 'object' && module.exports) {
        module.exports = nodeloops;
    }
    // AMD / RequireJS
/*    else if (typeof define === 'function' && define.amd) {
        define([], function () {
            return nodeloops;
        });
    }
    // included directly via <script> tag
    else {
        root.nodeloops = nodeloops;
    }*/
     
    

}());

