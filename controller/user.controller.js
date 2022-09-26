const client = require("../client");

exports.register = async (req, res) => {
  client.registerUser(req.body, (err, data) => {
		if (!err) {
			res.send({
        status: 0,
        message: 'Registration is success.',
        data
      });
		} else {
		  res.status(400).send({message: err.details});
		}
	});
};

exports.login = async (req, res) => {
  client.login(req.body, (err, data) => {
		if (!err) {
			res.send({
        status: 0,
        message: 'Login is success.',
        data
      });
		} else {
		  res.status(400).send({message: err.details});
		}
	});
};