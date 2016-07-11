var mongoose = require('mongoose');

var produksiSchema = new mongoose.Schema({
  tahun: Date,
  komoditas: String,
  luas: Number,
  produksi: Number,
});

var Produksi = mongoose.model('Produksi', produksiSchema)

module.exports = Produksi;
