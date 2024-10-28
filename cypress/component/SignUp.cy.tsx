import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SignUp } from '@/modules/SignUp';
import { BrowserRouter } from 'react-router-dom';
import { SinonStub } from 'node_modules/cypress/types/sinon';
import { SnackbarProvider } from 'notistack';

const mockStore = configureStore([]);
const store = mockStore({});

describe('SignUp Component', () => {
    let mockNavigate: Cypress.Agent<SinonStub<any[], any>>;

    beforeEach(() => {
        mockNavigate = cy.stub();
        cy.stub(require('react-router-dom'), 'useNavigate').returns(mockNavigate);

        cy.mount(
            <BrowserRouter>
                <Provider store={store}>
                    <SnackbarProvider>
                        <SignUp />
                    </SnackbarProvider>
                </Provider>
            </BrowserRouter>,
        );

        cy.stub(require('firebase/auth'), 'createUserWithEmailAndPassword').resolves({
            user: { uid: '123', displayName: 'John Doe' },
        } as any);

        cy.stub(require('firebase/auth'), 'updateProfile').resolves();
        cy.stub(require('firebase/firestore'), 'addDoc').resolves();
    });

    it('should display validation errors for required fields', () => {
        cy.get("[data-cy='submit-button']").click();
        cy.contains('Email is required');
        cy.contains('Name is required');
        cy.contains('Password is required');
        cy.contains('Confirm Password is required');
    });

    it('should display error if passwords do not match', () => {
        cy.get('input[placeholder="Email"]').type('john@example.com');
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('differentPassword');
        cy.get("button[type='submit']").click();
        cy.contains('Passwords do not match');
    });

    it('should show error notification on sign up failure', async () => {
        cy.get('input[placeholder="Email"]').type('john@example.com');
        cy.get('input[placeholder="Name"]').type('John');
        cy.get("input[placeholder='Password']").type('password123');
        cy.get("input[placeholder='Confirm Password']").type('password123');
        cy.get('button[type="submit"]').click();

        cy.contains('Something went wrong');
    });
});
