
# Start a Docker instance of SQL Server
`docker run -d --name sql_server -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=someThingComplicated1234' -p 1433:1433 mcr.microsoft.com/mssql/server:2017-latest`

# install a simple sql cli
`npm install -g sql-cli`

# verify you SQL Server instance is running
`mssql -u sa -p someThingComplicated1234`

# links
https://www.twilio.com/blog/using-sql-server-on-macos-with-docker
https://tediousjs.github.io/tedious/