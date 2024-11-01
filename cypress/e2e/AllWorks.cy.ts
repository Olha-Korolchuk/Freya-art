describe('AllWorks Component', () => {
    beforeEach(() => {
        cy.visit('/all-works');
    });

    it('applies filter by search and displays filtered artworks', () => {
        cy.get('input[placeholder="Search..."]').type('Berserk');
        cy.get('[data-cy^="artwork-title-"]').should('exist');
    });

    it('applies filters by genre and type and displays filtered artworks', () => {
        cy.get('#react-select-3-input').click();
        cy.contains('Photography').click();

        cy.get('#react-select-5-input').click();
        cy.contains('Surrealism').click();

        cy.get('[data-cy^="artwork-title-"]').should('exist');
    });

    it('displays a message when no artworks are found', () => {
        cy.get('input[placeholder="Search..."]').type('NonExistingTitle');
        cy.contains('Artworks not found').should('exist');
    });
});
