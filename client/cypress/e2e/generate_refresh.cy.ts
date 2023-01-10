describe('', () => {
  beforeEach(() => cy.visit('http://localhost:3000'));

  it('Generates new color palette', () => {
    cy.intercept('GET', 'https://www.colr.org/json/schemes/random/**').as(
      'getScheme'
    );
    cy.wait('@getScheme').its('response.statusCode').should('be.oneOf', [200]);
    cy.get('[data-test-id="generate-btn"]')
      .should('have.text', 'Generate')
      .click();

    cy.get('[data-test-id="generated-colors"]').should('exist');
  });

  it('Refresh random color list (Browse Colors)', () => {
    cy.intercept('GET', 'https://www.colr.org/json/colors/random/**').as(
      'getRandomColors'
    );
    cy.wait('@getRandomColors')
      .its('response.statusCode')
      .should('be.oneOf', [200]);
    cy.get('[data-test-id="refresh"]').click();
    cy.intercept('GET', 'https://www.colr.org/json/colors/random/**').as(
      'getRandomColors'
    );
    cy.wait('@getRandomColors')
      .its('response.statusCode')
      .should('be.oneOf', [200]);
    cy.get('[data-test-id="color-card"]').should('exist');
  });
});
