$.get(location.origin + '/api/v1/stats/harga')
  .then(function(res) {
    console.log(res.data)
  })