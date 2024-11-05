import { FormMultiSelect } from '@/ui-library/inputs/FormMultiSelect';
import { mount } from 'cypress/react18';
import { SinonStub } from 'node_modules/cypress/types/sinon';

describe('FormMultiSelect Component', () => {
    const mockOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    let mockOnChange: Cypress.Agent<SinonStub<any[], any>>;

    beforeEach(() => {
        mockOnChange = cy.stub();
    });

    it('renders correctly without error', () => {
        mount(
            <FormMultiSelect
                options={mockOptions}
                placeholder="Select options"
                error=""
                onChange={mockOnChange}
                value={[]}
            />,
        );

        cy.get('[data-cy="select-form"]').should('exist');
        cy.get('[data-cy="select-form"]').should('have.text', 'Select options');
        cy.get('span').should('exist').and('have.text', '');
    });

    it('displays error message when error prop is provided', () => {
        mount(
            <FormMultiSelect
                options={mockOptions}
                placeholder="Select options"
                error="At least one option is required"
                onChange={mockOnChange}
                value={[]}
            />,
        );
        cy.get('span').should('have.text', 'At least one option is required');
    });

    it('calls onChange with selected options', () => {
        const clickSpy = cy.spy(mockOnChange);

        mount(
            <FormMultiSelect
                options={mockOptions}
                placeholder="Select options"
                error=""
                onChange={clickSpy}
                value={[]}
            />,
        );

        cy.get('[data-cy="select-form"]').click();
        cy.contains('Option 1').click();
        cy.get('[data-cy="select-form"]').click();
        cy.contains('Option 2').click();

        cy.wrap(clickSpy).should('have.been.calledTwice');
    });
});
