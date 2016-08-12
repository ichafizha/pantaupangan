'use strict';

function deleteHarga(id, komoditas, tanggal) {
  console.log(id);
  swal({
    title: 'Are you sure wanna delete user komoditas ' + komoditas + ' with date '+ tanggal +' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }, function () {
    $.ajax({
      url: location.origin + '/harga/' + id,
      method: 'delete',
    }).then(function (response) {
      console.log(response);
      swal('Deleted!',
      response.message,
      'success');
      document.querySelector('.id-' + id).remove();
    });
  });
}
