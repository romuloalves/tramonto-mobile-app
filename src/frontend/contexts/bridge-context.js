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
  // General error
  onActionErrorMessage(callback) {
    globalMessageCallbacks['ipfs-action-error'] = callback;
  },

  // Initialization
  onInitializationReady(callback) {
    globalMessageCallbacks['ipfs-ready'] = callback;
  },

  onInitializationError(callback) {
    globalMessageCallbacks['ipfs-error'] = callback;
  },

  askForState() {
    return sendMessage('send-state');
  },

  // Tests - Creation
  createTest(name, description) {
    return sendMessage('create-test', {
      name,
      description
    });
  },
  onCreateTestMessage(callback) {
    const eventName = 'create-test-success';

    if (callback) {
      globalMessageCallbacks[eventName] = callback;
      return;
    }

    delete globalMessageCallbacks[eventName];
  },
  onCreateTestProgress(callback) {
    const eventName = 'create-test-progress';

    if (callback) {
      globalMessageCallbacks[eventName] = callback;
      return;
    }

    delete globalMessageCallbacks[eventName];
  },

  // Tests - Read
  readTest(hash, secret) {
    return sendMessage('read-test', {
      hash,
      secret
    });
  },
  onReadTestMessage(callback) {
    const eventName = 'read-test-success';

    if (callback) {
      globalMessageCallbacks[eventName] = callback;
      return;
    }

    delete globalMessageCallbacks[eventName];
  },
  onReadTestProgress(callback) {
    const eventName = 'read-test-progress';

    if (callback) {
      globalMessageCallbacks[eventName] = callback;
      return;
    }

    delete globalMessageCallbacks[eventName];
  }
};

export function getBridgeContext(bridge) {
  if (bridge) {
    singletonBridge = bridge;
  }

  if (singletonBridge) {
    singletonBridge.channel.addListener('message', onMessage, this);
    contextFunctions.onActionErrorMessage(msg => {
      const jsMsg = JSON.stringify(msg);

      return alert(jsMsg);
    });
  }

  return createContext(contextFunctions);
}