const mysqlErrorHandler = require('../utils/mysql-errors');
const createConnection = require('../utils/mysql-util');

function addUser(name, email, password) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(
      `INSERT INTO users(name, email, password, status) VALUES (?,?,?,?)`,
      [name, email, password, 1],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows)),
    );
  });
}

function getUser(email) {
  return new Promise((resolve, reject) => {
    const connection = createConnection();
    connection.query(`SELECT u.id, u.email, u.password FROM users u where u.email = ?`, [email], (err, rows) =>
      err ? reject(mysqlErrorHandler(err)) : resolve(rows[0]),
    );
  });
}

module.exports = {
  addUser,
  getUser
};
