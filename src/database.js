const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '162.144.159.205',
  user: 'apideliv_final',
  password: 'trabajomagni1',
  database: 'apideliv_deliverymagni',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('la base de datos ha sido conectada');
  }
});

module.exports = mysqlConnection;