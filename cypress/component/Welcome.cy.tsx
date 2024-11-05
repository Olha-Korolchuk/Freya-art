import { Welcome } from '@/modules/HomePage/components/Welcome';
import { mount } from 'cypress/react18';

describe('Welcome Component', () => {
    beforeEach(() => {
        mount(<Welcome />);
    });

    it('should render the main container', () => {
        cy.get("[data-cy='styled-container']").should('exist');
    });

    it("should display the text 'Freya Art'", () => {
        cy.get("[data-cy='styled-freya']").should('contain.text', 'Freya');
        cy.get("[data-cy='styled-art']").should('contain.text', 'Art');
    });

    it('should render the circle and line elements', () => {
        cy.get("[data-cy='styled-circle']").should('exist');
        cy.get("[data-cy='styled-line']").should('exist');
    });
});
