const Harga = require('../models/Harga');
const _ = require('lodash');
const moment = require('moment');
const async = require('async');
/**
 * GET /
 */
exports.index = function(req, res) {
  if (req.user) {
    return res.render('admin/index', {
      title: 'Home',
      pageTitle: 'Pantau Pangan',
      subTitle: 'Visualisasi Open Data Pangan Jawa Barat'
    });
  } else {
    async.waterfall([
      distinctHarga,
      getAllHarga,
      limitDataHarga,
    ], (err, result) => {
      return res.render('client/index', {
        title: 'Home',
        pageTitle: 'Pantau Pangan',
        subTitle: 'Visualisasi Open Data Pangan Jawa Barat',
        today: moment(new Date()).format('dddd, DD-MMMM-YYYY'),
        komoditas: result
      });
    })

  }
};

function distinctHarga(callback) {
  Harga.distinct('komoditas', (err, data) => {
    callback(null, data.length)
  })
}

function getAllHarga(length, callback) {
  Harga.find({})
    .sort({
      tanggal: 'desc'
    })
    .exec((err, data) => {

      callback(null, length, data);
    })
}

function limitDataHarga(length, sortedDataHarga, callback) {
  let uniq = _.uniqBy(sortedDataHarga, 'komoditas');
  let getHarga = _.take(uniq, length);
  callback(null, getHarga);
}