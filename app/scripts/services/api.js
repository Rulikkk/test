'use strict';

angular.module('webApp')
  .factory('api', function($http, $timeout) {
    var ordersUrl = '/api/orders',
      resetUrl = '/api/reset';
    return {
      /**
       * Get orders every interval ms. Call fn on success.
       * @param fn
       * @param interval
       */
      loopOrders: function(fn, interval) {
        function rec() {
          $http.get(ordersUrl)
            .success(function(data) {
              fn(data);
              $timeout(rec, interval);
            })
            .error(function() {
              $timeout(rec, interval);
            });
        }
        rec();
      },

      /**
       * Tell api to start over.
       */
      reset: function() {
        $http.post(resetUrl);
      }
    };
  });