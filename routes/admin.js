var express = require('express');

var admin = express.Router();

// Controllers
var HomeController = require('../controllers/home');
var userController = require('../controllers/user');
var adminController = require('../controllers/admin');

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

admin.get('/penduduk', userController.ensureAuthenticated, adminController.penduduk);
admin.get('/harga', userController.ensureAuthenticated, adminController.harga);
admin.get('/indeks', userController.ensureAuthenticated, adminController.indeks);
admin.get('/produksi', userController.ensureAuthenticated, adminController.produksi);

module.exports = admin;
