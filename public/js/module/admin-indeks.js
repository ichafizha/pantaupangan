'use strict';

function deleteIndeks(id, indeks, bulan) {
  console.log(id);
  swal({
    title: 'Anda yakin ingin menghapus indeks ' + indeks + ' pada '+ bulan +' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ya, hapus!',
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }, function () {
    $.ajax({
      url: location.origin + '/indeks/' + id,
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
