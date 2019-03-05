const { decrypt } = require('../utils/crypto');
const { resolveIpns } = require('../utils/ipfs');

module.exports = async function sendState(ipfs) {
  const isOnline = ipfs.isOnline();

  if (!isOnline) {
    return;
  }

  return {
    action: 'ipfs-ready',
    payload: isOnline
  };
};