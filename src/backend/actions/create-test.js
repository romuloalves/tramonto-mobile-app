const debug = require('debug')('nodejs:actions:create-test');

const { encrypt, generateKey } = require('../utils/crypto');

function createMetadataFileContent(name, description) {
  return `{"name":"${name}","description":"${description}","revision":1,"createDate":${new Date().getTime()}}`;
}

function createEmptyArray() {
  return '[{"name":"123","description":"12321312312"}]';
}

function generateMetadataFile(name, description, key) {
  const fileContent = createMetadataFileContent(name, description);
  const encryptedContent = encrypt(key, fileContent);

  return {
    path: '/metadata.json',
    content: Buffer.from(encryptedContent)
  };
}

function generateEmptyArrayFile(fileName, key) {
  const fileContent = createEmptyArray();
  const encryptedContent = encrypt(key, fileContent);

  return {
    path: `${fileName}.json`,
    content: Buffer.from(encryptedContent)
  };
}

module.exports = async function createTest({ name, description }, ipfs) {
  try {
    const password = generateKey();
    const files = [
      // Generates metadata file
      generateMetadataFile(name, description, password),

      // Generates artifacts file
      generateEmptyArrayFile('artifacts', password),

      // Generates people file
      generateEmptyArrayFile('people', password)
    ];

    const result = await ipfs.add(files, {
      wrapWithDirectory: true
    });

    const data = {
      action: 'create-test-success',
      payload: {
        hash: result[3].hash,
        secret: password
      }
    };

    debug('success', data);

    return data;
  } catch (err) {
    debug(err);

    throw err;
  }
};