const express = require('express');

const admin = express.Router();

// Controllers
const HomeController = require('../controllers/home');
const UserController = require('../controllers/user');
const AdminController = require('../controllers/admin');
const HargaController = require('../controllers/harga');
const PendudukController = require('../controllers/penduduk');
const IndeksController = require('../controllers/indeks');
const ProduksiController = require('../controllers/produksi');

admin.get('/', HomeController.index);
admin.put('/account', UserController.ensureAuthenticated, UserController.accountPut);
admin.get('/account', UserController.ensureAuthenticated, UserController.accountGet);
admin.delete('/account', UserController.ensureAuthenticated, UserController.accountDelete);
admin.get('/signup', UserController.signupGet);
admin.post('/signup', UserController.signupPost);
admin.get('/admin', UserController.loginGet);
admin.post('/admin', UserController.loginPost);
admin.get('/forgot', UserController.forgotGet);
admin.post('/forgot', UserController.forgotPost);
admin.get('/reset/:token', UserController.resetGet);
admin.post('/reset/:token', UserController.resetPost);
admin.get('/logout', UserController.logout);

admin.get('/user', UserController.ensureAuthenticated, AdminController.user);
admin.get('/user/add', UserController.ensureAuthenticated, AdminController.tampilAddUser);
admin.post('/user/add', UserController.ensureAuthenticated, AdminController.addUser);
admin.delete('/user/:id', UserController.ensureAuthenticated, AdminController.deleteUser);
admin.get('/user/:id/update', UserController.ensureAuthenticated, AdminController.tampilUpdateUser);
admin.post('/user/:id/update', UserController.ensureAuthenticated, AdminController.updateUser);

// admin.get('/user', UserController.ensureAuthenticated, AdminController.user);
// admin.get('/user/add', UserController.ensureAuthenticated, AdminController.tampilAddUser);
// admin.post('/user/add', UserController.ensureAuthenticated, AdminController.addUser);
// admin.get('/user/:id/delete', UserController.ensureAuthenticated, AdminController.deleteUser);
// admin.get('/user/:id/update', UserController.ensureAuthenticated, AdminController.tampilUpdateUser);
// admin.post('/user/:id/update', UserController.ensureAuthenticated, AdminController.updateUser);

admin.get('/harga', UserController.ensureAuthenticated, HargaController.harga);
admin.get('/harga/add', UserController.ensureAuthenticated, HargaController.tampilAddHarga);
admin.post('/harga/add', UserController.ensureAuthenticated, HargaController.addHarga);
admin.delete('/harga/:id', UserController.ensureAuthenticated, HargaController.deleteHarga);
admin.get('/harga/:id/update', UserController.ensureAuthenticated, HargaController.tampilUpdateHarga);
admin.post('/harga/:id/update', UserController.ensureAuthenticated, HargaController.updateHarga);

admin.get('/penduduk', UserController.ensureAuthenticated, PendudukController.penduduk);
admin.get('/penduduk/add', UserController.ensureAuthenticated, PendudukController.tampilAddPenduduk);
admin.post('/penduduk/add', UserController.ensureAuthenticated, PendudukController.addPenduduk);
admin.delete('/penduduk/:id', UserController.ensureAuthenticated, PendudukController.deletePenduduk);
admin.get('/penduduk/:id/update', UserController.ensureAuthenticated, PendudukController.tampilUpdatePenduduk);
admin.post('/penduduk/:id/update', UserController.ensureAuthenticated, PendudukController.updatePenduduk);

admin.get('/indeks', UserController.ensureAuthenticated, IndeksController.indeks);
admin.get('/indeks/add', UserController.ensureAuthenticated, IndeksController.tampilAddIndeks);
admin.post('/indeks/add', UserController.ensureAuthenticated, IndeksController.addIndeks);
admin.delete('/indeks/:id', UserController.ensureAuthenticated, IndeksController.deleteIndeks);
admin.get('/indeks/:id/update', UserController.ensureAuthenticated, IndeksController.tampilUpdateIndeks);
admin.post('/indeks/:id/update', UserController.ensureAuthenticated, IndeksController.updateIndeks);

admin.get('/produksi', UserController.ensureAuthenticated, ProduksiController.produksi);
admin.get('/produksi/add', UserController.ensureAuthenticated, ProduksiController.tampilAddProduksi);
admin.post('/produksi/add', UserController.ensureAuthenticated, ProduksiController.addProduksi);
admin.delete('/produksi/:id', UserController.ensureAuthenticated, ProduksiController.deleteProduksi);
admin.get('/produksi/:id/update', UserController.ensureAuthenticated, ProduksiController.tampilUpdateProduksi);
admin.post('/produksi/:id/update', UserController.ensureAuthenticated, ProduksiController.updateProduksi);
//admin.get('/produksi/cluster', UserController.ensureAuthenticated, ProduksiController.clusterKomoditas);

module.exports = admin;
