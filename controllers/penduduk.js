var Penduduk = require('../models/Penduduk');

exports.penduduk = function (req, res, next) {
  Penduduk.find({}, (err, data) => {
    res.render('admin/penduduk/penduduk', {
      title: 'Penduduk dan PPH',
      penduduks: data,
    });
  });
};

exports.tampilAddPenduduk =function (req, res, next) {
  res.render('admin/penduduk/add', {
    title: 'Tambah Penduduk dan PPH'
  });
};

exports.addPenduduk = function(req, res, next){
  var data = {
    tahun: req.body.tahun,
    penduduk: req.body.penduduk,
    pph: req.body.pph
  };

  var newPenduduk = new Penduduk(data);

  newPenduduk.save(function(err){
    if(err) next(err);

    res.redirect('/penduduk');
  });
};
