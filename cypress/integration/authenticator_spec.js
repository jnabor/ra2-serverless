describe('Authenticator:', function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit('/auth')
  })

  describe('Sign In:', () => {
    it('allows a user to signin', () => {
      cy.get('button')
        .eq(2)
        .should('be.disabled')
      cy.get('input')
        .eq(0)
        .type('dev@sonabstudios.com')
      cy.get('input')
        .eq(1)
        .type('S0nabStudi0s#dev')
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
  })
})
