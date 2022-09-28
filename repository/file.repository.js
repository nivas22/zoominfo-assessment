const mysqlErrorHandler = require('../utils/mysql-errors');
const createConnection = require('../utils/mysql-util');

function addFileAndFolder(user_id, name, isFile, parent) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      `INSERT INTO files_folders(user_id, name, is_file, parent_id) VALUES (?,?,?,?)`,
      [user_id, name, isFile, parent],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows)),
    );
  });
}

function addFileContent(file_id, content) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      `INSERT INTO file_content(file_id, content) VALUES (?,?)`,
      [file_id, content],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows)),
    );
  });
}

function getAllFiles(userId) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(`SELECT 
    CASE 
		WHEN t1.parent_id IS NULL THEN 'Parent'
      ELSE 'Child'
    END AS relationship,
    t1.id,
    t1.name,
    t1.is_file,
    t1.user_id,
    t1.parent_id
    FROM
    files_folders t1
        LEFT JOIN
    files_folders t2 ON t1.id = t2.parent_id 
    where t1.user_id = ?;`, [userId], (err, rows) =>
      err ? reject(mysqlErrorHandler(err)) : resolve(rows[0]),
    );
  });
}

function getParentFiles(parent_id, user_id) {
  const query = `SELECT t1.id, t1.name, t1.is_file, t1.parent_id, t1.user_id FROM files_folders t1 WHERE user_id = ? AND t1.parent_id = ?;`;
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(query, [user_id, parent_id], (err, rows) =>
      err ? reject(mysqlErrorHandler(err)) : resolve(mapFileRows(rows)),
    );
  });
}

function getFileOrFolder(fileName, parent_id, userId) {
  // const parent = parent_id && parent_id === 0 ? 'AND t1.parent_id is null' : `AND t1.parent_id = ?`;
  const query = `SELECT t1.id, t1.name, t1.is_file, t1.parent_id, t1.user_id FROM files_folders t1 WHERE t1.user_id = ? and t1.name = ? AND t1.parent_id = ?;`;

  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(query, [userId, fileName, parent_id], (err, rows) =>
      err ? reject(mysqlErrorHandler(err)) : resolve(rows),
    );
  });
}

function getFile(id) {
  const query = `SELECT t1.id, t1.name, t1.is_file, t1.parent_id, t1.user_id FROM files_folders t1 WHERE t1.id = ?;`;

  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(query, [id], (err, rows) =>
      err ? reject(mysqlErrorHandler(err)) : resolve(rows),
    );
  });
}

function mapFileRows(rows) {
  return rows.map(row => row);
} 

function moveFile(fileId, parent_id, user_id) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      `UPDATE files_folders SET parent_id = ? WHERE id = ? and user_id = ?`,
      [parent_id, fileId, user_id],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows)),
    );
  });
}

module.exports = {
  addFileAndFolder,
  getAllFiles,
  getParentFiles,
  addFileContent,
  moveFile,
  getFileOrFolder,
  getFile
};
