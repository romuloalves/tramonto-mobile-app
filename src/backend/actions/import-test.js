/**
 * Imports a test.
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
    action: 'import-test-progress',
    payload
  });
}

/**
 * @function importTest
 * @description Imports a test from IPFS and pins it
 * @param  {String} hash         IPNS hash to import
 * @param  {String} secret       Secret to decrypt the files
 * @param  {Function} onProgress Function to send the progress
 * @param  {Object} ipfs         IPFS node object
 * @return {Object} Metadata informations of the test
 */
module.exports = async function importTest({ hash, secret, onProgress }, ipfs) {
  sendProgress('Obtendo teste', onProgress);

  const ipfsAddr = await resolveIpns(hash, ipfs);

  sendProgress('Lendo arquivos', onProgress);

  // Gets the files from the IPFS
  const files = await ipfs.get(ipfsAddr);

  // Verifies the files from the IPFS
  if (!files || files.length === 0) {
    return {
      action: 'import-test-success',
      payload: response
    };
  }

  sendProgress('Descriptografando', onProgress);

  const metadata = {
    hash,
    secret,
    ipfs: ipfsAddr.split('/').pop(),
    name: '',
    description: ''
  };

  // Loops the files
  files.forEach(async file => {
    // If the file doesn't have content, it doesn't matter
    if (!file.content) {
      // Pins the files
      await ipfs.pin.add(file.path, {
        recursive: true
      });

      return;
    }

    // Just handle metadata
    if (!file.path.includes('metadata')) {
      return;
    }

    // Reads the content as utf8
    const fileContent = file.content.toString('utf8');

    // Decrypts the file with the given secret
    const decrypted = decrypt(secret, fileContent);

    // Parses the object from string to json
    const parsed = JSON.parse(decrypted);

    metadata.name = parsed.name;
    metadata.description = parse.description;
  });

  return {
    action: 'import-test-success',
    payload: metadata
  };
};