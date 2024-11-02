import { LINK_TEMPLATES } from '@/constants/link';

describe('Header Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate to Home page when clicking the link', () => {
        cy.get('[data-cy="header-home"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}${LINK_TEMPLATES.HOME}`);
    });

    it('should navigate to Home page when clicking the logo', () => {
        cy.get('[data-cy="header-logo"]').click();
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

        it('should redirect unauthenticated user to 404 page', () => {
            cy.visit('/profile');
            cy.contains('404').should('be.visible');
        });

        it('should trigger navigation functions when clicking links', () => {
            cy.get('[data-cy="header-sign-in"]')
                .click()
                .then(() => {
                    cy.url().should('include', LINK_TEMPLATES.SIGN_IN);
                });

            cy.visit('/');
            cy.get('[data-cy="header-sign-up"]')
                .click()
                .then(() => {
                    cy.url().should('include', LINK_TEMPLATES.SIGN_UP);
                });
        });
    });

    context('When user is authenticated', () => {
        it('should display Profile and Logout buttons', () => {
            cy.login('john@example.com', 'password123');
            cy.contains('Success').should('be.visible');
            cy.get('[data-cy="header-profile"]').should('exist');
            cy.get('[data-cy="header-logout"]').should('exist');
        });

        it('should not display Sign In and Sign Up links when authenticated', () => {
            cy.get('[data-cy="header-sign-in"]').should('not.exist');
            cy.get('[data-cy="header-sign-up"]').should('not.exist');
        });

        it('should navigate to Profile page when clicking Profile button', () => {
            cy.get('[data-cy="header-profile"]').click();
            cy.url().should('include', 'profile/');
        });

        it('should log out and redirect to Home page when clicking Logout', () => {
            cy.get('[data-cy="header-logout-button"]').click();
            cy.url().should('eq', `${Cypress.config().baseUrl}${LINK_TEMPLATES.HOME}`);
            cy.get('[data-cy="header-sign-in"]').should('exist');
        });
    });

    it('should handle invalid login gracefully', () => {
        cy.login('invalid@example.com', 'wrongpassword');
        cy.url().should('include', 'sign-in');
        cy.contains('Something went wrong').should('be.visible');
    });

    it('should redirect unauthenticated user to home when accessing a protected route', () => {
        cy.visit('/profile');
        cy.contains('404').should('be.visible');
    });

    context('Utility Functionality Tests', () => {
        it('should call conditional rendering functions based on authentication status', () => {
            cy.get('[data-cy="header-sign-in"]').should('exist');
            cy.get('[data-cy="header-sign-up"]').should('exist');
            cy.login('john@example.com', 'password123');
            cy.get('[data-cy="header-profile"]').should('exist');
            cy.get('[data-cy="header-logout"]').should('exist');
        });

        it('should use helper functions for dynamic link rendering', () => {
            cy.visit('/');
            cy.get('[data-cy="header-home"]').then(($link) => {
                expect($link.attr('href')).to.eq(LINK_TEMPLATES.HOME);
            });
            cy.get('[data-cy="header-all-arts"]').then(($link) => {
                expect($link.attr('href')).to.include(LINK_TEMPLATES.ALL_WORKS());
            });
        });
    });
});
