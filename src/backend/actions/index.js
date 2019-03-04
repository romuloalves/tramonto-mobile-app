const debug = require('debug')('nodejs:actions:index');
const createTest = require('./create-test');

module.exports = async function executeAction(params, ipfs, callback) {
  const { action } = params;

  try {
    if (action === 'create-test') {
      const data = await createTest(params.payload, ipfs);

      return callback(null, data);
    }
  } catch (err) {
    debug('Error', err);

    return callback(err);
  }
};