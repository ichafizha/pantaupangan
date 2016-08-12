'use strict';

function deletePenduduk(id, penduduk, tahun) {
  console.log(id);
  swal({
    title: 'Anda yakin ingin menghapus penduduk ' + penduduk + ' pada tahun '+ tahun +' ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Ya, hapus!',
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }, function () {
    $.ajax({
      url: location.origin + '/penduduk/' + id,
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
