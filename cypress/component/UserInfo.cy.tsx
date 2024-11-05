import { UserInfo } from '@/modules/Profile/components/UserInfo/UserInfo';
import Avatar from '@/assets/images/userAvatar.jpg';
import { mount } from 'cypress/react18';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/query';

describe('UserInfo Component', () => {
    beforeEach(() => {
        mount(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
                        <BrowserRouter>
                            <UserInfo
                                isOwner={true}
                                profile={{ id: '1', name: 'John Doe', email: 'john.doe@example.com', image: null }}
                            />
                        </BrowserRouter>
                    </SnackbarProvider>
                </QueryClientProvider>
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
