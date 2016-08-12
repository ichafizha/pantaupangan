'use strict';

var ctx = document.getElementById('stats');
var label = [];
var data = [];

$.get(location.origin + '/api/v1/stats')
  .then(function(res) {
    console.log(res.stats);
    for (var lab in res.stats) {
      console.log(lab);
      label.push(lab);
      data.push(res.stats[lab]);
    }

    console.log(label);
    console.log(data);

    var barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Jumlah data',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          data: data,
        }],
        labels: label,
      },
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
          rectangle: {
            borderWidth: 2,
            borderColor: 'rgb(0, 255, 0)',
            borderSkipped: 'bottom',
          },
        },
        responsive: true,
        legend: false,
        title: {
          display: true,
          text: 'Statistik Data',
        },
      },
    });
  });


// var myBarChart = new Chart(ctx, {
//   type: 'bar',
//   data,
//   options,
// });

// var data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: [
//       'rgba(255, 99, 132, 0.2)',
//       'rgba(54, 162, 235, 0.2)',
//       'rgba(255, 206, 86, 0.2)',
//       'rgba(75, 192, 192, 0.2)',
//       'rgba(153, 102, 255, 0.2)',
//       'rgba(255, 159, 64, 0.2)',
//     ],
//     borderColor: [
//       'rgba(255,99,132,1)',
//       'rgba(54, 162, 235, 1)',
//       'rgba(255, 206, 86, 1)',
//       'rgba(75, 192, 192, 1)',
//       'rgba(153, 102, 255, 1)',
//       'rgba(255, 159, 64, 1)',
//     ],
//     borderWidth: 1,
//     data: [65, 59, 80, 81, 56, 55, 40],
//   }],
// };