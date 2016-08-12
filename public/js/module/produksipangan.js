'use strict';

(function() {
	$.get(location.origin + '/api/v1/komoditas/cluster')
		.then(function(response) {
			console.log('masuk');
			console.log(response);

			var kamins = response.data;

			// register our custom symbols to nvd3
			// make sure your path is valid given any size because size scales if the chart scales.
			nv.utils.symbolMap.set('thin-x', function(size) {
				size = Math.sqrt(size);
				return 'M' + (-size / 2) + ',' + (-size / 2) +
					'l' + size + ',' + size +
					'm0,' + -(size) +
					'l' + (-size) + ',' + size;
			});
			// create the chart
			var chart;
			nv.addGraph(function() {
				chart = nv.models.scatterChart()
					.showDistX(true)
					.showDistY(true)
					.showLabels(true)
					.useVoronoi(true)
					.color(d3.scale.category10().range())
					.duration(350)
					.interactive(true)
					.clipEdge(true);
				chart.dispatch.on('renderEnd', function() {
					console.log('render complete');
				});
				chart.xAxis.tickFormat(d3.format('.02f'));
				chart.yAxis.tickFormat(d3.format('.02f'));
				d3.select('svg')
					.datum(kaminsData())
					.call(chart);
				chart.tooltip(function () {
					kaminsData();
					var key= data.komoditas;
					return '<h3>' + key + '</h3>';
				});
				nv.utils.windowResize(chart.update);
				chart.dispatch.on('stateChange', function(e) {
					('New State:', JSON.stringify(e));
				});
				return chart;
			});

			function kaminsData() {
				var shape = 'circle';
				var random = d3.random.normal();

				var sortKamins = _.orderBy(kamins, ['kamins.cluster', 'asc']);

				console.log(sortKamins);

				let cluster0 = [];
				let cluster1 = [];
				let cluster2 = [];

				sortKamins.forEach(data => {
					if (data.cluster === 0) cluster0.push({
						x: data.luas,
						y: data.produksi,
						komo: data.komoditas,
						size: Math.round(Math.random() * 100) / 100,
						shape: shape
					})
					if (data.cluster === 1) cluster1.push({
						x: data.luas,
						y: data.produksi,
						komo: data.komoditas,
						size: Math.round(Math.random() * 100) / 100,
						shape: shape
					})
					if (data.cluster === 2) cluster2.push({
						x: data.luas,
						y: data.produksi,
						komo: data.komoditas,
						size: Math.round(Math.random() * 100) / 100,
						shape: shape
					})
				});

				var data = [{
					key: 'Cluster' + 0,
					values: cluster0
				}, {
					key: 'Cluster' + 1,
					values: cluster1
				}, {
					key: 'Cluster' + 2,
					values: cluster2
				}]

				console.log(data);
				return data;


			}

			// function randomData(groups, points) { //# groups,# points per group
			//     // smiley and thin-x are our custom symbols!
			//     var data = [],
			//         shapes = ['thin-x', 'circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
			//         random = d3.random.normal();
			//     for (var i = 0; i < groups; i++) {
			//         data.push({
			//             key: 'Group ' + i,
			//             values: []
			//         });
			//         for (var j = 0; j < points; j++) {
			//             data[i].values.push({
			//                 x: random(),
			//                 y: random(),
			//                 size: Math.round(Math.random() * 100) / 100,
			//                 shape: shapes[j % shapes.length]
			//             });
			//         }
			//     }
			//     return data;
			// }
		});
}());