import { createContext } from 'react';

let singletonBridge = null;
const globalMessageCallbacks = {};

function sendMessage(action, payload) {
  if (!singletonBridge) {
    return;
  }

  return singletonBridge.channel.send({
    action,
    payload
  });
}

function onMessage(msg) {
  const { action, payload } = msg;
  const callback = globalMessageCallbacks[action];

  if (!callback) {
    return;
  }

  return callback(payload);
}

const contextFunctions = {
  // Initialization
  onInitializationReady(callback) {
    globalMessageCallbacks['ipfs-ready'] = callback;
  },

  onInitializationError(callback) {
    globalMessageCallbacks['ipfs-error'] = callback;
  },

  // Tests - Creation
  createTest(name, description) {
    return sendMessage('create-test', {
      name,
      description
    });
  },
  onCreateTestMessage(callback) {
    if (callback) {
      globalMessageCallbacks['create-test-success'] = callback;
      return;
    }

    delete globalMessageCallbacks['create-test-success'];
  }
};

export function getBridgeContext(bridge) {
  if (bridge) {
    singletonBridge = bridge;
  }

  if (singletonBridge) {
    singletonBridge.channel.addListener('message', onMessage, this);
  }


  return createContext(contextFunctions);
}