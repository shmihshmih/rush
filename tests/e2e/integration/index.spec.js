/// <reference types="Cypress" />

describe('index page', () => {
  it('должно показываться название страницы или что там показывается ', () => {
    cy.visit('/');

    cy.get('.header-logo > a')
      .should('contain.text', 'Логово Голема')

    cy.get(':nth-child(1) > .mat-card-actions > .mat-focus-indicator').click();


    cy.get('button.mat-focus-indicator.mat-button.mat-button-base.mat-primary > span')
      .should('contain.text', 'Ответ');

    cy.visit('/english/wordList/demandovortoj');
  })
})
