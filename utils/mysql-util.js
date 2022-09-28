const mysql = require('mysql');
const config = require('config');

let pool;

function createConnection() {
  console.log('process env', process.env);
  let options = undefined
  if(process.env.DB_HOST) {
    options = {
      "host": process.env.DB_HOST,
      "user": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "port": process.env.DB_PORT,
      "database": process.env.DB_NAME,
      "connectionLimit": 200,
      "multipleStatements": true
    };
  }
  
  console.log('options-------------', options);
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
