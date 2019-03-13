/**
 * Responsible by IPFS utilities.
 */

/**
 * @type {String}
 * Type of the key to generate IPNS
 */
const KEY_TYPE = 'rsa';

/**
 * @type {Number}
 * Size of the IPNS key
 */
const KEY_SIZE = 2048;

/**
 * @function generateIpnsKey
 * @description Generates the IPNS key
 * @param  {String} name Name of the key
 * @param  {Object} ipfs IPFS node object
 * @return {Object} Created IPNS data
 */
module.exports.generateIpnsKey = async function generateIpnsKey(name, ipfs) {
  const result = await ipfs.key.gen(name, {
    type: KEY_TYPE,
    size: KEY_SIZE
  });

  return result;
};

/**
 * @function resolveIpns
 * @description Resolves the IPNS to a IPFS. Resolves until a IPFS is found.
 * @param  {String} hash Hash to resolve
 * @param  {Object} ipfs IPFS node object
 * @return {String} IPFS path
 */
module.exports.resolveIpns = async function resolveIpns(hash, ipfs) {
  // Resolves the hash
  const name = await ipfs.name.resolve(hash, {
    recursive: true
  });

  // If the has a path, returns it
  if (name && name.path) {
    return name.path;
  }

  // Returns the entire data
  return name;
};