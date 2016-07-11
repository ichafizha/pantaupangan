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
