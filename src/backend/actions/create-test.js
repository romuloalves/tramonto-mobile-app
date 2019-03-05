const debug = require('debug')('nodejs:actions:create-test');

const { encrypt, generateKey } = require('../utils/crypto');
const { generateIpnsKey } = require('../utils/ipfs');

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

function sendProgress(payload, fn) {
  if (!fn) {
    return;
  }

  return fn({
    action: 'create-test-progress',
    payload
  });
}

module.exports = async function createTest({ name, description, onProgress }, ipfs) {
  try {
    sendProgress('Gerando chave IPNS', onProgress);

    const ipns = await generateIpnsKey(name, ipfs);

    sendProgress('Gerando chave simétrica', onProgress);

    const password = generateKey();

    sendProgress('Gerando arquivos', onProgress);

    const files = [
      // Generates metadata file
      generateMetadataFile(name, description, password),

      // Generates artifacts file
      generateEmptyArrayFile('artifacts', password),

      // Generates people file
      generateEmptyArrayFile('people', password)
    ];

    sendProgress('Publicando arquivos', onProgress);

    const result = await ipfs.add(files, {
      wrapWithDirectory: true
    });
    const ipfsHashToAdd = result[3].hash;

    sendProgress('Publicando IPNS', onProgress);

    await ipfs.name.publish(ipfsHashToAdd, {
      key: ipns.name
    });

    const data = {
      action: 'create-test-success',
      payload: {
        hash: ipns.id,
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