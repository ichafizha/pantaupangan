const Harga = require('../../models/Harga');
const Indeks = require('../../models/Indeks');
const Penduduk = require('../../models/Penduduk');
const Produksi = require('../../models/Produksi');
const kmeans = require('node-kmeans');
const regression = require('regression-trend');
var moment = require('moment');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.getAllHarga = (req, res, next) => {
  let query = {
    komoditas: toTitleCase(req.query.komoditas)
  };

  Harga.find(query, (err, harga) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: `success get all data ${query.komoditas}`,
      data: harga,
    });
  });
};

exports.distinctKomoditas = (req, res, next) => {
  Harga.distinct('komoditas', (err, data) => {
    console.log(data)
  })
}

exports.getSelectedHarga = (req, res, next) => {
  let id = req.params.id;

  Harga.findById(id, (err, harga) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data harga by id',
      data: harga,
    });
  });
};

exports.getHargaByKomoditas = (req, res, next) => {
  let komo = req.params.komoditas;

  Harga.find({
    "komoditas": {
      $komo
    }
  }, (err, harga) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get by komo',
      data: harga,
    });
  });
};

exports.getAllIndeks = (req, res, next) => {
  Indeks.find({}, (err, indeks) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data indeks',
      data: indeks,
    });
  });
};

exports.getSelectedIndeks = (req, res, next) => {
  let id = req.params.id;

  Indeks.findById(id, (err, indeks) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data indeks by id',
      data: indeks,
    });
  });
};

exports.getAllPenduduk = (req, res, next) => {
  Penduduk.find({}, (err, penduduk) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data penduduk',
      data: penduduk,
    });
  });
};

exports.getSelectedPenduduk = (req, res, next) => {
  let id = req.params.id;

  Penduduk.findById(id, (err, penduduk) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data penduduk by id',
      data: penduduk,
    });
  });
};

exports.getAllProduksi = (req, res, next) => {
  Produksi.find({}, (err, produksi) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data produksi',
      data: produksi,
    });
  });
};

exports.getSelectedProduksi = (req, res, next) => {
  let id = req.params.id;

  Produksi.findById(id, (err, produksi) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get selected data by id',
      data: produksi,
    });
  });
};

exports.indeksAPI = function(req, res, next) {
  Indeks.find({}, (err, data) => {
    let hasil = data;
    let regresiArray = [];

    hasil.map(datum => {
      regresiArray.push({
        x: datum.indeks,
        y: datum.inflasi
      });
      return regresiArray
    });

    //console.log(regresiArray);

    // var result = regression.generate(regresiArray);
    // console.log(result);

    res.json({
      statusCode: 200,
      message: 'success get hasil kamins',
      data: regresiArray,
    });
  });
};

exports.pendudukAPI = function(req, res, next) {
  Penduduk.find({}, (err, data) => {
    let hasil = data;
    let regresiArray = [];

    hasil.map(datum => {
      regresiArray.push({
        x: datum.penduduk,
        y: datum.pph
      });
      return regresiArray;
    });

    res.json({
      statusCode: 200,
      message: 'Success get pergerakan pph API data',
      data: regresiArray,
    });
  });
};

exports.clusterKomoditasAPI = function(req, res, next) {
  Produksi.find({}, (err, data) => {
    let produksi = data;
    //console.log(produksi)

    let vectors = [];
    for (let i = 0; i < produksi.length; i++) {
      vectors[i] = [produksi[i]['luas'], produksi[i]['produksi']];
    };

    let hasilKamins = [];
    kmeans.clusterize(vectors, {
      k: 3
    }, (err, dataCluster) => {
      if (err) console.error(err);
      //  else console.log('%o', dataCluster);
      dataCluster.map((kamins, i) => {
        kamins.clusterInd.map(kamin => {
          hasilKamins.push({
            komoditas: produksi[kamin].komoditas,
            luas: produksi[kamin].luas,
            produksi: produksi[kamin].produksi,
            cluster: i
          });
        });
      });
      //console.log(hasilKamins);
      res.json({
        statusCode: 200,
        message: 'success get hasil kamins',
        data: hasilKamins,
      });
    });
  });
};