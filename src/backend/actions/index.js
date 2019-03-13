const createTest = require('./create-test');
const readTest = require('./read-test');
const sendState = require('./send-state');

module.exports = async function executeAction(params, ipfs, callback) {
  const { action, payload } = params;

  try {
    // Creates a new test
    if (action === 'create-test') {
      const withProgressPayload = {
        ...payload,

        // Sends progress
        onProgress(msg) {
          return callback(null, msg);
        }
      };

      // Creates the new test and returns its hash and secret
      const data = await createTest(withProgressPayload, ipfs);

      return callback(null, data);
    }

    // Action that reads the test
    if (action === 'read-test') {
      const withProgressPayload = {
        ...payload,

        // Function to send the progress to the react-native
        onProgress(msg) {
          return callback(null, msg);
        }
      };

      // Reads the test
      const data = await readTest(withProgressPayload, ipfs);

      return callback(null, data);
    }

    // Reads the IPFS state and send it back to react-native
    if (action === 'send-state') {
      const data = await sendState(ipfs);

      return callback(null, data);
    }
  } catch (err) {
    return callback(err);
  }
};