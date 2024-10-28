import { themesCarousel } from '@/constants/themesCarousel';
import { ThemesCarousel } from '@/modules/HomePage/components/ThemesCarousel';
import { mount } from 'cypress/react18';
import { BrowserRouter } from 'react-router-dom';

describe('ThemesCarousel Component', () => {
    beforeEach(() => {
        mount(
            <BrowserRouter>
                <ThemesCarousel />
            </BrowserRouter>,
        );
    });

    it('should render the carousel container and title', () => {
        cy.get("[data-cy='carousel-container']").should('exist');
        cy.get("[data-cy='carousel-title']").should('contain.text', 'Themes of the month');
    });

    it('should display the correct number of slides', () => {
        cy.get("[data-cy^='carousel-slide-']").should('have.length', themesCarousel.length);
    });

    it('should display each slide with correct image and title', () => {
        themesCarousel.forEach((item, index) => {
            cy.get(`[data-cy='slide-img-${index}']`).should('have.attr', 'path', item.path);
            cy.get(`[data-cy='slide-title-${index}']`).should('contain.text', item.title);
        });
    });
});
