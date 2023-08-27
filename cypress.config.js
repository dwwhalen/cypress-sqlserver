const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        logIt(message) {
          console.log(message)

          return null
        },
      }),
        on('task', {
          queryDatabase(query) {
            console.log(query)
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
              } else {
                console.log('Connected!');
                return executeSqlStatement(query);
              }
            });
            connection.connect();

            function executeSqlStatement(theQuery) {
              const request = new Request(theQuery, (err, rowCount) => {
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
              connection.execSql(request);
            }
            return null
          },
        })
    },
  },
});
