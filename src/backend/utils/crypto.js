const crypto = require('crypto');
const randomize = require('randomatic');

const CRYPTO_ALGORITHM = 'aes-128-gcm';

module.exports.generateKey = function generateKey() {
  return randomize('aA0!', 16);
};

module.exports.encrypt = function encrypt(key, content) {
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key);
  }

  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, key, iv);
  const encryptedText = cipher.update(content, 'utf8', 'hex');

  return encryptedText + cipher.final('hex');
};

module.exports.decrypt = function decrypt(key, content) {
  if (!Buffer.isBuffer(key)) {
    key = Buffer.from(key);
  }

  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, key, iv);

  return decipher.update(content, 'hex', 'utf8');
};