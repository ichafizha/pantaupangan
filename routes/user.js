const express = require('express');
const client = express.Router();

const HomeController = require('../controllers/home');
const ClientController = require('../controllers/client');

// client.get('/', HomeController.index);
client.get('/fluktuasiharga', ClientController.tampilDataFluktuasiHarga); //tampil fluktuasi harga
client.get('/komoditas/:namaKomoditas', ClientController.tampilDataKomoditas);
client.get('/produksipangan', ClientController.clusterKomoditas);
client.get('/pph', ClientController.penduduk); //tampil prediksi pph menurut penduduk
client.get('/inflasi', ClientController.indeks); //tampil prediksi indeks harga menurut inflasi
// client.get('/produksi', ClientController.produksi); //tampil hasil pengelompokkan komoditas berdasarkan luas dan produksi

module.exports = client;
