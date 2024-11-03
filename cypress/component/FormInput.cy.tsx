import { FormInput } from '@/modules/ArtActions/components/FormInput';
import { mount } from 'cypress/react18';
import { UseFormRegisterReturn } from 'react-hook-form';

describe('FormInput Component', () => {
    let mockRegister: UseFormRegisterReturn<string>;
    beforeEach(() => {
        mockRegister = {
            name: 'test-input',
            onChange: cy.stub(),
            onBlur: cy.stub(),
            ref: cy.stub(),
        };
    });

    it('renders correctly for text input without error', () => {
        mount(<FormInput type="text" placeholder="Enter text" register={mockRegister} error="" />);

        cy.get('input')
            .should('exist')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Enter text')
            .and('not.have.class', 'is-error');

        cy.get('span').should('have.text', '');
    });

    it('renders correctly for description input without error', () => {
        mount(<FormInput type="description" placeholder="Enter description" register={mockRegister} error="" />);

        cy.get('textarea')
            .should('exist')
            .and('have.attr', 'placeholder', 'Enter description')
            .and('not.have.class', 'is-error');

        cy.get('span').should('have.text', '');
    });

    it('displays error for text input', () => {
        mount(
            <FormInput type="text" placeholder="Enter text" register={mockRegister} error="This field is required" />,
        );

        cy.get('input').should('have.css', 'border-color', 'rgb(255, 0, 0)');

        cy.get('span').should('have.text', 'This field is required');
    });

    it('displays error for description input', () => {
        mount(
            <FormInput
                type="description"
                placeholder="Enter description"
                register={mockRegister}
                error="Description is required"
            />,
        );

        cy.get('textarea').should('have.css', 'border-color', 'rgb(255, 0, 0)');
        cy.get('span').should('have.text', 'Description is required');
    });
});
