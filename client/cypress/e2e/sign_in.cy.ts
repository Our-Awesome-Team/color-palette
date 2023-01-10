describe('Sing in', () => {
  it('User can sign in', () => {
    cy.visit('http://localhost:3000');
    cy.get('[href="/signin"] > .Button_btn__rk-ay')
      .should('have.text', 'Sign In')
      .click();
    cy.get('#email').type('user@mail.com');
    cy.get('#password').click().type('12345');
    cy.get('.SigninPage_btn__aWs7X').click();
    cy.get('.Button_btn__rk-ay').should('have.text', 'Logout');
  });
});
