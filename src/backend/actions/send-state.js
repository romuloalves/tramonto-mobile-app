/**
 * This file is responsible by send the IPFS state
 */

 /**
  * @function sendState
  * @description Sends the state back to the react-native side
  * @param  {Object} ipfs IPFS node object
  * @return {Object} IPFS state
  */
 module.exports = async function sendState(ipfs) {
  // Verifies if the node is online
  const isOnline = ipfs.isOnline();

  // Just send the message if it is online
  if (!isOnline) {
    return;
  }

  return {
    action: 'ipfs-ready',
    payload: isOnline
  };
};