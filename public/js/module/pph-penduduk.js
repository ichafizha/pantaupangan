'use strict';

(function() {
  $.get(location.origin + '/api/v1/pergerakanpph')
    .then(function(response) {
      console.log('masuk');
      console.log(response);

      var indeks = response.data;
      console.log(indeks);

      var chart;
      nv.addGraph(function() {
        chart = nv.models.scatterChart()
          .showDistX(true)
          .showDistY(true)
          .duration(300)
          .color(d3.scale.category10().range());
        chart.dispatch.on('renderEnd', function() {
          console.log('render complete');
        });
        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        d3.select('svg')
          .datum(nv.log(indeksData()))
          .call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) {
          nv.log('New State:', JSON.stringify(e));
        });
        return chart;
      });

      function indeksData() { //# groups,# points per group
        var data = [],
          shapes = ['circle'],
          random = d3.random.normal();
        for (var i = 0; i < 1; i++) {
          data.push({
            key: 'Group ' + i,
            values: [],
            slope: 0.00000008,
            intercept: 69.8
          });
          for (var j = 0; j < indeks.length; j++) {
            data[i].values.push({
              x: indeks[j].x,
              y: indeks[j].y,
              size: Math.random(),
              shape: shapes[j % shapes.length]
            });
          };
          console.log(data);
        return data;
        };
        
      };
    });
}());