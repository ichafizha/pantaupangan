var express = require('express');

var admin = express.Router();

// Controllers
var HomeController = require('../controllers/home');
var userController = require('../controllers/user');
var adminController = require('../controllers/admin');
var hargaController = require('../controllers/harga');
var pendudukController = require('../controllers/penduduk');
var indeksController = require('../controllers/indeks');
var produksiController = require('../controllers/produksi');

admin.get('/', HomeController.index);
admin.put('/account', userController.ensureAuthenticated, userController.accountPut);
admin.get('/account', userController.ensureAuthenticated, userController.accountGet);
admin.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
admin.get('/signup', userController.signupGet);
admin.post('/signup', userController.signupPost);
admin.get('/admin', userController.loginGet);
admin.post('/admin', userController.loginPost);
admin.get('/forgot', userController.forgotGet);
admin.post('/forgot', userController.forgotPost);
admin.get('/reset/:token', userController.resetGet);
admin.post('/reset/:token', userController.resetPost);
admin.get('/logout', userController.logout);

admin.get('/user', userController.ensureAuthenticated, adminController.user);
admin.get('/user/add', userController.ensureAuthenticated, adminController.tampilAddUser);
admin.post('/user/add', userController.ensureAuthenticated, adminController.addUser);

admin.get('/harga', userController.ensureAuthenticated, hargaController.harga);
admin.get('/harga/add', userController.ensureAuthenticated, hargaController.tampilAddHarga);
admin.post('/harga/add', userController.ensureAuthenticated, hargaController.addHarga);

admin.get('/penduduk', userController.ensureAuthenticated, pendudukController.penduduk);
admin.get('/penduduk/add', userController.ensureAuthenticated, pendudukController.tampilAddPenduduk);
admin.post('/penduduk/add', userController.ensureAuthenticated, pendudukController.addPenduduk);

admin.get('/indeks', userController.ensureAuthenticated, indeksController.indeks);
admin.get('/indeks/add', userController.ensureAuthenticated, indeksController.tampilAddIndeks);
admin.post('/indeks/add', userController.ensureAuthenticated, indeksController.addIndeks);
admin.get('/indeks/:id/delete', userController.ensureAuthenticated, indeksController.deleteIndeks);
admin.get('/indeks/:id/update', userController.ensureAuthenticated, indeksController.tampilUpdateIndeks);
admin.post('/indeks/:id/update', userController.ensureAuthenticated, indeksController.updateIndeks);

admin.get('/produksi', userController.ensureAuthenticated, produksiController.produksi);
admin.get('/produksi/add', userController.ensureAuthenticated, produksiController.tampilAddProduksi);
admin.post('/produksi/add', userController.ensureAuthenticated, produksiController.addProduksi);
admin.get('/produksi/:id/delete', userController.ensureAuthenticated, produksiController.deleteProduksi);
admin.get('/produksi/:id/update', userController.ensureAuthenticated, produksiController.tampilUpdateProduksi);
admin.post('/produksi/:id/update', userController.ensureAuthenticated, produksiController.updateProduksi);

module.exports = admin;
