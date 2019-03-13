const { join } = require('path');
const { mkdirSync, existsSync } = require('fs');
const bridge = require('rn-bridge');
const IPFS = require('ipfs');

const executeAction = require('./actions');

// Listens the general exception in the node process
process.on('uncaughtException', err => {
  // Sends exception to the react-native
  bridge.channel.send({
    action: 'exception',
    payload: err.message
  });
});

// Sends the message about the node side initialized
bridge.channel.send({
  action: 'node-initialized',
  payload: true
});

// Gets the path to use as IPFS repo
const repoPath = join(bridge.app.datadir());

// Creates the path if it doesn't exists
if (!existsSync(repoPath)) {
  mkdirSync(repoPath);
}

// Creates initial config
const ipfsConfig = {
  repo: repoPath, // Path of the repo
  pass: 'tramontooneisthebestever', // Password to the user's keys
  init: {
    bits: 1024 // Size of the key (smaller to fast startup)
  },
  EXPERIMENTAL: {
    dht: true, // Uses DHT to IPNS
    ipnsPubsub: true // Enables PubSub to verify updates to IPNS hashes
  }
};

try {
  // Creates the IPFS node
  const ipfs = new IPFS(ipfsConfig);

  // Listens to when the node is ready
  ipfs.on('ready', async function onIpfsReady() {
    // const bootstrapAddr = '/ip4/206.189.200.98/tcp/4001/ipfs/QmZFX4X8K1icea9eZA3de8UurdW65G5PXsgZkVsWZnsBaF';

    // await ipfs.bootstrap.add(bootstrapAddr, {
    //   default: true
    // });

    // await ipfs.swarm.connect(bootstrapAddr);

    // Listens to the messages sent from react-native side
    bridge.channel.on('message', function(msg) {
      // Executes actions based in the messages types (`action` property)
      return executeAction(msg, ipfs, function executeActionCallback(err, responseMessage) {
        if (err) {
          // Sends error messages from actions to the react-native side
          return bridge.channel.send({
            action: 'ipfs-action-error',
            payload: err.message || 'General error'
          });
        }

        // Sends actions responses to the react-native
        return bridge.channel.send(responseMessage);
      });
    });

    // Sends to the react-native side that the node is ready
    return bridge.channel.send({
      action: 'ipfs-ready',
      payload: true
    });
  });

  // Listens to errors in the node
  ipfs.on('error', function onIpfsError(err) {
    // Sends the error to the react-native side
    return bridge.channel.send({
      action: 'ipfs-error',
      payload: err
    })
  });

  // Listens to when the app pauses
  bridge.app.on('pause', async pauseLock => {
    await ipfs.stop();

    pauseLock.release();
  });

  // Listens to the moment when the app resumes running
  bridge.app.on('resume', async () => {
    await ipfs.start();
  });
} catch (err) {
  // Logs error when initializing the node
  console.error('IPFS Initialization Error.', err);
}