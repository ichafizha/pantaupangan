$(function() {
  $.ajax(location.origin + '/api/client')
    .then((data, status) => {
      console.log(data);
      console.log(status);
    })
});
