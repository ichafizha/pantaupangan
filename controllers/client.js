var Produksi = require('../models/Produksi');
var Indeks = require('../models/Indeks');
var Penduduk = require('../models/Penduduk');
const kmeans = require('node-kmeans');
const regression = require('regression-trend');
var moment = require('moment');

moment.locale('id');

exports.tampilDataFluktuasiHarga = function(req, res, next) {
	res.render('client/fluktuasiHarga', {
		title: 'Fluktuasi Harga',
		js: 'fluktuasi-harga'
	});
};

exports.tampilDataKomoditas = function(req, res, next) {
	let namaKomoditas = req.params.namaKomoditas;
	console.log(namaKomoditas);

	res.render('client/komoditas', {
		title: namaKomoditas + ' Visualisasi ',
		js: 'komoditas',
		namaKomoditas: namaKomoditas,
	});
};

exports.clusterKomoditas = function(req, res, next) {
	Produksi.find({}, (err, data) => {
		var produksi = data;

		let vectors = [];
		for (let i = 0; i < produksi.length; i++) {
			vectors[i] = [produksi[i]['luas'], produksi[i]['produksi']];
		};

		let hasilKamins = [];
		kmeans.clusterize(vectors, {
			k: 3
		}, (err, data) => {
			if (err) console.error(err);
			else console.log('%o', data);
			data.map((kamins, i) => {
				kamins.clusterInd.map(kamin => {
					hasilKamins.push({
						komoditas: produksi[kamin].komoditas,
						cluster: i
					});
				})
			})
		console.log(hasilKamins);
		res.render('client/produksipangan', {
			title: 'Visualisasi Kelompok Komoditas Berdasarkan Lahan Panen & Produksi',
			hasil: hasilKamins,
			js: 'produksipangan',
		});	
		});


		// res.map(klaster, i) => {
		//   klaster.map()
		// }
	});
};

exports.clusterKomoditasAPI = function(req, res, next) {
	Produksi.find({}, (err, data) => {
		var produksi = data;

		let vectors = [];
		for (var i = 0; i < produksi.length; i++) {
		};
			vectors[i] = [produksi[i]['luas'], produksi[i]['produksi']];

		let hasilKamins = [];
		kmeans.clusterize(vectors, {
			k: 3
		}, (err, dataCluster) => {
			if (err) console.error(err);
			//  else console.log('%o', dataCluster);
			dataCluster.map((kamins, i) => {
				kamins.clusterInd.map(kamin => {
					hasilKamins.push({
						komoditas: produksi[kamin].komoditas,
						luas: produksi[kamin].luas,
						produksi: produksi[kamin].produksi,
						cluster: i
					});
				});
			});
			//console.log(hasilKamins);
			res.json({
				statusCode: 200,
				message: 'success get hasil kamins',
				data: hasilKamins,
			});
		});
	});
};

exports.penduduk = function(req, res, next) {
	

	res.render('client/penduduk', {
		title: 'Pergerakan PPH terhadap jumlah penduduk'
	});
};

exports.indeks = function (req, res, next) { 
	res.render('client/indeks', {
		title: 'Pergerakan inflasi terhadap indeks harga konsumen',
		js: 'indeks-inflasi'
	});
 };

exports.indeksAPI = function(req, res, next) {
	Indeks.find({}, (err, data) => {
		var hasil = data;
		var gradien= 0.002;
		var regresiArray = [];

		hasil.map(datum => {
			regresiArray.push({
				x: datum.indeks,
				y: datum.inflasi
			});
			return regresiArray
		})

		// for (let i = 0; i < hasil.length; i++) {
		// 	regresiArray[i] = [hasil[i]['inflasi'], hasil[i]['indeks']];
		// };
		 console.log(regresiArray);

		// var result = regression.generate(regresiArray);
		// console.log(result);

		res.json({
				statusCode: 200,
				message: 'success get hasil kamins',
				data: regresiArray,
			});
	});
};