import { defineConfig } from 'cypress';
import webpackConfig from './config/webpack.cypress.config';
const cypressFirebasePlugin = require('cypress-firebase').plugin;

export default defineConfig({
    viewportWidth: 1380,
    viewportHeight: 800,

    env: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
        testUid: process.env.TEST_UID,
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
            webpackConfig,
        },
        specPattern: ['cypress/component/*.cy.{js,jsx,ts,tsx}'],
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return cypressFirebasePlugin(on, config, {
                projectId: process.env.PROJECT_ID,
            });
        },
    },

    e2e: {
        baseUrl: 'http://localhost:3000',
        specPattern: ['cypress/e2e/*.cy.{js,jsx,ts,tsx}'],
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return cypressFirebasePlugin(on, config, {
                projectId: process.env.PROJECT_ID,
            });
        },
    },
});
