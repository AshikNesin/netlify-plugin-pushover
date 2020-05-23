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

    const res = await axios.default.post(PUSHOVER_MSG_URL, data);
    return res.data;
};

module.exports = sendPushOverNotification;
