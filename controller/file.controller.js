const client = require("../file-client");

exports.createFileFolder = async (req, res) => {
  const { parentId = 0, name, is_file } = req.body;
  
  let requestData = {};
  if(is_file === 'true') {
    requestData = {
      tempPath: req.file.path, 
      name, 
      size: req.file.size,
      userId: req.userId,
      is_file,
      parentId
    }
  } else {
    requestData = {
      name, 
      is_file,
      userId: req.userId,
      parentId
    }
  }
  console.log('requestData----------', requestData);
  client.createFileAndFolder(requestData, (err, data) => {
		if (!err) {
			res.send({
        status: 0,
        message: 'File created successfully.',
        data
      });
		} else {
		  res.status(400).send({message: err.details});
		}
	});
};

exports.getFiles = async (req, res) => {
  const { parentId } = req.params;
  client.getFiles({ parentId, userId: req.userId }, (err, data) => {
		if (!err) {
			res.send({
        status: 0,
        message: 'Get files successfully',
        data
      });
		} else {
		  res.status(400).send({message: err.details});
		}
	});
};

exports.moveFile = async (req, res) => {
  const { parentId, fileId } = req.query;
  client.moveFile({ parentId, userId: req.userId, fileId }, (err, data) => {
		if (!err) {
			res.send({
        status: 0,
        message: 'Files moved successfully',
        data
      });
		} else {
		  res.status(400).send({message: err.details});
		}
	});
};
