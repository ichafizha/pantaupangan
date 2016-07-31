'use strict';

(function() {

  var namaKomoditas = escape($('#nama-komoditas').val())

  $.get(location.origin + '/api/v1/harga?komoditas=' + namaKomoditas)
    .then(function(response) {
      console.log('masuk')
      console.log(response);

      var harga = response.data;
      harga.map((data, i) => {
        harga[i].tanggal = new Date(data.tanggal);
        harga[i].rTanggal = moment(new Date(data.tanggal)).format('DD/MM/YY')
      })

      var sortedHarga = _.orderBy(harga, ['rTanggal', 'asc']);
      var labelHarga = [];
      var labelTanggal = [];

      sortedHarga.map(harga => {
        labelHarga.push(harga.harga);
        labelTanggal.push(harga.rTanggal);
      });


      var ctx = $("#myChart");

      var data = {
        labels: labelTanggal,
        datasets: [{
          label: $('#nama-komoditas').val(),
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: labelHarga,
          spanGaps: false,
        }]
      };

      var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
      });



    })

}())