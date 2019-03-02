const { resolve } = require('path');
const { mkdirSync, existsSync } = require('fs');
const bridge = require('rn-bridge');
const IPFS = require('ipfs');

process.on('uncaughtException', err => {
  bridge.channel.send({
    action: 'exception',
    payload: err.message
  });
});

bridge.channel.on('message', function(msg) {
  const { action } = msg;

//   if (action === 'init-ipfs') {

// const appPath = resolve(bridge.app.datadir(), '.ipfs');

// if (!existsSync(appPath)) {
//   mkdirSync(appPath);
// }
// // const ipfsConfig = {
// //   init: {
// //     bits: 1024,
// //     emptyRepo: true,
// //     log: state => {
// //       bridge.channel.send({
// //         action: 'ipfs-log',
// //         payload: state
// //       });
// //     }
// //   },
// //   repo: appPath,
// //   connectionManager: {
// //     maxPeers: 10,
// //     minPeers: 2,
// //     pollInterval: 20000
// //   }
// // };
// const ipfsConfig = {
//     init: {
//       bits: 1024,
//       emptyRepo: true,
//     log: state => {
//       bridge.channel.send({
//         action: 'ipfs-log',
//         payload: state
//       });
//     }
//     },
//   repo: appPath,
//     EXPERIMENTAL: {
//       dht: false,
//       relay: {
//         enabled: true,
//         hop: {
//           enabled: false,
//           active: false
//         }
//       },
//       pubsub: true
//     },
//     config: {
//       Bootstrap: [],
//       Addresses: {
//         Swarm: ["/ip4/159.203.117.254/tcp/9090/ws/p2p-websocket-star"]
//       }
//     },
//     connectionManager: {
//       maxPeers: 10,
//       minPeers: 2,
//       pollInterval: 20000
//     }
// };
// const ipfs = new IPFS(ipfsConfig);

// ipfs.on('ready', function onIpfsReady() {
//   return bridge.channel.send({
//     action: 'ipfs-ready',
//     payload: true
//   });
// });

// ipfs.on('error', function onIpfsError(err) {
//   return bridge.channel.send({
//     action: 'ipfs-error',
//     payload: err
//   })
// });
//   }

  bridge.channel.send(msg);
});

bridge.channel.send({
  action: 'node-initialized',
  payload: true
});
