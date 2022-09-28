const grpc = require('@grpc/grpc-js');
const bcrypt = require('bcrypt');
const { addUser, getUser } = require('../repository/user.repository');
const { generateToken, verify } = require('../services/auth.service');

exports.registerUser = async (call, callback) => {
  const { name, email, password } = call.request;
  if (!name && !email && !password) {
    callback({
      code: 400,
      message: 'Required fields are missing',
      status: grpc.status.INVALID_ARGUMENT
    })
  }
  
  const user = await getUser(email);
  
  if(user) {
    callback({
      code: 400,
      message: 'User is already exist.',
      status: grpc.status.INVALID_ARGUMENT
    })
  }
  
  bcrypt.hash(password, 10, (err, hash) => {
    addUser(name, email, hash)
    .then((response) => {
      response.id = response.insertId;
      callback(null, response);
    }).catch((err) => {
      callback({
        code: 400,
        message: err.errorObject ? err.errorObject.message : err.message,
        status: grpc.status.INTERNAL
      });
    });
  });
};

exports.login = (call, callback) => {
  const { email, password } = call.request;
  
  getUser(email)
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (result) {
            const token = await generateToken(user);
            user.token = token;
            callback(null, user);
          } else {
            callback({
              code: grpc.status.UNAUTHENTICATED,
              message: "Invalid password",
            });
          }
        });
      } else {
          callback({
            code: grpc.status.UNAUTHENTICATED,
            message: "No user found",
          });
      }
  });
}

exports.verify = (call, callback) => {
  const { token } = call.request;
    verify(token, (usr) => {
      if (usr && usr.email) {
        getUser(usr.email)
        .then(user => {
          const resp = {};
          resp.id = user.id;
          resp.name = user.name;
          resp.email = user.email;
          callback(null, resp);
        });
      } else {
          callback({
              code: grpc.status.UNAUTHENTICATED,
              message: "No user found",
          });
      }
  });
}
