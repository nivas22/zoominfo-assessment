const grpc = require('@grpc/grpc-js');
const { readFile } = require("fs");
const { addFileAndFolder, addFileContent, getParentFiles, moveFile } = require('../repository/file.repository');

exports.createFileAndFolder = async (call, callback) => {
   const { tempPath, name, userId, parentId = null } = call.request;
   if(tempPath) {
    readFile(tempPath, async (error, fileBuffer) => {
      if (error) {
        console.error(error.message);
        process.exit(1);
      }
      const response = await addFileAndFolder(userId, name, 0, parentId);
      await addFileContent(response.insertId, fileBuffer);
      response.id = response.insertId;
      callback(null, response);
    });
   } else {
    const response = await addFileAndFolder(userId, name, 0, parentId);
    response.id = response.insertId;
    callback(null, response);
   }
}

exports.getFiles = async (call, callback) => {
  const { userId, parentId = null } = call.request;
  const response = await getParentFiles(parentId, userId);
  console.log(response);
  callback(null, { files: response} );
}

exports.moveFile = async (call, callback) => {
  const { userId, parentId = null, fileId } = call.request;
  const response = await moveFile(fileId, parentId, userId);
  response.id = fileId;
  callback(null, response);
}
