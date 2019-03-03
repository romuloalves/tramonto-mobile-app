const bridge = require('rn-bridge');
const { resolve } = require('path');
const { mkdirSync, existsSync } = require('fs');
const IPFS = require('ipfs');

process.on('uncaughtException', err => {
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

const appPath = resolve(bridge.app.datadir(), './.ipfs');

if (!existsSync(appPath)) {
  mkdirSync(appPath);
  bridge.channel.send({
    action: 'ipfs-repo-created',
    payload: true
  });
} else {
  bridge.channel.send({
    action: 'ipfs-repo-already-exists',
    payload: true
  });
}

const ipfsConfig = {
  init: {
    bits: 1024,
    emptyRepo: true,
    log: state => {
      return bridge.channel.send({
        action: 'ipfs-log',
        payload: state
      });
    }
  },
  repo: appPath,
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

const ipfs = new IPFS(ipfsConfig);

bridge.channel.send({
  action: 'ipfs-created',
  payload: true
});

ipfs.on('ready', function onIpfsReady() {
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