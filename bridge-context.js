import { createContext } from 'react';

let singletonBridge = null;

export function getBridgeContext(bridge) {
  if (bridge) {
    singletonBridge = bridge;
  }

  return createContext({
    send(action, payload) {
      const data = {
        action,
        payload
      };

      return singletonBridge.channel.send(data);
    }
  });
}

export const ACTIONS = {
  INIT_IPFS: 'init-ipfs',
  ADD_TEST: 'add-test',
  ADD_FILE: 'add-file',
  ADD_MEMBER: 'add-member'
};