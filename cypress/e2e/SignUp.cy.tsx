describe('SignUp Form', () => {
    beforeEach(() => {
        cy.visit('/sign-up', {
            onBeforeLoad: (win) => {
                win.isOpenPages = true;
            },
        });
    });

    it('should show required error messages for empty fields', () => {
        cy.get('[data-cy="submit-button"]').click();

        cy.contains('Email is required');
        cy.contains('Name is required');
        cy.contains('Password is required');
        cy.contains('Confirm Password is required');
    });

    it('should show error if passwords do not match', () => {
        cy.get('input[placeholder="Email"]').type('john@example.com');
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('differentPassword');
        cy.get("button[type='submit']").click();
        cy.contains('Passwords do not match');
    });

    it('should submit successfully when form is filled correctly', () => {
        cy.get('input[placeholder="Email"]').type('john2@example.com');
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('password123');

        cy.intercept('POST', '**/createUserWithEmailAndPassword', {
            statusCode: 200,
            body: { uid: 'John' },
        });

        cy.intercept('POST', '**/addDoc', {
            statusCode: 200,
            body: { id: 'John' },
        });

        cy.get('[data-cy="submit-button"]').click();

        cy.url().should('include', '/profile');
    });

    it('should submit error when form is filled with exists email', () => {
        cy.get('input[placeholder="Email"]').type('john1@example.com');
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('password123');

        cy.get('[data-cy="submit-button"]').click();

        cy.contains('Something went wrong').should('be.visible');
    });

    it('should show validation error for invalid email format', () => {
        cy.get('input[placeholder="Email"]').type('john1');
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('password123');
        cy.get('[data-cy="submit-button"]').click();
        cy.get('input[placeholder="Email"]').then((input: any) => {
            expect(input[0].validity.valid).to.be.false;
        });
    });

    it('should navigate to sign-in page when clicking the sign-in button', () => {
        cy.get('[data-cy="sign-in-button"]').click();
        cy.url().should('include', '/sign-in');
    });
});
