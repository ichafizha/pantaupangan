/**
 * GET /
 */
exports.index = function(req, res) {
  if (req.user) {
    return res.render('admin/index', {
      title: 'Home',
      pageTitle: 'Pantau Pangan',
      subTitle: 'Visualisasi Open Data Pangan Jawa Barat'
    });
  }else {

    return res.render('client/index', {
      title: 'Home',
      pageTitle: 'Pantau Pangan',
      subTitle: 'Visualisasi Open Data Pangan Jawa Barat',
      moment: require('moment'),
    });
  }
};
