const { decrypt } = require('../utils/crypto');
const { resolveIpns } = require('../utils/ipfs');

function sendProgress(payload, fn) {
  if (!fn) {
    return;
  }

  return fn({
    action: 'read-test-progress',
    payload
  });
}

module.exports = async function readTest({ hash, secret, onProgress }, ipfs) {
  sendProgress('Obtendo teste', onProgress);

  const ipfsAddr = await resolveIpns(hash, ipfs);

  sendProgress('Lendo arquivos', onProgress);

  const files = await ipfs.get(ipfsAddr);
  const response = {
    metadata: {},
    artifacts: [],
    people: []
  };

  if (!files || files.length === 0) {
    return {
      action: 'read-test-success',
      payload: response
    };
  }

  sendProgress('Descriptografando', onProgress);

  files.forEach(file => {
    if (!file.content) {
      return;
    }

    const fileContent = file.content.toString('utf8');
    const decrypted = decrypt(secret, fileContent);
    const parsed = JSON.parse(decrypted);

    if (file.path.includes('metadata')) {
      response.metadata = parsed;
    } else if (file.path.includes('artifacts')) {
      response.artifacts = parsed;
    } else if (file.path.includes('people')) {
      response.people = parsed;
    }
  });

  return {
    action: 'read-test-success',
    payload: response
  };
};