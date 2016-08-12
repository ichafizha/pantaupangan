const async = require('async');
const Harga = require('../models/Harga');
const Indeks = require('../models/Indeks');
const Penduduk = require('../models/Penduduk');
const Produksi = require('../models/Produksi');
const Users = require('../models/User');

exports.getStats = (req, res, next) => {
  async.waterfall([
    countHarga,
    countIndeks,
    countPenduduk,
    countProduksi,
    countUsers,
    (data) => {
      res.json({
        statusCode: 200,
        message: `success get all stats`,
        stats: data,
      });
    },
  ]);
};

function countHarga(callback) {
  let data = {};
  Harga.count({}, (err, count) => {
    data.Harga = count;

    callback(null, data);
  })
}

function countIndeks(data, callback) {
  Indeks.count({}, (err, count) => {
    data.Indeks = count;

    callback(null, data);
  })
}

function countPenduduk(data, callback) {
  Penduduk.count({}, (err, count) => {
    data.Penduduk = count;

    callback(null, data);
  });
}

function countProduksi(data, callback) {
  Produksi.count({}, (err, count) => {
    data.Produksi = count;

    callback(null, data);
  });
}

function countUsers(data, callback) {
  Users.count({}, (err, count) => {
    data.Users = count;

    callback(null, data);
  })
}