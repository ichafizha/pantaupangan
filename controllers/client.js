var moment = require('moment');

moment.locale('id');

exports.tampilDataFluktuasiHarga = function(req, res, next) {
    res.render('client/fluktuasiHarga', {
        title: 'Fluktuasi Harga'
    });
};