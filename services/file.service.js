const grpc = require('@grpc/grpc-js');
const { readFile } = require("fs");
const { addFileAndFolder, addFileContent, getParentFiles, moveFile, getFileOrFolder, getFile } = require('../repository/file.repository');

exports.createFileAndFolder = async (call, callback) => {
   const { tempPath, name, userId, parentId = 0 } = call.request;
   
   const file = await getFileOrFolder(name, parentId, userId);   
   if(file && file.length > 0) {
    callback({
      code: 400,
      message: 'File or Folder is already exist.',
      status: grpc.status.INVALID_ARGUMENT
    })
   } else {
    if(tempPath) {
      readFile(tempPath, async (error, fileBuffer) => {
        if (error) {
          process.exit(1);
        }
        const response = await addFileAndFolder(userId, name, 1, parentId);
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
}

exports.getFiles = async (call, callback) => {
  const { userId, parentId = 0 } = call.request;
  const response = await getParentFiles(parentId, userId);
  callback(null, { files: response} );
}

exports.moveFile = async (call, callback) => {
  const { userId, parentId = 0, fileId, name } = call.request;
  const file = await getFileOrFolder(name, parentId, userId); 
  console.log(file);
  if(file && file.length > 0) {
    callback({
      code: 400,
      message: 'File or Folder is already exist.',
      status: grpc.status.INVALID_ARGUMENT
    })
   } else {
      const response = await moveFile(fileId, parentId, userId);
      response.id = fileId;
      callback(null, response);
   }
}
