// https://docs.cypress.io/api/introduction/api.html

describe('e2e test', () => {
  it('Checks button', () => {
    cy.visit('localhost:8080')
    cy.contains('button', 'Save')
  });

  it('Fills out document name', () => {
    cy.visit('localhost:8080')
    cy.get('#docName')
      .type('New Document')
      .should('have.value', 'New Document')
  });

  it('Fills out editor with text', () => {
    cy.visit('localhost:8080')
    cy.get('#textEditor')
      .type('This is some text')
      .get('input[name="content"]')
      .should('have.value', '<div>This is some text</div>')
  });
})
