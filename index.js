const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN, URL },
} = require('process');

const sendPushOverNotification = require('./pushover-helper');

const getSuccessMsg = () =>
    `Hi there, we just deployed the site successfully  🎉\n\n👉 ${URL}`;

const getErrorMsg = () =>
    `Hi there, Latest build failed 😱\n\nCheck your build's log for more details\n\n👉 ${URL}`;

const precheck = () => {
    if (!PUSHOVER_USER_KEY || !PUSHOVER_API_TOKEN) {
        console.log(
            'PUSHOVER_USER_KEY or PUSHOVER_API_TOKEN is not available as environment variable'
        );
        return false;
    }
    return true;
};
module.exports = {
    async onSuccess({ utils }) {
        if (precheck()) {
            console.log('Sending build success message via Pushover');
            const message = getSuccessMsg();
            try {
                await sendPushOverNotification({ message });
            } catch (error) {
                return utils.build.failBuild(
                    'Failed to send PushOver message',
                    { error }
                );
            }
        }
    },
    async onError({ utils }) {
        if (precheck()) {
            console.log('Sending build failed message via Pushover');
            const message = getErrorMsg();
            try {
                await sendPushOverNotification({
                    message,
                    priority: 1,
                    sound: 'siren',
                });
            } catch (error) {
                return utils.build.failBuild(
                    'Failed to send PushOver message',
                    { error }
                );
            }
        }
    },
};
