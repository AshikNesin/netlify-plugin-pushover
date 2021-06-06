const {
    env: { PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN, URL },
} = require('process');

const sendPushOverNotification = require('./pushover-helper');

const getSuccessMsg = ({ successMessage }) => {
    const defaultMessage = `Hi there, we just deployed the site successfully  🎉`;
    return `${successMessage || defaultMessage} \n\n👉 ${URL}`;
};

const getErrorMsg = ({ errorMessage }) => {
    const defaultMessage = `Hi there, Latest build failed 😱\n\nCheck your build's log for more details`;
    return `${errorMessage || defaultMessage} \n\n👉 ${URL}`;
};

const precheck = () => {
    if (!PUSHOVER_USER_KEY || !PUSHOVER_API_TOKEN) {
        throw new Error(
            'PUSHOVER_USER_KEY or PUSHOVER_API_TOKEN is not available as environment variable'
        );
    }
};

const pluginFailureHandler = (error, { utils }) =>
    utils.build.failPlugin('Failed to send Pushover message', { error });

module.exports = {
    async onSuccess(pluginApi) {
        try {
            precheck();
            const { inputs } = pluginApi;
            const message = getSuccessMsg(inputs);
            console.log('Sending build success message via Pushover');
            await sendPushOverNotification({ message });
        } catch (error) {
            return pluginFailureHandler(error, pluginApi);
        }
    },
    async onError(pluginApi) {
        try {
            precheck();
            const { inputs } = pluginApi;
            const message = getErrorMsg(inputs);
            console.log('Sending build failed message via Pushover');
            await sendPushOverNotification({
                message,
                priority: 1,
                sound: 'siren',
            });
        } catch (error) {
            return pluginFailureHandler(error, pluginApi);
        }
    },
};
