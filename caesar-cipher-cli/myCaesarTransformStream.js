const CaesarCipheringMachine = require('./caesarCipher');

const { Transform } = require('stream');

class myCaesarTransform extends Transform {
  constructor (action, shift) {
    super();
    this.caesarMachine = new CaesarCipheringMachine(action, shift);
  }
  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.caesarMachine.encrypt(chunk.toString('utf-8'));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = myCaesarTransform;