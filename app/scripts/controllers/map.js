'use strict';

angular.module('webApp')
  .controller('MapCtrl', function ($scope) {
    $scope.myMarkers = [];

    $scope.mapOptions = {
      center: new google.maps.LatLng(49, 24),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      disableDefaultUI: true,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true
    };

    $scope.openMarkerInfo = function(marker) {
      if (marker.order) {
        $scope.currentOrder = marker.order;
        $scope.myInfoWindow.open($scope.myMap, marker);
      }
    };

    $scope.$on('newOrders', function() {
      $scope.stream.forEach(function(order) {
        if (order.marker) { return; }
        var marker = new google.maps.Marker({
          map: $scope.myMap,
          position: new google.maps.LatLng(order.geoLat, order.geoLong),
          animation: google.maps.Animation.DROP
        });
        order.marker = marker;
        marker.order = order;
        $scope.myMarkers.push(marker);
      });
    });

    $scope.$on('showOrder', function(event, order) {
      if (order.marker) {
        $scope.openMarkerInfo(order.marker);
        $scope.myMap.panTo(order.marker.getPosition());
        $scope.myMap.setZoom(7);
      }
    });

    $scope.$on('reset', function() {
      $scope.myMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
      $scope.myMarkers = [];
    });
  });
