const bridge = require('rn-bridge');
const { resolve, join } = require('path');
const { mkdirSync, existsSync } = require('fs');
const debug = require('debug')('nodejs:main');
const IPFS = require('ipfs');

// const bridge = {
//   channel: {
//     send: (msg) => {
//       console.log(msg);
//     },
//     on: () => {
//       return;
//     }
//   },
//   app: {
//     datadir: () => {
//       return __dirname;
//     }
//   }
// }

const executeAction = require('./actions');

process.on('uncaughtException', err => {
  debug('uncaughtException', err);
  bridge.channel.send({
    action: 'exception',
    payload: err.message
  });
});

bridge.channel.send({
  action: 'node-initialized',
  payload: true
});

debug('Node initialized.');

const ipfsConfig = {
  init: {
    bits: 1024,
    log: state => {
      debug('IPFS Log.', state);
    }
  },
  EXPERIMENTAL: {
    dht: false, // TODO: BRICKS COMPUTER
    relay: {
      enabled: true,
      hop: {
        enabled: false, // TODO: CPU hungry on mobile
        active: false
      }
    },
    pubsub: false
  },
  connectionManager: {
    maxPeers: 10,
    minPeers: 2,
    pollInterval: 20000 // ms
  }
};

try {
  const ipfs = new IPFS(ipfsConfig);

  ipfs.on('ready', function onIpfsReady() {
    debug('IPFS Ready.');

    bridge.channel.on('message', function(msg) {
      return executeAction(msg, ipfs, function executeActionCallback(err, responseMessage) {
        if (err) {
          debug('IPFS Action Error.', err);

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
    debug('IPFS Error.', err);

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
  debug('IPFS Initialization Error.', err);
}