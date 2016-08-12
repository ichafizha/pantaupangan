var User = require('../models/User');

exports.user = function(req, res, next) {
  User.find({}, (err, data) => {
    res.render('admin/user/user', {
      title: 'Manage User',
      users: data,
      js: 'admin'
    });
  });
};

exports.tampilAddUser = function(req, res, next) {
  res.render('admin/user/add', {
    title: 'Tambah User',
  });
};

exports.addUser = function(req, res, next) {
  var data = {
    email: req.body.email,
    name: req.body.nama,
    password: req.body.password
  };

  var newUser = new User(data);

  newUser.save(function(err) {
    if (err) next(err);

    res.redirect('/user');
  });
};

exports.deleteUser = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, data) {
      if (err) next(err);

      res.json({
        statusCode: 204,
        message: `${data.name} has been succesful delete`,
      })
  })
}

exports.tampilUpdateUser = function(req, res, next) {
  User.findById(req.params.id, function(err, data) {
    var updateData = {
      email: data.email.toString(),
      name: data.name.toString(),
      password: data.password.toString()
    };

    console.log(updateData);

    res.render('admin/user/add', {
      title: 'Edit Data User',
      updates: updateData
    });
  });
};

exports.updateUser = function(req, res, next) {
  var updateData = {
    email: req.body.email,
    name: req.body.nama,
    password: req.body.password
  };

  User.findById(req.params.id, function(err, data) {
    data.update({
      email: updateData.email,
      name: updateData.name,
      password: updateData.password
    }, function(err, data) {
      if (err) next(err);

      res.redirect('/user');
    });
  });
};
