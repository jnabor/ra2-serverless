describe('Authenticator:', function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit('/auth')
  })

  describe('Auth flow:', () => {
    it('allows a user to sign in', () => {
      cy.get('button')
        .eq(2)
        .should('be.disabled')
      cy.get('input')
        .eq(0)
        .type('dev@sonabstudios.com')
      cy.get('input')
        .eq(1)
        .type('Ra2-1234')
      cy.get('button')
        .eq(2)
        .should('be.enabled')
        .click()

      cy.contains('Dashboard')
      cy.get('button')
        .eq(0)

        .click()

      cy.url().should('include', '/dashboard')
    })

    it('allows a user to sign out', () => {
      cy.get('input')
        .eq(0)
        .type('dev@sonabstudios.com')
      cy.get('input')
        .eq(1)
        .type('Ra2-1234')
      cy.get('button')
        .eq(2)
        .click()
      cy.contains('Dashboard')
      cy.get('button')
        .eq(0)
        .click()
      cy.get('button')
        .eq(2)
        .click()

      cy.get('button')
        .eq(0)
        .contains('Email')

      cy.get('button')
        .eq(1)
        .contains('Google')

      cy.get('button')
        .eq(2)
        .contains('Facebook')
    })
  })
})
