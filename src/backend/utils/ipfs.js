const KEY_TYPE = 'rsa';
const KEY_SIZE = 2048;

module.exports.generateIpnsKey = async function generateIpnsKey(name, ipfs) {
  const result = await ipfs.key.gen(name, {
    type: KEY_TYPE,
    size: KEY_SIZE
  });

  return result;
};

module.exports.resolveIpns = async function resolveIpns(hash, ipfs) {
  const name = await ipfs.name.resolve(hash);

  return name;
};