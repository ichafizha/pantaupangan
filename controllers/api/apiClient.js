const Harga = require('../../models/Harga');
const Indeks = require('../../models/Indeks');
const Penduduk = require('../../models/Penduduk');
const Produksi = require('../../models/Produksi');

exports.getAllHarga = (req, res, next) => {
  Harga.find({}, (err, harga) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data harga',
      data: harga,
    });
  });
};

exports.getSelectedHarga = (req, res, next) => {
  let id= req.params.id;

  Harga.findById(id, (err, harga) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data harga by id',
      data: harga,
    });
  });
};

exports.getAllIndeks = (req, res, next) => {
  Indeks.find({}, (err, indeks) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data indeks',
      data: indeks,
    });
  });
};

exports.getSelectedIndeks = (req, res, next) => {
  let id= req.params.id;

  Indeks.findById(id, (err, indeks) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data indeks by id',
      data: indeks,
    });
  });
};

exports.getAllPenduduk = (req, res, next) => {
  Penduduk.find({}, (err, penduduk) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data penduduk',
      data: penduduk,
    });
  });
};

exports.getSelectedPenduduk = (req, res, next) => {
  let id= req.params.id;

  Penduduk.findById(id, (err, penduduk) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data penduduk by id',
      data: penduduk,
    });
  });
};

exports.getAllProduksi = (req, res, next) => {
  Produksi.find({}, (err, harga) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data produksi',
      data: produksi,
    });
  });
};

exports.getSelectedProduksi = (req, res, next) => {
  let id= req.params.id;

  Produksi.findById(id, (err, produksi) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data by id',
      data: produksi,
    });
  });
};
