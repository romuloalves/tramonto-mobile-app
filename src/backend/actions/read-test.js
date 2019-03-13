/**
 * The `read-test.js` is responsible by read a test by its hash and secret
 */

const { decrypt } = require('../utils/crypto');
const { resolveIpns } = require('../utils/ipfs');

/**
 * @function sendProgress
 * @description Sends the progress to the react-native side
 * @param  {String} payload Message to the react-native side
 * @param  {Function} fn    Function to send the payload
 * @return {Void} Doesn't return things, just executes the callback
 */
function sendProgress(payload, fn) {
  if (!fn) {
    return;
  }

  return fn({
    action: 'read-test-progress',
    payload
  });
}

/**
 * @function readTest
 * @description Reads a specific test
 * @param  {String} hash         IPNS hash of the test
 * @param  {String} secret       Secret to decrypt the files
 * @param  {Function} onProgress Function to send back the progress
 * @param  {Object} ipfs         IPFS node object
 * @return {Object} Object configuration files
 */
module.exports = async function readTest({ hash, secret, onProgress }, ipfs) {
  sendProgress('Obtendo teste', onProgress);

  // Resolves the IPNS hash to IPFS
  const ipfsAddr = await resolveIpns(hash, ipfs);

  sendProgress('Lendo arquivos', onProgress);

  // Gets the files from the IPFS
  const files = await ipfs.get(ipfsAddr);
  const response = {
    metadata: {},
    artifacts: [],
    people: []
  };

  // Verifies the files from the IPFS
  if (!files || files.length === 0) {
    return {
      action: 'read-test-success',
      payload: response
    };
  }

  sendProgress('Descriptografando', onProgress);

  // Loops the files
  files.forEach(file => {
    // If the file doesn't have content, it doesn't matter
    if (!file.content) {
      return;
    }

    // Reads the content as utf8
    const fileContent = file.content.toString('utf8');

    // Decrypts the file with the given secret
    const decrypted = decrypt(secret, fileContent);

    // Parses the object from string to json
    const parsed = JSON.parse(decrypted);

    if (file.path.includes('metadata')) {
      // Reads metadata
      response.metadata = parsed;
    } else if (file.path.includes('artifacts')) {
      // Reads the list of artifacts
      response.artifacts = parsed;
    } else if (file.path.includes('people')) {
      // Reads the list of members
      response.people = parsed;
    }
  });

  return {
    action: 'read-test-success',
    payload: response
  };
};