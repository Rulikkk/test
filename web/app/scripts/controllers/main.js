'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, loops, staticMaps) {
    $scope.allOrders = [];
    $scope.stream = [];
    $scope.staticMap = function(order) {
      return staticMaps.url(order.name, order.geoLat, order.geoLong);
    };

    var checkInterval = 1000, lastN = 3, lastUpdateInterval = 15000, streamOnce = false;

    function pushOrders(data) {
      if (data.length < $scope.allOrders.length) {
        // assume api restart
        $scope.allOrders = [];
      }

      // find only new orders
      var newOrders = data.slice($scope.allOrders.length, data.length);

      // Add new orders to the end of list
      [].push.apply($scope.allOrders, newOrders);

      if ($scope.allOrders.length >= lastN && !streamOnce) {
        getStream();
      }
    }

    function getStream() {
      if ($scope.allOrders.length >= lastN) {
        streamOnce = true;

        // remove old orders
        $scope.stream.splice(0, $scope.stream.length);

        // add new orders, fresh at top
        [].push.apply($scope.stream, $scope.allOrders.slice(-lastN, $scope.allOrders.length).reverse());
      }
    }

    loops.url('http://localhost:3000/orders', pushOrders, checkInterval);
    loops.go(getStream, lastUpdateInterval);
  });
