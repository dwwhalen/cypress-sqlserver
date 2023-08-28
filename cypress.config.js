const { defineConfig } = require("cypress");
const sql = require('mssql')

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
        async mssqlQuery(query) {
          console.log("query input to mssqlQuery: task" + query)
          await sql.connect(`Server=localhost,1433;Database=testdata;User Id=${process.env.CYPRESS_DB_ID};Password=${process.env.CYPRESS_DB_PW};Encrypt=true;trustServerCertificate=true`)
          const queryResult = await sql.query(query)
          console.log(queryResult);
          return queryResult
        },
      })
    },
  },
});
