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
        setupNodeEvents(on, config) {
            return cypressFirebasePlugin(on, config, {
                projectId: process.env.PROJECT_ID,
            });
        },
        // specPattern: ['src/**/*.cy.{js,jsx,ts,tsx}'],
        // setupNodeEvents(on, config) {
        //     // component testing node events setup code
        //     // https://docs.cypress.io/guides/tooling/code-coverage
        //     require('@cypress/code-coverage/task')(on, config);

        //     on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

        //     return config;
        // },
    },

    e2e: {
        // eslint-disable-next-line no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
