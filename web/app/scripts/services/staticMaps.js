'use strict';

angular.module('webApp')
  .factory('staticMaps', function () {

    var base = 'http://maps.googleapis.com/maps/api/staticmap?';

    return {
      // build static map url
      url: function (label, lat, lon) {
        var l = (label || 'O')[0].toUpperCase(),
        opts = {
          size: '300x120',
          sensor: false,
          zoom: 10,
          label: l,
          markers: 'color:red|label:' + label + '|' + lat + ',' + lon
        };
        return base + Object.keys(opts).map(function(k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(opts[k]);
        }).join('&');
      }
    };
  });
