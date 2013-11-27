'use strict';

angular.module('webApp')
  .controller('ChartCtrl', function ($scope) {

    function getPieChart() {
      var pie = {};
      pie.type = 'PieChart';
      pie.displayed = false;
      pie.cssStyle = 'width:100%;height:280px';
      pie.data = {
        'cols': [
          {id: 'type', label: 'Type', type: 'string'},
          {id: 'count', label: 'Count', type: 'number'}
        ],
        'rows': []
      };

      pie.options = {
        'displayExactValues': true,
        'chartArea': {'width': '100%', 'height': '80%'},
        'legend': {'position': 'bottom'}
      };

      pie.formatters = {};
      return pie;
    }

    $scope.chart = getPieChart();

    $scope.$on('newOrders', function(event, newOrders) {
      var count = {};

      // count new orders by name
      newOrders.forEach(function(order) {
        count[order.name] = (count[order.name] || 0) + 1;
      });

      // add existing
      $scope.chart.data.rows.forEach(function(row) {
        var name = row.c[0].v;
        if (count[name]) {
          row.c[1].v += count[name];
          delete count[name];
        }
      });

      // add remaining
      for (var name in count) {
        $scope.chart.data.rows.push({
          c: [
            {v: name},
            {v: count[name]}
          ]
        });
      }
    });

    $scope.$on('reset', function() {
      $scope.chart.data.rows = [];
    });
  });
