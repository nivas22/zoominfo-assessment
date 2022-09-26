const mysql = require('mysql');
const config = require('config');

let pool;

function createConnection(options) {
  const mysqlOptions = options || config.mysql;

  mysqlOptions.typeCast = function (field, next) {
    if (field.type === 'BIT') {
      const buffer = field.parser.parseLengthCodedBuffer();
      return buffer && buffer[0] === 1; // 1 = true, 0 = false
    }

    return next();
  };

  if (!pool) {
    pool = mysql.createPool(mysqlOptions);
  }

  return pool;
}

module.exports = createConnection;
