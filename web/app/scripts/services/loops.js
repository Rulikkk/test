'use strict';

angular.module('webApp')
  .factory('loops', function($http, $timeout) {
    return {
      // starts running function every interval ms
      go: function(fn, interval) {
        function rec() {
          fn();
          $timeout(rec, interval);
        }
        rec();
      },

      // get url every interval ms, call fn when success
      url: function(url, fn, interval) {
        function rec() {
          $http.get(url)
            .success(function(data) {
              fn(data);
              $timeout(rec, interval);
            })
            .error(function() {
              $timeout(rec, interval);
            });
        }
        rec();
      }
    };
  });