import { LINK_TEMPLATES } from '@/constants/link';

describe('Header Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate to Home page when clicking the logo', () => {
        cy.get('[data-cy="header-home"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}${LINK_TEMPLATES.HOME}`);
    });

    it('should navigate to All Arts page when clicking All arts', () => {
        cy.get('[data-cy="header-all-arts"]').click();
        cy.url().should('include', LINK_TEMPLATES.ALL_WORKS());
    });

    context('When user is not authenticated', () => {
        it('should display Sign In and Sign Up links', () => {
            cy.get('[data-cy="header-sign-in"]').should('exist');
            cy.get('[data-cy="header-sign-up"]').should('exist');
        });

        it('should navigate to Sign In page when clicking Sign In', () => {
            cy.get('[data-cy="header-sign-in"]').click();
            cy.url().should('include', LINK_TEMPLATES.SIGN_IN);
        });

        it('should navigate to Sign Up page when clicking Sign Up', () => {
            cy.get('[data-cy="header-sign-up"]').click();
            cy.url().should('include', LINK_TEMPLATES.SIGN_UP);
        });
    });

    context('When user is authenticated', () => {
        it('should display Profile and Logout buttons', () => {
            cy.login('john@example.com', 'password123');
            cy.get('[data-cy="header-profile"]').should('exist');
            cy.get('[data-cy="header-logout"]').should('exist');
        });

        it('should navigate to Profile page when clicking Profile button', () => {
            cy.get('[data-cy="header-profile"]').click();
            cy.url().should('include', 'profile/'); // Replace 'user-id' with actual ID if possible
        });

        it('should log out and redirect to Home page when clicking Logout', () => {
            cy.get('[data-cy="header-logout-button"]').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}${LINK_TEMPLATES.HOME}`);
            cy.get('[data-cy="header-sign-in"]').should('exist'); // Ensure Sign In appears after logout
        });
    });
});
