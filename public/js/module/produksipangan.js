'use strict';

(function() {
    console.log('masuk');
    var produksi = produksi.data;
    console.log(produksi);
    $.get(location.origin + '/api/v1/komoditas/cluster')
        .then(function(response) {
            console.log('masuk')
            console.log(response);

            nv.addGraph(function() {
                var chart = nv.models.scatterChart()
                    .showDistX(true) //showDist, when true, will display those little distribution lines on the axis.
                    .showDistY(true)
                    .transitionDuration(350)
                    .color(d3.scale.category10().range());

                //Configure how the tooltip looks.
                chart.tooltipContent(function(key) {
                    return '<h3>' + key + '</h3>';
                });

                //Axis settings
                chart.xAxis.tickFormat(d3.format('.02f'));
                chart.yAxis.tickFormat(d3.format('.02f'));

                //We want to show shapes other than circles.
                chart.scatter.onlyCircles(false);

                var myData = response;
                d3.select('#chart svg')
                    .datum(myData)
                    .call(chart);

                nv.utils.windowResize(chart.update);

                return chart;
            });
        });
})();
