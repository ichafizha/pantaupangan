$(function() {
  $.ajax(location.origin + '/api/admin')
    .then((data, status) => {
      console.log(data);
      console.log(status);
    })
});

