var mongoose = require('mongoose');

var pendudukSchema = new mongoose.Schema({
  tahun: Date,
  jumlahPenduduk: Number,
  pph: Number
});

var Penduduk = mongoose.model('Penduduk', pendudukSchema);

module.exports = Penduduk;
