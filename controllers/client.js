var moment = require('moment');

moment.locale('id');

exports.tampilDataFluktuasiHarga = function(req, res, next) {
    res.render('client/fluktuasiHarga', {
        title: 'Fluktuasi Harga',
        js: 'fluktuasi-harga'
    });
};

exports.tampilDataKomoditas = function(req, res, next) {
    let namaKomoditas = req.params.namaKomoditas;
    console.log(namaKomoditas);

    res.render('client/komoditas', {
        title: 'Fluktuasi Harga',
        js: 'komoditas',
        namaKomoditas: namaKomoditas,
    });
};