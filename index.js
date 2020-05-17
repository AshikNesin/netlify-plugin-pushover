const axios = require('axios');
const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN },
} = require('process');

module.exports = {
    name: 'netlify-build-plugin-pushover',
    async onSuccess() {
        console.log('Hello world from onSuccess event!');
    },
    async onError() {
        console.log('Hello world from onError event!');
    },
    async onEnd() {
        console.log('Hello world from onEnd event!');
    },
};
