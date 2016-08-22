const Harga = require('../models/Harga');
const _ = require('lodash');
const moment = require('moment');
const async = require('async');
const numeral = require('numeral');

/**
 * GET /
 */
exports.index = function(req, res) {
  if (req.user) {
    return res.render('admin/index', {
      title: 'Home',
      pageTitle: 'Pantau Pangan',
      subTitle: 'Visualisasi Open Data Pangan Jawa Barat',
      js: 'admin-dashboard'
    });
  } else {
    async.waterfall([
      distinctHarga,
      detailStatsKomoditas,
      getAllHarga,
      limitDataHarga,
    ], (err, result, statKomoditas) => {
      return res.render('client/index', {
        title: 'Home',
        pageTitle: 'Pantau Pangan',
        subTitle: 'Visualisasi Open Data Pangan Jawa Barat',
        today: moment(new Date()).format('dddd, DD-MMMM-YYYY'),
        komoditas: result,
        statKomoditas: statKomoditas,
      });
    })

  }
};

function distinctHarga(callback) {
  Harga.distinct('komoditas', (err, data) => {
    callback(null, data.length, data)
  })
}

function getAllHarga(length, komoditas, callback) {
  Harga.find({})
    .sort({
      tanggal: 'desc'
    })
    .exec((err, data) => {

      callback(null, length, data, komoditas);
    })
}

function detailStatsKomoditas(length, komoditas, callback) {
  let statKomoditas = [];
  komoditas.map((k, i)=> {
    let query = {
      komoditas: k
    };
    Harga.find(query).sort({
      tanggal: 'desc'
    }).limit(2).exec((err, data) => {
      if (data[0].harga > data[1].harga) {
        statKomoditas.push({
          komoditas: data[0].komoditas,
          hargaBaru: data[0].harga,
          hargaLama: data[1].harga,
          status: 'naik',
          tanggal: data[0].tanggal,
        });
      } else if (data[0].harga === data[1].harga) {
        statKomoditas.push({
          komoditas: data[0].komoditas,
          hargaBaru: data[0].harga,
          hargaLama: data[1].harga,
          status: 'stabil',
          tanggal: data[0].tanggal,
        });
      } else {
        statKomoditas.push({
          komoditas: data[0].komoditas,
          hargaBaru: data[0].harga,
          hargaLama: data[1].harga,
          status: 'turun',
          tanggal: data[0].tanggal,
        });
      }

      // Berhenti ketika panjang stat kmoditas sama dengan jumlah komoditas.
      if( statKomoditas.length === komoditas.length ) {
        callback(null, length, statKomoditas);
      }
    });
  });
}

function limitDataHarga(length, sortedDataHarga, statKomoditas, callback) {
  let uniq = _.uniqBy(sortedDataHarga, 'komoditas');
  uniq.map((data, i) => {
    uniq[i].hargaString = numeral(uniq[i].harga).format('0,0').replace(',', '.');
  });

  let getHarga = _.take(uniq, length);
  callback(null, getHarga, statKomoditas);
}