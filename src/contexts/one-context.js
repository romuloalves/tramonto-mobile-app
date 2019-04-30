import { createContext } from 'react';
import { NativeModules, DeviceEventEmitter } from 'react-native';
import RNFS from 'react-native-fs';

const { TramontoOne } = NativeModules;

/**
 * @function fromJSON
 * @description Parses json data to Test
 * @param  {String} json JSON to parse
 * @return {Test} Parsed test
 */
function fromJSON(json) {
  const data = JSON.parse(json);

  return data;
}

class OneCallback {
  sendResult(value) {
    alert(value);
  }
}

export const contextFunctions = {
  initialize(callback) {
    return new Promise((resolve, reject) => {
      const path = RNFS.DocumentDirectoryPath;

      TramontoOne.startRepo(path, function setupCallback(err) {
        if (err) {
          return reject(err.message);
        }

        resolve();

        return callback();
      });
    });
  },

  /**
   * @function getTests
   * @description Returns the list of tests
   * @return {Promise<Array<Test>>} List of tests
   */
  getTests() {
    return new Promise(function(resolve, reject) {
      TramontoOne.getTests(function getTestsCallback(error, data) {
        if (error) {
          return reject(error);
        }

        const tests = JSON.parse(data);

        return resolve(tests);
      });
    });
  },

  /**
   * @function createTest
   * @description Creates a new test
   * @param  {String} name        Name of the test
   * @param  {String} description Description of the test
   * @return {Promise<Test>} Created test
   */
  createTest(name, description) {
    return new Promise(function(resolve, reject) {
      TramontoOne.createTest(name, description, function createTestCallback(error, data) {
        if (error) {
          return reject(error);
        }

        const test = fromJSON(data);

        return resolve(test);
      });
    });
  },

  /**
   * @function getTestByIPFS
   * @description Returns a single test by its IPFS hash
   * @param  {String} ipfsHash IPFS hash of the object
   * @param  {String} secret   Secret to decrypt the data
   * @return {Promise<Test>} Test of the given IPFS hash
   */
  getTestbyIPFS(hash, secret) {
    return new Promise(function(resolve, reject) {
      TramontoOne.getTestByIpfs(hash, secret, function getTestByIpfsCallback(error, data) {
        if (error) {
          return reject(error);
        }

        const test = fromJSON(data);

        return resolve(test);
      });
    });
  },

  /**
   * @function getTestByIPNS
   * @description Returns a single test by its IPNS hash
   * @param  {String} ipnsHash IPNS hash of the object
   * @param  {String} secret   Secret to decrypt the data
   * @return {Promise<Test>} Test of the given IPNS hash
   */
  getTestbyIPNS(hash, secret) {
    return new Promise(function(resolve, reject) {
     TramontoOne.getTestByIpns(hash, secret, function getTestByIpnsCallback(error, data) {
        if (error) {
          return reject(error);
        }

        const test = fromJSON(data);

        return resolve(test);
      });
    });
  },

  /**
   * @function publishToIPNS
   * @description Publishes the test to IPNS
   * @param  {String} hash IPFS hash to publish
   * @param  {String} name Name of the test to generate the public and private keys
   * @return {Promise<String>} Generated IPNS hash
   */
  publishToIPNS(hash, name) {
    return new Promise(function(resolve, reject) {
      TramontoOne.publishToIpns(hash, name, function publishToIpnsCallback(error, data) {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  },


  publishToIPNSAsync(hash, name, callback) {
    DeviceEventEmitter.addListener('shareTestAsync', data => alert(data));

    return new Promise(function(resolve) {
      TramontoOne.test(hash, name, function publishToIpnsCallback(data) {
        return resolve(data);
      });
    });
  }
};


export const OneContext = createContext();