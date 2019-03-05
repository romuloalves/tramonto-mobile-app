const debug = require('debug')('nodejs:actions:index');

const createTest = require('./create-test');
const readTest = require('./read-test');
const sendState = require('./send-state');

module.exports = async function executeAction(params, ipfs, callback) {
  const { action, payload } = params;

  try {
    if (action === 'create-test') {
      const withProgressPayload = {
        ...payload,
        onProgress(msg) {
          return callback(null, msg);
        }
      };
      const data = await createTest(withProgressPayload, ipfs);

      return callback(null, data);
    }

    if (action === 'read-test') {
      const data = await readTest(payload, ipfs);

      return callback(null, data);
    }

    if (action === 'send-state') {
      const data = await sendState(ipfs);

      return callback(null, data);
    }
  } catch (err) {
    debug('Error', err);

    return callback(err);
  }
};