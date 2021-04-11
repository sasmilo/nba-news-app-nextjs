describe('Navigation', () => {
  it('can navigate using the header links', () => {
    // Open the browser to the dev server URL
    cy.visit('http://localhost:3000/');

    // Get the element corresponding to the image in the home page...
    cy.get('[data-cy="home-page-content-image"]', { timeout: 10000 })
      // ...and test that it is visible
      .should('be.visible');

    // Get the header link element corresponding to the About link...
    cy.get('[data-cy="header-scores"]', { timeout: 10000 })
      // ...and click on that element
      .click();

    // Get the element corresponding to the p in the Scores page...
    cy.get('[data-cy="scores-page-content-p"]', { timeout: 10000 })
      // ...and test that it is visible
      .should('be.visible');

    cy.get('[data-cy="header-teams"]', { timeout: 10000 }).click();

    // Get the element corresponding to the image in the teams page...
    cy.get('[data-cy="teams-page-content-team-image"]', { timeout: 10000 })
      // ...and test that it is visible
      .should('be.visible');

    cy.get('[data-cy="header-standings"]', { timeout: 10000 }).click();

    cy.get('[data-cy="standings-page-content-h2"]', { timeout: 10000 })
      // ...and test that it is visible
      .should('be.visible');
  });
});
