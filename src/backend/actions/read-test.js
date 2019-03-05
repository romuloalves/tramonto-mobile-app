const { decrypt } = require('../utils/crypto');

module.exports = async function readTest({ hash, secret }, ipfs) {
  const files = await ipfs.get(`/ipfs/${hash}`);
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