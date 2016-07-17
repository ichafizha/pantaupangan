const crypto = require('crypto');
const User = require('../../models/User');

exports.getAllUser = (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get all data user',
      data: user,
    });
  });
};

exports.getUser = (req, res, next) => {
  let id = req.params.id;
  User.findById({id}, (err, user) => {
    if(err) next(err);

    res.json({
      statusCode: 200,
      message: 'success get data user by id',
      data: user,
    });
  });
};
