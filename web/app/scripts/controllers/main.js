'use strict';

angular.module('webApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {

    function getNew() {
      $http.get('http://localhost:3000/orders').success(function(data) {

      });
    }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
