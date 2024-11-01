describe('SignIn Form', () => {
    beforeEach(() => {
        cy.intercept('POST', '**/signInWithEmailAndPassword', {
            statusCode: 200,
            body: { user: { uid: '6c9zjDDPdNTU3MLNawNNaJtghua2' } },
        }).as('signIn');

        cy.intercept('GET', '**/getUserById?uid=6c9zjDDPdNTU3MLNawNNaJtghua2', {
            statusCode: 200,
            body: {
                id: 'John',
                name: 'John Doe',
                email: 'john@example.com',
            },
        }).as('getUserProfile');

        cy.visit('/sign-in', {
            onBeforeLoad: (win) => {
                win.isOpenPages = true;
            },
        });
    });

    it('should show required error messages for empty fields', () => {
        cy.get('[type="submit"]').click();

        cy.contains('Email is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
    });

    it('should show success message on valid sign-in', () => {
        cy.get('input[placeholder="Email"]').type('john@example.com');
        cy.get('input[placeholder="Password"]').type('password123');
        cy.get('[data-cy="submit-button"]').click();

        cy.url().should('include', '/profile');
        cy.contains('Success').should('be.visible');
    });

    it('should navigate to sign-up page when clicking the sign-up button', () => {
        cy.get('[data-cy="button-sign-up"]').click();
        cy.url().should('include', '/sign-up');
    });
});
