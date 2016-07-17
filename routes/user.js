const express = require('express');
const client = express.Router();

const HomeController = require('../controllers/home');
const ClientController = require('../controllers/client');

client.get('/', HomeController.index);
client.get('/fharga', ClientController.fharga); //tampil fluktuasi harga
client.get('/penduduk', ClientController.penduduk); //tampil prediksi pph menurut penduduk
client.get('/indeks', ClientController.indeks); //tampil prediksi indeks harga menurut inflasi
client.get('/produksi', ClientController.produksi); //tampil hasil pengelompokkan komoditas berdasarkan luas dan produksi


module.exports = user;
