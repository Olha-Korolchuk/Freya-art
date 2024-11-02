describe('Action Component E2E Test', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/api/submitArt', {
            statusCode: 200,
            body: { message: 'Success' },
        }).as('submitArt');

        cy.visit('/create', {
            onBeforeLoad: (win) => {
                win.isOpenPages = true;
            },
        });
    });

    it('should display validation errors when required fields are empty', () => {
        cy.get('button[type="submit"]').click();

        cy.contains('Title is required').should('be.visible');
        cy.contains('Genre is required').should('be.visible');
        cy.contains('Type is required').should('be.visible');
        cy.contains('Description is required').should('be.visible');
    });

    it('should allow the user to upload an image file', () => {
        cy.get('input[type="file"]').attachFile('example.png');
        cy.get('img[alt="preview"]').should('be.visible');
    });

    it('should submit successfully when all required fields are filled', () => {
        cy.get('input[placeholder="Title"]').type('Art Title');
        cy.get('textarea[placeholder="Description"]').type('This is a description for the art piece.');

        cy.get('#react-select-3-input').click();
        cy.contains('Abstract').click();
        cy.get('#react-select-3-input').click();
        cy.contains('Portrait').click();

        cy.get('#react-select-5-input').click();
        cy.contains('Painting').click();

        cy.get('input[type="file"]').attachFile('example.png');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/profile');
    });

    it('should display validation errors when Title and Description fields are empty', () => {
        cy.get('#react-select-3-input').click();
        cy.contains('Abstract').click();
        cy.get('#react-select-3-input').click();
        cy.contains('Portrait').click();

        cy.get('#react-select-5-input').click();
        cy.contains('Painting').click();

        cy.get('input[type="file"]').attachFile('example.png');

        cy.get('button[type="submit"]').click();

        cy.contains('Title is required').should('be.visible');
        cy.contains('Description is required').should('be.visible');
    });
});
