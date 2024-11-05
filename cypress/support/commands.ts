// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// cypress/support/commands.js

// Custom command to log in the user
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/sign-in'); // Navigate to the login page
    cy.get('input[name="email"]').type(email); // Type the email
    cy.get('input[name="password"]').type(password); // Type the password
    cy.get('[data-cy="submit-button"]').click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
