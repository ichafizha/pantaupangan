var mongoose = require('mongoose');

var hargaSchema = new mongoose.Schema({
  tanggal: {type: Date, unique: true},
  komoditas: String,
  harga: Number
});

var Harga = mongoose.model('Harga', hargaSchema);

module.exports = Harga;
