import { Welcome } from '@/modules/HomePage/components/Welcome';

describe('Welcome.cy.tsx', () => {
    it('Check Welcome component', () => {
        cy.mount(<Welcome />);
        cy.get('div').contains('Freya');
    });
});
