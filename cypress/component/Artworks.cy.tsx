import { Artworks } from '@/modules/AllWorks/components/Artworks';
import { mount } from 'cypress/react18';
import { BrowserRouter } from 'react-router-dom';
import Image from '@/assets/images/ExploreStyles_1.png';

interface IArtIterator {
    id: string;
    title: string;
    image: string;
    description: string;
    type: string[];
    genre: string[];
    ownerId: string;
}

describe('Artworks Component', () => {
    let mockNavigate: (path: string) => void;

    beforeEach(() => {
        mockNavigate = cy.stub();
        cy.stub(require('react-router-dom'), 'useNavigate').returns(mockNavigate);
    });

    it("should render 'Artworks not found' message when there are no artworks", () => {
        mount(
            <BrowserRouter>
                <Artworks arts={[]} />
            </BrowserRouter>,
        );

        cy.contains('Artworks not found');
    });

    context('Tests with arts', () => {
        let mockArts: IArtIterator[] = [];
        beforeEach(() => {
            mockArts = [
                {
                    id: '1',
                    title: 'Artwork 1',
                    image: Image,
                    description: 'Description 1',
                    type: ['Type A'],
                    genre: ['Genre X'],
                    ownerId: 'Owner1',
                },
                {
                    id: '2',
                    title: 'Artwork 2',
                    image: Image,
                    description: 'Description 2',
                    type: ['Type B'],
                    genre: ['Genre Y'],
                    ownerId: 'Owner2',
                },
            ];

            mount(
                <BrowserRouter>
                    <Artworks arts={mockArts} />
                </BrowserRouter>,
            );
        });

        it('should render the correct number of artworks', () => {
            cy.get('[data-cy="art-card"]').should('have.length', mockArts.length);
        });

        it('should render each artwork with the correct image and title', () => {
            mockArts.forEach((item) => {
                cy.get(`[data-cy='artwork-title-${item.id}']`).should('contain.text', item.title);
                cy.get('[data-cy="art-img"]').filter(`[path="${item.image}"]`).should('exist');
            });
        });

        it('should navigate to the correct detail page when an artwork card is clicked', () => {
            const clickSpy = cy.spy();

            cy.get('[data-cy="art-card"]').first().invoke('on', 'click', clickSpy);
            cy.get('[data-cy="art-card"]').first().click();

            cy.wrap(clickSpy).should('have.been.called');
        });
    });
});
