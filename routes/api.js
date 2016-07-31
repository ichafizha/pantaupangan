const express = require('express');
const api = express.Router();

var HomeContorller = require('../controllers/home');
var UserController = require('../controllers/user');
var AdminController = require('../controllers/api/apiAdmin');
var HargaController = require('../controllers/harga');
var PendudukController = require('../controllers/penduduk');
var IndeksController = require('../controllers/indeks');
var ProduksiController = require('../controllers/produksi');
var ApiClientController = require('../controllers/api/apiClient');

//API client
api.get('/harga', ApiClientController.getAllHarga);
api.get('/harga/:id', ApiClientController.getSelectedHarga);
api.get('/harga/komo/:komoditas', ApiClientController.getHargaByKomoditas);
api.get('/indeks', ApiClientController.getAllIndeks);
api.get('/indeks/:id', ApiClientController.getSelectedIndeks);
api.get('/penduduk', ApiClientController.getAllPenduduk);
api.get('/penduduk/:id', ApiClientController.getSelectedPenduduk);
api.get('/produksi', ApiClientController.getAllProduksi);
api.get('/produksi/:id', ApiClientController.getSelectedProduksi);

module.exports = api;
