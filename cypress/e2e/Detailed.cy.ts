describe('Detailed Art Component', () => {
    beforeEach(() => {
        cy.visit('/detailed/lzH5LFEWbSiXVRdTczQ1');
    });

    it('should load and display art details', () => {
        cy.get('[data-cy="art-image"]').should('be.visible');
        cy.get('[data-cy="art-title"]').should('contain', 'Updated Title');
        cy.get('[data-cy="art-author"]').should('contain', 'John Doe');
        cy.get('[data-cy="art-description"]').should('contain', 'This is a description for the art piece.');

        cy.get('[data-cy="art-type-tags"]').within(() => {
            cy.get('[data-cy="art-tag"]').should('have.length.greaterThan', 0);
        });
        cy.get('[data-cy="art-genre-tags"]').within(() => {
            cy.get('[data-cy="art-tag"]').should('have.length.greaterThan', 0);
        });
    });

    it('should navigate to the author profile on click', () => {
        cy.get('[data-cy="header-profile"]').click();
        cy.url().should('include', '/profile');
    });

    it('should show edit and delete options for the owner', () => {
        cy.get('[data-cy="edit-art"]').should('be.visible');
        cy.get('[data-cy="delete-art"]').should('be.visible');
    });

    it('should confirm and delete art successfully', () => {
        cy.get('[data-cy="delete-art"]').click();
        cy.on('window:confirm', () => true);
        cy.url().should('include', '/all-works');
    });
});
