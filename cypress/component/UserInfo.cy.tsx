import { UserInfo } from '@/modules/Profile/components/UserInfo/UserInfo';
import configureStore from 'redux-mock-store';
import Avatar from '@/assets/images/userAvatar.jpg';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';

describe('UserInfo Component', () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: {
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            },
        });

        mount(
            <Provider store={store}>
                <UserInfo />
            </Provider>,
        );
    });

    it("should render the user's name and email", () => {
        cy.get("[data-cy='user-name']").should('contain.text', 'John Doe');
        cy.get("[data-cy='user-email']").should('contain.text', 'john.doe@example.com');
    });

    it('should display the user avatar', () => {
        cy.get("[data-cy='user-avatar']").should('have.attr', 'src').and('include', Avatar);
    });
});
