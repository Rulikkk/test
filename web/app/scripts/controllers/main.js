'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    $scope.allOrders = [];
    $scope.stream = [];
    $scope.staticMap = function(order) {
      var base = 'http://maps.googleapis.com/maps/api/staticmap?',
      label = (order.name[0] || 'o').toUpperCase(),
      opts = {
        size: '300x120',
        sensor: false,
        zoom: 10,
        markers: 'color:red|label:' + label + '|' + order.geoLat + ',' + order.geoLong
      };

      return base + Object.keys(opts).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(opts[k]);
      }).join('&');
    };

    var checkInterval = 1000, lastN = 3, lastUpdateInterval = 5500;

    function getNew() {
      $http.get('http://localhost:3000/orders')
        .success(function(data) {
          pushOrders(data);
          $timeout(getNew, checkInterval);
        })
        .error(function () {
          $timeout(getNew, checkInterval);
        });
    }

    function pushOrders(data) {
      if (data.length < $scope.allOrders.length) {
        // assume api restart
        $scope.allOrders = [];
      }

      // find only new orders
      var newOrders = data.slice($scope.allOrders.length, data.length);

      // Add new orders to the end of list
      [].push.apply($scope.allOrders, newOrders);
    }

    function getStream() {
      if ($scope.allOrders.length >= lastN) {
        // remove old orders
        $scope.stream.splice(0, $scope.stream.length);

        // add new orders, fresh at top
        [].push.apply($scope.stream, $scope.allOrders.slice(-lastN, $scope.allOrders.length).reverse());
      }
      $timeout(getStream, lastUpdateInterval);
    }

    getNew();

    getStream();
  });
