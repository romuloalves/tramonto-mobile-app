const bridge = require('rn-bridge');

// Echo every message received from react-native.
bridge.channel.on('message', function(msg) {
  return bridge.channel.send(msg);
});

// Inform react-native node is initialized.
bridge.channel.send('{"action": "node-initialized","payload":true}');