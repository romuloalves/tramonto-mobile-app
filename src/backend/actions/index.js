const debug = require('debug')('nodejs:actions:index');

const createTest = require('./create-test');
const readTest = require('./read-test');

module.exports = async function executeAction(params, ipfs, callback) {
  const { action, payload } = params;

  try {
    if (action === 'create-test') {
      const data = await createTest(payload, ipfs);

      return callback(null, data);
    }

    if (action === 'read-test') {
      const data = await readTest(payload, ipfs);

      return callback(null, data);
    }
  } catch (err) {
    debug('Error', err);

    return callback(err);
  }
};