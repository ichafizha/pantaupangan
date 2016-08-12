'use strict';

function deleteHarga(id, komoditas, tanggal) {
  console.log(id);
  swal({
    title: 'Anda yakin ingin menghapus komoditas ' + komoditas + ' pada '+ tanggal +' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ya, hapus!',
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
