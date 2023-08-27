var config = {
    "server": "localhost",
    "authentication": {
      "type": "default",
      "options": {
        "userName": process.env.CYPRESS_DB_ID,
        "password": process.env.CYPRESS_DB_PW
      }
    },
    "options": {
      "port": 1433,
      "database": "testdata",
      "trustServerCertificate": true
    }
  }

const Request = require('tedious').Request;
const Connection = require('tedious').Connection;
const connection = new Connection(config);
connection.on('connect', (err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }
  executeStatement();
});
connection.connect();
function executeStatement() {
  const request = new Request("select * from member", (err, rowCount) => {
    if (err) {
      throw err;
    }
    console.log('DONE!');
    connection.close();
  });
  // Emits a 'DoneInProc' event when completed.
  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });
  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);
}