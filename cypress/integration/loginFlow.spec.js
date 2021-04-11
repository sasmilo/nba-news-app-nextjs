describe('LoginFlow', () => {
  it('logs in, goes to the profile page, logs out', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="header-login"]').click();

    // cy.get('[data-cy="product-page-content"]', { timeout: 10000 });

    cy.get('[data-cy="user-first-name"]').type('alan');

    cy.get('[data-cy="user-last-name"]').type('ford');

    cy.get('[data-cy="click-login"]').click();

    cy.get('[data-cy="profile-page-content-h1"]').should('be.visible');

    cy.get('[data-cy="header-logout"]').click();

    cy.get('[data-cy="logout-content-h1"]', { timeout: 10000 }).should(
      'be.visible',
    );
  });
});
