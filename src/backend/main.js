const { join } = require('path');
const { mkdirSync, existsSync } = require('fs');
const bridge = require('rn-bridge');
const IPFS = require('ipfs');

const executeAction = require('./actions');

process.on('uncaughtException', err => {
  bridge.channel.send({
    action: 'exception',
    payload: err.message
  });
});

bridge.channel.send({
  action: 'node-initialized',
  payload: true
});

const repoPath = join(bridge.app.datadir());

if (!existsSync(repoPath)) {
  mkdirSync(repoPath);
}

const ipfsConfig = {
  repo: repoPath,
  pass: 'tramontooneisthebestever',
  init: {
    bits: 1024
  },
  EXPERIMENTAL: {
    dht: true,
    ipnsPubsub: true
  }
};

try {
  const ipfs = new IPFS(ipfsConfig);

  ipfs.on('ready', async function onIpfsReady() {
    // const bootstrapAddr = '/ip4/206.189.200.98/tcp/4001/ipfs/QmZFX4X8K1icea9eZA3de8UurdW65G5PXsgZkVsWZnsBaF';

    // await ipfs.bootstrap.add(bootstrapAddr, {
    //   default: true
    // });

    // await ipfs.swarm.connect(bootstrapAddr);

    bridge.channel.on('message', function(msg) {
      return executeAction(msg, ipfs, function executeActionCallback(err, responseMessage) {
        if (err) {
          return bridge.channel.send({
            action: 'ipfs-action-error',
            payload: err.message || 'General error'
          });
        }

        return bridge.channel.send(responseMessage);
      });
    });

    return bridge.channel.send({
      action: 'ipfs-ready',
      payload: true
    });
  });

  ipfs.on('error', function onIpfsError(err) {
    return bridge.channel.send({
      action: 'ipfs-error',
      payload: err
    })
  });

  bridge.app.on('pause', async pauseLock => {
    await ipfs.stop();

    pauseLock.release();
  });

  bridge.app.on('resume', async () => {
    await ipfs.start();
  });
} catch (err) {
  console.error('IPFS Initialization Error.', err);
}