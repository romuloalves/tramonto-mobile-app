import { createContext } from 'react';
import One from 'tramonto-one-sdk';

import { getTests, createTest } from 'tramonto-one-sdk/dist/test';

let oneInstance = null;

export const contextFunctions = {
  async initialize(callback) {
    const instance = new One();

    await instance.setup();

    oneInstance = instance;

    return callback();
  },
  getInstance() {
    if (!oneInstance) {
      throw new Error('Instance is not initialized.');
    }

    return oneInstance;
  },

  async getTests() {
    return await getTests();
  },

  async createTest(name, description) {
    return await createTest(name, description);
  }
};


export const OneContext = createContext();