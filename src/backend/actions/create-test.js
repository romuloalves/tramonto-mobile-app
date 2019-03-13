/**
 * The `create-test.js` file is responsible by create new test files and add them to the IPFS network
 */

const { encrypt, generateKey } = require('../utils/crypto');
const { generateIpnsKey } = require('../utils/ipfs');

/**
 * @function createMetadataFileContent
 * @description Generates the content of the `metadata.json` file
 * @param  {String} name        Name of the text
 * @param  {String} description Description of the test
 * @return {String} File content
 */
function createMetadataFileContent(name, description) {
  return `{"name":"${name}","description":"${description}","revision":1,"createDate":${new Date().getTime()}}`;
}

/**
 * @function createEmptyArray
 * @description Generates the content of an empty array
 * @return {String} File content of an empty array
 */
function createEmptyArray() {
  return '[{"name":"123","description":"12321312312"}]';
}

/**
 * @function generateMetadataFile
 * @description Generates the metadata file content to the IPFS upload
 * @param  {String} name        Name of the test
 * @param  {String} description Description of the test
 * @param  {String} key         Key to encrypt the file
 * @return {Object} Object to upload the file to IPFS
 */
function generateMetadataFile(name, description, key) {
  // Gets the file content
  const fileContent = createMetadataFileContent(name, description);

  // Encrypts the content
  const encryptedContent = encrypt(key, fileContent);

  // Returns the path with the content
  return {
    path: '/metadata.json',
    content: Buffer.from(encryptedContent)
  };
}

/**
 * @function generateEmptyArrayFile
 * @description Generates the content to the empty array files
 * @param  {String} fileName Name of the file to generate
 * @param  {String} key      Key to encrypt the content
 * @return {Object} Object to update the file to IPFS
 */
function generateEmptyArrayFile(fileName, key) {
  // Gets the empty array content
  const fileContent = createEmptyArray();

  // Encrypts it
  const encryptedContent = encrypt(key, fileContent);

  // Returns the object to upload
  return {
    path: `${fileName}.json`,
    content: Buffer.from(encryptedContent)
  };
}

/**
 * @function sendProgress
 * @description Sends the progress object to the callback function
 * @param  {String} payload Message to the progress
 * @param  {Function} fn      Callback function to send the payload
 * @return {Void} Just executes the callback function
 */
function sendProgress(payload, fn) {
  if (!fn) {
    return;
  }

  return fn({
    action: 'create-test-progress',
    payload
  });
}

/**
 * @function createTest
 * @description Creates a new text configuration files and upload them to the IPFS
 * @param  {String} name         Name of the test
 * @param  {String} description  Description of the test
 * @param  {Function} onProgress Function to send the creation progress
 * @param  {Object} ipfs         IPFS node object
 * @return {Object} Object to send back when the creation/upload is finished
 */
module.exports = async function createTest({ name, description, onProgress }, ipfs) {
  try {
    sendProgress('Gerando chave IPNS', onProgress);

    // Generates the IPNS key
    const ipns = await generateIpnsKey(name, ipfs);

    sendProgress('Gerando chave simétrica', onProgress);

    // Generates a password to encrypt the files
    // Maybe in the future we'll enable the user to choose its password
    const password = generateKey();

    sendProgress('Gerando arquivos', onProgress);

    // Generates the array of files to upload with its content
    const files = [
      // Generates metadata file
      generateMetadataFile(name, description, password),

      // Generates artifacts file
      generateEmptyArrayFile('artifacts', password),

      // Generates people file
      generateEmptyArrayFile('people', password)
    ];

    sendProgress('Publicando arquivos', onProgress);

    // Adds files to IPFS wrapping them about a directory
    const result = await ipfs.add(files, {
      wrapWithDirectory: true
    });

    // Gets the hash of the directory
    const ipfsHashToAdd = result[3].hash;

    sendProgress('Publicando IPNS', onProgress);

    // Publishes the files to IPNS
    await ipfs.name.publish(ipfsHashToAdd, {
      key: ipns.name
    });

    // Generates the response object
    const data = {
      action: 'create-test-success',
      payload: {
        hash: ipns.id,
        secret: password,
        ipfs: ipfsHashToAdd
      }
    };

    return data;
  } catch (err) {
    throw err;
  }
};