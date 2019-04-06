import { createContext } from 'react';
import One from 'tramonto-one-sdk';

let oneInstance = null;

export const contextFunctions = {
  async initialize() {
    const instance = new One();

    await instance.setup();

    oneInstance = instance;

    return;
  },
  getInstance() {
    if (!oneInstance) {
      throw new Error('Instance is not initialized.');
    }

    return oneInstance;
  }
};


export const OneContext = createContext();