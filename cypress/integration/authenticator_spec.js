describe('Authenticator:', function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit('/')
  })

  describe('Sign In:', () => {
    it('allows a user to signin', () => {
      cy.get('button').should('be.disabled')
      cy.get('input')
        .eq(0)
        .type('dev@sonabstudios.com')
      cy.get('input')
        .eq(1)
        .type('S0nabStudi0s#dev')
      cy.get('button').should('be.enabled')
      cy.get('button')
        .eq(1)
        .click()
      cy.contains('Dashboard')
    })
  })
})
