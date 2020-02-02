context('Window', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('cy.window() - get the global window object', () => {
    cy.window().should('have.property', 'top')
  })

  it('cy.document() - get the document object', () => {
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8')
  })
})

describe('The Home Page', () => {
  it('successfully loads', function() {
    cy.visit('/')
  })

  it('shows correct title', () => {
    cy.title().should('include', 'RA2 Serverless')
  })

  it('shows email sign in', () => {
    cy.get('button')
      .eq(0)
      .contains('Email')
  })

  it('shows google sign in', () => {
    cy.get('button')
      .eq(1)
      .contains('Google')
  })

  it('shows facebook sign in', () => {
    cy.get('button')
      .eq(2)
      .contains('Facebook')
  })
})

describe('The Sign In Page', () => {
  it('successfully loads', function() {
    cy.visit('/auth/')
  })

  it('shows correct title', () => {
    cy.title().should('include', 'RA2 Sign In')
  })
})

describe('The Sign Up Page', () => {
  it('successfully loads', function() {
    cy.visit('/auth/signup/')
  })

  it('shows correct title', () => {
    cy.title().should('include', 'RA2 Sign Up')
  })
})

describe('The Confirm Sign Up Page', () => {
  it('successfully loads', function() {
    cy.visit('/auth/signup/confirmemail/')
  })

  it('shows correct title', () => {
    cy.title().should('include', 'RA2 Confirm Sign Up')
  })
})

describe('The Reset Password Page', () => {
  it('successfully loads', function() {
    cy.visit('/auth/resetpassword/')
  })

  it('shows correct title', () => {
    cy.title().should('include', 'RA2 Reset Password')
  })
})
