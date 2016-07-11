var mongoose = require('mongoose');

var indeksSchema = new mongoose.Schema({
  bulan: Date,
  inflasi: Number,
  indeks: Number
});

var Indeks = mongoose.model('Indeks', indeksSchema);

module.exports = Indeks;
