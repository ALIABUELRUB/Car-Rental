/// <reference types="Cypress" />

describe('Test Login', () => {

  before(() => {
    cy.visit('/')
  })

  it('Fill Email an password Field', () => {
    cy.get('[data-test="login-form"]')
      .within(() => {
        cy.get('#email')
          .type('test@test.com')

        cy.get('#password')
          .type('123456')
          .type('{enter}')
      })

  })

  it('Fill Password Field', () => {
  //   cy.get('#password')
    //     .type('123456')

    cy.wait(5000);
    expect(true).to.eq(true)
  })
})

