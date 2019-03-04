const bridge = require('rn-bridge');
const { resolve, join } = require('path');
const { mkdirSync, existsSync } = require('fs');
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

process.on('uncaughtException', err => {
  console.error('=> Exception', err);
  bridge.channel.send({
    action: 'exception',
    payload: err.message
  });
});

bridge.channel.on('message', function(msg) {
  const { action } = msg;

  bridge.channel.send(msg);
});

bridge.channel.send({
  action: 'node-initialized',
  payload: true
});

console.log('=> Node initialized.');

const appPath = bridge.app.datadir();

// if (!existsSync(appPath)) {
//   mkdirSync(appPath);
//   bridge.channel.send({
//     action: 'ipfs-repo-created',
//     payload: true
//   });
// } else {
//   bridge.channel.send({
//     action: 'ipfs-repo-already-exists',
//     payload: true
//   });
// }

const ipfsConfig = {
  init: {
    bits: 1024,
    log: state => {
      console.log('=> IPFS-log', state);
    }
  },
  // repo: appPath,
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

  bridge.channel.send({
    action: 'ipfs-created',
    payload: true
  });
  
  ipfs.on('ready', function onIpfsReady() {
    console.log('=> IPFS Ready.');
    return bridge.channel.send({
      action: 'ipfs-ready',
      payload: true
    });
  });
  
  ipfs.on('error', function onIpfsError(err) {
    console.error('=> IPFS ERROR', err);
    return bridge.channel.send({
      action: 'ipfs-error',
      payload: err
    })
  });
} catch (err) {
  console.error('=> IPFS-initialization-error', err);
}