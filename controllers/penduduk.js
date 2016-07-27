var Penduduk = require('../models/Penduduk');

exports.penduduk = function(req, res, next) {
  Penduduk.find({}, (err, data) => {
    res.render('admin/penduduk/penduduk', {
      title: 'Penduduk dan PPH',
      penduduks: data,
    });
  });
};

exports.tampilAddPenduduk = function(req, res, next) {
  res.render('admin/penduduk/add', {
    title: 'Tambah Penduduk dan PPH'
  });
};

exports.addPenduduk = function(req, res, next) {
  var data = {
    tahun: req.body.tahun,
    penduduk: req.body.penduduk,
    pph: req.body.pph
  };

  var newPenduduk = new Penduduk(data);

  newPenduduk.save(function(err) {
    if (err) next(err);

    res.redirect('/penduduk');
  });
};

exports.deletePenduduk = function(req, res, next) {
  Penduduk.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) next(err);

    res.redirect('/penduduk');
  });
};

exports.tampilUpdatePenduduk = function(req, res, next) {
  Penduduk.findById(req.params.id, function(err, data) {
    var updateData = {
      tahun: data.tahun.toString(),
      penduduk: data.penduduk.toString(),
      pph: data.pph.toString()
    };

    console.log(updateData);

    res.render('admin/penduduk/add', {
      title: 'Edit Data Penduduk & PPH',
      updates: updateData
    });
  });
};

exports.updatePenduduk = function(req, res, next) {
  var updateData = {
    tahun: req.body.tahun,
    penduduk: req.body.penduduk,
    pph: req.body.pph
  };

  Penduduk.findById(req.params.id, function(err, data) {
    data.update({
      tahun: updateData.tahun,
      penduduk: updateData.penduduk,
      pph: updateData.pph
    }, function(err, data) {
      if (err) next(err);

      res.redirect('/penduduk');
    });
  });
};