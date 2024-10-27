import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/query';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
                    <App />
                </SnackbarProvider>
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
