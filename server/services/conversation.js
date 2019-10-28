const wdc = require('watson-developer-cloud');
const config = require('../config/index');

const conversation = {};

const wdc_conversation = wdc.conversation({
    username: config.conversation.username,
    password: config.conversation.password,
    version: 'v1',
    version_date: config.conversation.versiond
});

const workspace = config.conversation.workspace;

conversation.message = function (payload, callback) {
    payload.workspace_id = workspace;

    wdc_conversation.message(payload, function (err, res) {
        if (err) {
            console.log('error:' + err);
            return false;
        }
        callback(res);
    });
}

module.exports = conversation;