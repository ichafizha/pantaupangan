var Produksi = require('../models/Produksi');

exports.produksi = function (req, res, next) {
  Produksi.find({}, (err, data) => {
    res.render('admin/produksi', {
      title: 'Produksi Pangan',
      productions: data,
    });
  });
};

exports.tampilAddProduksi() = function (req, res, next) {
  res.render('admin/produksi/produksi')
}
