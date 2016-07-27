var mongoose = require('mongoose');

var pendudukSchema = new mongoose.Schema({
  tahun: Number,
  penduduk: Number,
  pph: Number
});

var Penduduk = mongoose.model('Penduduk', pendudukSchema);

module.exports = Penduduk;