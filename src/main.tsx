import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
                <App />
            </SnackbarProvider>
        </Provider>
    </StrictMode>,
);
