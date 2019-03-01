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
      const formattedData = JSON.stringify(data);

      return singletonBridge.channel.send(formattedData);
    }
  });
}

export const ACTIONS = {
  ADD_TEST: 'add-test',
  ADD_FILE: 'add-file',
  ADD_MEMBER: 'add-member'
};