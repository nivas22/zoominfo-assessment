const client = require("../client");

module.exports = async (req, res, next) => {
  const authToken = req.header('AuthToken');
  if (!authToken ) {
    res.status(401).send({message:'Auth token is required'});
  }
  
  client.verify({ token: authToken }, (err, data) => {
		if (!err) {
			req.userId = Number(data.id);
			return next();
		} else {
		  res.status(401).send({message:'Auth token is invalid'});
		}
	});
}