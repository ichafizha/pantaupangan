var Indeks = require('../models/Indeks');
var moment = require('moment');

moment.locale('id');

exports.indeks = function(req, res, next) {
  let dataIndeks = [];
  Indeks.find({}, (err, data) => {
    data.map((indeks, i) => {
      dataIndeks.push({
        _id: indeks._id,
        bulan: moment(indeks.bulan).format('MMMM YYYY'),
        indeks: indeks.indeks,
        inflasi: indeks.inflasi
      });
    });
    console.log(dataIndeks);
    res.render('admin/indeks/indeks', {
      title: 'Indeks dan Inflasi',
      indexes: dataIndeks,
    });
  });
};

exports.tampilAddIndeks = function(req, res, next) {
  res.render('admin/indeks/add', {
    title: 'Tambah Indeks dan Inflasi'
  });
};

exports.addIndeks = function(req, res, next) {
  var data = {
    bulan: req.body.bulan,
    indeks: req.body.indeks,
    inflasi: req.body.inflasi
  };

  var newIndeks = new Indeks(data);

  newIndeks.save(function(err) {
    if (err) next(err);

    res.redirect('/indeks');
  });
};

exports.deleteIndeks = function(req, res, next) {
  Indeks.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) next(err);

    res.redirect('/indeks');
  });
};

exports.tampilUpdateIndeks = function(req, res, next) {
  Indeks.findById(req.params.id, function(err, data) {
    var updateData = {
      bulan: moment(data.bulan).format('YYYY-MM'),
      indeks: data.indeks.toString(),
      inflasi: data.inflasi.toString()
    };

    res.render('admin/indeks/add', {
      title: 'Edit Data Indeks',
      updates: updateData
    });
  });
};

exports.updateIndeks = function(req, res, next) {
  var updateData = {
    bulan: req.body.bulan,
    indeks: req.body.indeks,
    inflasi: req.body.inflasi
  };

  Indeks.findById(req.params.id, function(err, data) {
    data.update({
      bulan: updateData.bulan,
      indeks: updateData.indeks,
      inflasi: updateData.inflasi
    }, function(err, data) {
      if (err) next(err);

      res.redirect('/indeks');
    });
  });
};