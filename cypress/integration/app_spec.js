describe('The Home Page', () => {
  describe('Timer', () => {
    it('successfully loads', () => {
      cy.visit('/');

      cy.title().should('include', 'Pomodoro')
      cy.get('h1').should('contain', '25:00');
    });

    it('should update page title when pressing play', () => {
      cy.visit('/');

      cy.get('button')
        .contains('Play')
        .click();

      cy.title().should('include', '24');
      cy.get('h1').should('contain', '24');
    });

    it('should update page title when pressing reset', () => {
      cy.visit('/');

      cy.get('button')
        .contains('Play')
        .click();

      cy.wait(1000);

      cy.get('button')
        .contains('Reset')
        .click();

      cy.title().should('include', '25:00');
      cy.get('h1').should('contain', '25:00');
    });
  });

  describe('Todo items', () => {
    it('should add todo item', () => {
      cy.visit('/');

      cy.get('textarea').type('Add item');
      cy.get('button')
        .contains('✓')
        .click();

      cy.get('p').should('contain', 'Add item');
    });

    it('should delete a todo item', () => {
      cy.visit('/');

      cy.get('textarea').type('Add item');
      cy.get('button')
        .contains('✓')
        .click();
      cy.get('button')
        .contains('×')
        .click();

      cy.get('p').should('not.exist');
    });

    it('should save todo items in local storage', () => {
      cy.visit('/');

      cy.get('textarea').type('Add item');
      cy.get('button')
        .contains('✓')
        .click();

      cy.visit('/');

      cy.get('p').should('contain', 'Add item');
    });
  });
});
