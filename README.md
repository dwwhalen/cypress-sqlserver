#introduction
The purpose of this repo is to demonstrate how to use SQL data access as part of Cypress tests.


# Start a Docker instance of SQL Server
`docker run -d --name sql_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=***someThingComplicated1234***' -p 1433:1433 -v sqldatavol:/var/opt/mssql mcr.microsoft.com/mssql/server:2017-latest`

# install a simple sql cli
`npm install -g sql-cli`

# verify your SQL Server instance is running
`mssql -u sa -p someThingComplicated1234`

# run the tedious-example script
- create a database named `testdata` with a table named `member`.  Put a couple rows of data in the table.
- setup env variables for `CYPRESS_DB_ID` and `CYRESS_DB_PASSWORD`
- run the `tedious-example` script: 
    ```
    node cypress/tedius-example/tedius-example.js
    ```
- you should see your data rows output to the console.

# Some links
- https://www.twilio.com/blog/using-sql-server-on-macos-with-docker
- https://tediousjs.github.io/tedious/