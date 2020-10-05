const DEBUG_LOG_ENABLE = false;
const code_A = 'A'.charCodeAt(0);
const code_Z = 'Z'.charCodeAt(0);
const code_a = 'a'.charCodeAt(0);
const code_z = 'z'.charCodeAt(0);
class CaesarCipheringMachine {

  constructor(action, shift) {
    if ((typeof (action) === 'string') && (action === 'encode')) {
      this.en_type = true;
      this.shift = shift;
    } else {
      this.en_type = false;
      this.shift = 26 - shift;
    }
    if (DEBUG_LOG_ENABLE) console.log('type', this.en_type);
    if (DEBUG_LOG_ENABLE) console.log('shift', this.shift);
  }

  encrypt(message) {
    if (typeof (message) !== 'string') {
      throw Error;
    }
    if (DEBUG_LOG_ENABLE) console.log('Incoming message:', message);
    let newarr = [];
    for (let i = 0; i < message.length; i++) {
      if ((message.codePointAt(i) <= code_z) && (message.codePointAt(i) >= code_a)) {
        newarr.push(String.fromCodePoint(((message.codePointAt(i) - code_a) + this.shift) % 26 + code_a));
      } else if ((message.codePointAt(i) <= code_Z) && (message.codePointAt(i) >= code_A)) {
        newarr.push(String.fromCodePoint(((message.codePointAt(i) - code_A) + this.shift) % 26 + code_A));
      } else {
        newarr.push(message[i]);
      }
    }

    return newarr.join('');
  }
}

module.exports = CaesarCipheringMachine;
