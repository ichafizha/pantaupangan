var Harga = require('../models/Harga');
var moment = require('moment');

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
    title: 'Tambah Harga Komoditas',
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

exports.deleteHarga = function (req, res, next) {
  Harga.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) next(err);

    res.redirect('/harga');
  });
};

exports.tampilUpdateHarga = function (req, res, next) {
  Harga.findById(req.params.id, function(err, data) {
    var updateData= {
      tanggal: moment(data.tanggal).format('YYYY-MM-DD'),
      komoditas: data.komoditas.toString(),
      harga: data.harga.toString()
    };

    console.log(updateData);

    res.render('admin/harga/add', {
      title: 'Edit Data Harga',
      updates: updateData
    });
  });
};

exports.updateHarga = function (req, res, next) {
  var updateData= {
    tanggal: req.body.tanggal,
    komoditas: req.body.komoditas,
    harga: req.body.harga
  };

  Harga.findById(req.params.id, function (err, data) {
    data.update({
      tanggal: updateData.tanggal,
      komoditas: updateData.komoditas,
      harga: updateData.harga
    }, function (err, data ) {
      if(err) next(err);

      res.redirect('/harga');
    });
  });
};
