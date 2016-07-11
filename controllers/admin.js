var User = require('../models/User');

exports.user = function (req, res, next) {
  User.find({}, (err, data) => {
    res.render('admin/user/user', {
      title: 'Manage User',
      users: data,
    });
  });
};

exports.tampilAddUser = function (req, res, next) {
  res.render('admin/user/add', {
    title: 'Tambah User'
  });
};

exports.addUser = function (req, res, next) {
  var data = {
    email: req.body.email,
    name: req.body.nama,
    password: req.body.password
  };

  var newUser = new User(data);

  newUser.save(function (err) {
    if(err) next(err);

    res.redirect('/user');
  });
};
