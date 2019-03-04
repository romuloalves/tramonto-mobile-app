const debug = require('debug')('nodejs:actions:create-test');

function createMetadataFileContent(name, description) {
  return `{"name":"${name}","description":"${description}","revision":1,"createDate":${new Date().getTime()}}`;
}

module.exports = async function createTest({ name, description }, ipfs) {
  try {
    const metadataFile = {
      path: '/metadata.json',
      content: Buffer.from(createMetadataFileContent(name, description))
    };
    // const artifactsFile = {
    //   path: '/artifacts.json',
    //   content: Buffer.from('[]')
    // };
    // const peopleFile = {
    //   path: '/people.json',
    //   content: Buffer.from('[]')
    // };
    const result = await ipfs.add([
      metadataFile
    ]);

    const data = {
      action: 'create-test-success',
      payload: {
        hash: result[0].hash
      }
    };

    debug('success', data);

    return data;
  } catch (err) {
    debug(err);

    throw err;
  }
};