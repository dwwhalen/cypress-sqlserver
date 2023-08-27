/// <reference types="cypress" />

describe('example database access', () => {
  beforeEach(() => {
    cy.log("IN BEFORE EACH");
  })

  it('access database', () => {
    cy.task('logIt', 'trying the access database test')
    cy.task('queryDatabase', 'select last_name, first_name from member order by first_name asc')
  })
})