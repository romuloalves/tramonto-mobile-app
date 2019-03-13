const createTest = require('./create-test');
const readTest = require('./read-test');
const importTest = require('./import-test');
const sendState = require('./send-state');

/**
 * @function executeAction
 * @description Executes selected actions accordingly to what is asked for
 * @param  {Object} params         Params to execute the action
 * @param  {String} params.action  Action to the executed
 * @param  {Object} params.payload Data to use in the action
 * @param  {Object} ipfs           IPFS node object
 * @param  {Function} callback     Callback function to send messages back
 * @return {Void} Just executes the callback, returns nothing
 */
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

    // Action to import the test
    if (action === 'import-test') {
      const withProgressPayload = {
        ...payload,

        // Function to send the progress to the react-native
        onProgress(msg) {
          return callback(null, msg);
        }
      };

      // Imports the test
      const data = await importTest(withProgressPayload, ipfs);

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