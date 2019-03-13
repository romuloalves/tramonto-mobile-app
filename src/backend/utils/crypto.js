/**
 * Responsible by handle crypto.
 */

const crypto = require('crypto');
const randomize = require('randomatic');

/**
 * @type {String}
 * Algorithm to encrypt and decrypt the files
 */
const CRYPTO_ALGORITHM = 'aes-128-gcm';

/**
 * @function generateKey
 * @description Generates the key to encrypt and decrypt files.
 *              The key contains 16 characters of letters, numbers and specials.
 * @return {String} Key
 */
module.exports.generateKey = function generateKey() {
  return randomize('aA0!', 16);
};

/**
 * @function encrypt
 * @description Encrypts the file
 * @param  {String|Buffer} key Key to encrypt the content
 * @param  {String} content    Content to encrypt
 * @return {String} Encrypted data
 */
module.exports.encrypt = function encrypt(key, content) {
  // Converts to buffer if its not
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key);
  }

  // Allocates bytes to encrypt
  const iv = Buffer.alloc(16, 0);

  // Creates the cipher
  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, key, iv);

  // Generates the encrypted content
  const encryptedText = cipher.update(content, 'utf8', 'hex');

  // Concats the final
  return encryptedText + cipher.final('hex');
};

/**
 * @function decrypt
 * @description Decrypts the string
 * @param  {String|Buffer} key Key to decrypt the content
 * @param  {String} content    Content to decrypt
 * @return {String} Decrypted content
 */
module.exports.decrypt = function decrypt(key, content) {
  // Converts to buffer if its not
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key);
  }

  // Allocates bytes to encrypt
  const iv = Buffer.alloc(16, 0);

  // Creates the decipher
  const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, key, iv);

  // Decrypts the content
  return decipher.update(content, 'hex', 'utf8');
};