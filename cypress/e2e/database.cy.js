/// <reference types="cypress" />

describe('example database access', () => {

  it.only('access mssql database', () => {
    cy.task('mssqlQuery', 'select last_name, first_name from member order by first_name asc')
      .then((theResponse) => { cy.log("THE RESPONSE RETURNED TO THE TEST: " + theResponse.recordset[0].last_name) })
  })
})