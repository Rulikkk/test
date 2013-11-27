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

    $scope.$on('newOrders', function(event, newOrders) {
      newOrders.forEach(function(order) {
        $scope.myMarkers.push(new google.maps.Marker({
          map: $scope.myMap,
          position: new google.maps.LatLng(order.geoLat, order.geoLong),
          animation: google.maps.Animation.DROP
        }));
      });
    });

    $scope.$on('reset', function() {
      $scope.myMarkers.forEach(function(marker) {
        marker.setMap(null);
      });
      $scope.myMarkers = [];
    });
  });
