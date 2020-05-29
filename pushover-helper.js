const axios = require('axios');

const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN },
} = require('process');

const PUSHOVER_MSG_URL = 'https://api.pushover.net/1/messages.json';

const pushOverDefaults = {
    user: PUSHOVER_USER_KEY,
    token: PUSHOVER_API_TOKEN,
    title: 'Netlify Build',
};

const sendPushOverNotification = async payload => {
    const data = {
        ...pushOverDefaults,
        ...payload,
    };

    try {
        const res = await axios.default.post(PUSHOVER_MSG_URL, data);
        return res.data;
    } catch (error) {
        // Ensure confidential information are not printed in public build logs
        if (error && error.config && error.config.data) {
          delete error.config.data
        }

        throw error
    }
};

module.exports = sendPushOverNotification;
