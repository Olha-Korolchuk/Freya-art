describe('Update Artwork Action', () => {
    beforeEach(() => {
        cy.visit('/edit/lzH5LFEWbSiXVRdTczQ1', {
            onBeforeLoad: (win) => {
                win.isOpenPages = true;
            },
        });
    });

    it('renders the form with existing values', () => {
        cy.get('input[placeholder="Title"]').should('have.value', 'Updated Title');
        cy.get('textarea[placeholder="Description"]').should('have.value', 'This is a description for the art piece.');

        cy.contains('Abstract');
        cy.contains('Portrait');
        cy.contains('Painting');

        cy.get('img[alt="preview"]').should('exist');
    });

    it('updates the artwork successfully', () => {
        cy.get('input[placeholder="Title"]').clear().type('Art Title');

        cy.get('textarea[placeholder="Description"]').clear().type('This is a description for the art piece.');

        cy.get('#react-select-3-input').click();
        cy.contains('Surrealism').click();

        cy.get('#react-select-5-input').click();
        cy.contains('Photography').click();
        cy.get('#react-select-5-input').click();
        cy.contains('Installation').click();

        cy.get('input[type="file"]').attachFile('test.png');

        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/detailed');
    });

    it('displays validation errors when fields are empty', () => {
        cy.get('input[placeholder="Title"]').clear();
        cy.get('textarea[placeholder="Description"]').clear();

        cy.get('button[type="submit"]').click();

        cy.contains('Title is required').should('be.visible');
        cy.contains('Description is required').should('be.visible');

        cy.get('[aria-label="Remove Portrait"]').click();
        cy.get('[aria-label="Remove Abstract"]').click();
        cy.get('[aria-label="Remove Surrealism"]').click();

        cy.get('[aria-label="Remove Painting"]').click();
        cy.get('[aria-label="Remove Photography"]').click();
        cy.get('[aria-label="Remove Installation"]').click();

        cy.get('button[type="submit"]').click();

        cy.contains('Genre is required').should('be.visible');
        cy.contains('Type is required').should('be.visible');
    });
});
