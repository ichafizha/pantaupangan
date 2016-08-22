const express = require('express');
const api = express.Router();

const StatsController = require('../controllers/stats');
const ApiClientController = require('../controllers/api/apiClient');
const ClientController = require('../controllers/client');
const UserController = require('../controllers/user');

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
api.get('/pergerakaninflasi', ApiClientController.indeksAPI);
api.get('/pergerakanpph', ApiClientController.pendudukAPI);
api.get('/komoditas/cluster', ApiClientController.clusterKomoditasAPI);
api.get('/stats', UserController.ensureAuthenticated, StatsController.getStats);
api.get('/stats/harga', ApiClientController.statAllHarga);

module.exports = api;
