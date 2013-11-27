'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, loops, staticMaps) {
    $scope.allOrders = [];
    $scope.stream = [];
    $scope.staticMap = function(order) {
      return staticMaps.url(order.name, order.geoLat, order.geoLong);
    };

    var checkInterval = 1000, lastN = 12;

    function pushOrders(data) {
      if (data.length < $scope.allOrders.length) {
        // assume api restart
        $scope.allOrders = [];
      }

      // find only new orders
      var newOrders = data.slice($scope.allOrders.length, data.length);

      // Add new orders to the end of list
      [].push.apply($scope.allOrders, newOrders);

      if (newOrders.length > 0) {
        $scope.$broadcast('newOrders', newOrders);
        newOrders.reverse();
        [].unshift.apply($scope.stream, newOrders);
        $scope.stream.splice(lastN, $scope.stream.length);
      }
    }

    loops.url('http://localhost:3000/orders', pushOrders, checkInterval);
  });
