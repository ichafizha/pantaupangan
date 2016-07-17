const express = require('express');
const api = express.Router();

var HomeContorller = require('../controllers/home');
var UserController = require('../controllers/user');
var AdminController = require('../controllers/api/apiAdmin');
var HargaController = require('../controllers/harga');
var PendudukController = require('../controllers/penduduk');
var IndeksController = require('../controllers/indeks');
var ProduksiController = require('../controllers/produksi');
var ClientController = require('../controllers/api/apiClient');

// API admin
api.get('/admin', UserController.ensureAuthenticated, AdminController.getAllUser);

api.get('/', ClientController.getAllHarga);
api.get('/harga/:id', ClientController.getSelectedHarga);
api.get('/indeks', ClientController.getAllIndeks);
api.get('/indeks/:id', ClientController.getSelectedIndeks);
api.get('/penduduk', ClientController.getAllPenduduk);
api.get('/penduduk/:id', ClientController.getSelectedPenduduk);
api.get('/produksi', ClientController.getAllProduksi);
api.get('/produksi/:id', ClientController.getSelectedProduksi);


module.exports = api;
