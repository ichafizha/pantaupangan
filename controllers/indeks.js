var Indeks = require('../models/Indeks');

exports.indeks = function (req, res, next) {
  Indeks.find({}, (err, data) => {
    res.render('admin/indeks/indeks', {
      title: 'Indeks dan Inflasi',
      indexes: data,
    });
  });
};

exports.tampilAddIndeks =function (req, res, next) {
  res.render('admin/indeks/add', {
    title: 'Tambah Indeks dan Inflasi'
  });
};

exports.addIndeks = function(req, res, next){
  var data = {
    bulan: req.body.bulan,
    indeks: req.body.indeks,
    inflasi: req.body.inflasi
  };

  var newIndeks = new Indeks(data);

  newIndeks.save(function(err){
    if(err) next(err);

    res.redirect('/indeks');
  });
};

exports.deleteIndeks = function (req, res, next) {
  Indeks.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) next(err);

    res.redirect('/indeks');
  });
};

exports.tampilUpdateIndeks = function (req, res, next) {
  Indeks.findById(req.params.id, function(err, data) {
    var updateData= {
      bulan: data.bulan.toDateString(),
      indeks: data.indeks.toString(),
      inflasi: data.inflasi.toString()
    };

    res.render('admin/indeks/add', {
      title: 'Edit Data Indeks',
      updates: updateData
    });
  });
};

exports.updateIndeks = function (req, res, next) {
  var updateData= {
    bulan: req.body.bulan,
    indeks: req.body.indeks,
    inflasi: req.body.inflasi
  };

  Indeks.findById(req.params.id, function (err, data) {
    data.update({
      bulan: updateData.bulan,
      indeks: updateData.indeks,
      inflasi: updateData.inflasi
    }, function (err, data ) {
      if(err) next(err);

      res.redirect('/indeks');
    });
  });
};
