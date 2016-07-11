var Harga = require('../models/Harga');

exports.harga = function (req, res, next) {
  Harga.find({}, (err, data) => {
    res.render('admin/harga/harga', {
      title: 'Harga',
      comodities: data,
    });
  });
};

exports.tampilAddHarga = function (req, res, next) {
  res.render('admin/harga/add', {
    title: 'Tambah Harga Komoditas'
  });
};

exports.addHarga = function (req, res, next) {
  var data ={
    tanggal : req.body.tanggal,
    komoditas : req.body.komoditas,
    harga : req.body.harga
  };

  var newHarga = new Harga(data);

  newHarga.save(function (err) {
    if(err) next(err);

    res.redirect('/harga');
  });

};
