'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, api) {
    $scope.allOrders = [];
    $scope.stream = [];
    $scope.reset = function() {
      $scope.allOrders = [];
      $scope.stream = [];
      $scope.$broadcast('reset');
      api.reset();
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

    api.loopOrders(pushOrders, checkInterval);
  });
