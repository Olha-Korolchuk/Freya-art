import { askedQuestions } from '@/constants/askedQuestions';
import { AskedQuestions } from '@/modules/HomePage/components/AskedQuestions';
import { mount } from 'cypress/react18';

describe('AskedQuestions Component', () => {
    beforeEach(() => {
        mount(<AskedQuestions />);
    });

    it('should render the FAQ container and title', () => {
        cy.get("[data-cy='faq-container']").should('exist');
        cy.contains('Frequently Asked Questions');
    });

    it('should display questions and hide answers by default', () => {
        cy.get("[data-cy^='question-']").should('have.length', askedQuestions.length);
        cy.get("[data-cy^='answer-']").each(($el) => {
            cy.wrap($el).should('have.css', 'grid-template-rows', '44px');
        });
    });

    it("should only toggle the clicked question's answer", () => {
        const firstQuestion = askedQuestions[0];
        const secondQuestion = askedQuestions[1];

        cy.get(`[data-cy='question-${firstQuestion.id}']`).click();
        cy.get(`[data-cy='answer-${firstQuestion.id}']`).should('have.css', 'grid-template-rows', '69.6px');

        cy.get(`[data-cy='answer-${secondQuestion.id}']`).should('have.css', 'grid-template-rows', '44px');
    });
});
