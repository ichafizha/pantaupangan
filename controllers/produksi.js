var Produksi = require('../models/Produksi');
const kmeans = require('node-kmeans');

exports.produksi = function (req, res, next) {
  Produksi.find({}, (err, data) => {
    res.render('admin/produksi/produksi', {
      title: 'Produksi Pangan',
      productions: data,
    });
  });
};

exports.tampilAddProduksi = function (req, res, next) {
  res.render('admin/produksi/add', {
    title: 'Tambah Produksi Pangan'
  });
};

exports.addProduksi = function (req, res, next) {
  var data= {
    tahun: req.body.tahun,
    komoditas: req.body.komoditas,
    luas: req.body.luas,
    produksi: req.body.produksi
  };

  var newProduksi = new Produksi(data);

  newProduksi.save(function (err) {
    if(err) next(err);
    console.log('masuk');
    res.redirect('/produksi');
  });
};

exports.deleteProduksi = function (req, res, next) {
  Produksi.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) next(err);

    res.redirect('/produksi');
  });
};

exports.tampilUpdateProduksi = function (req, res, next) {
  Produksi.findById(req.params.id, function(err, data) {
    var updateData= {
      tahun: data.tahun.toString(),
      komoditas: data.komoditas.toString(),
      luas: data.luas.toString(),
      produksi: data.produksi.toString()
    };

    res.render('admin/produksi/add', {
      title: 'Edit Data Produksi',
      updates: updateData
    });
  });
};

exports.updateProduksi = function (req, res, next) {
  var updateData= {
    tahun: req.body.tahun,
    komoditas: req.body.komoditas,
    luas: req.body.luas,
    produksi: req.body.produksi
  };

  Produksi.findById(req.params.id, function (err, data) {
    data.update({
      tahun: updateData.tahun,
      komoditas: updateData.komoditas,
      luas: updateData.luas,
      produksi: updateData.produksi
    }, function (err, data ) {
      if(err) next(err);

      res.redirect('/produksi');
    });
  });
};

exports.clusterKomoditas = function(req, res, next) {
  Produksi.find({}, (err, data) => {
    data:data;

    let vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
      vectors[i] = [ data[i]['luas'] , data[i]['produksi']];
    };

    kmeans.clusterize(vectors, {k: 3}, (err,res) => {
      if (err) console.error(err);
      else console.log('%o',res);
    });

    res.map(klaster, i) => {
      klaster.map()
    }
  });


  };
