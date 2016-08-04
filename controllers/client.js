var Produksi = require('../models/Produksi');
const kmeans = require('node-kmeans');
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
        }, (err, res) => {
            if (err) console.error(err);
            //  else console.log('%o', res);
            res.map((kamins, i) => {
                kamins.clusterInd.map(kamin => {
                    hasilKamins.push({
                        komoditas: produksi[kamin].komoditas,
                        cluster: i
                    });
                })
            })
            console.log(hasilKamins);
        });

        res.render('client/produksipangan', {
            title: 'Visualisasi Kelompok Komoditas Berdasarkan Lahan Panen & Produksi',
            js: 'produksipangan'
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
        for (let i = 0; i < produksi.length; i++) {
            vectors[i] = [produksi[i]['luas'], produksi[i]['produksi']];
        };

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
                })
            })
            console.log(hasilKamins);
            res.json(hasilKamins);
        });


        // res.map(klaster, i) => {
        //   klaster.map()
        // }
    });
};
