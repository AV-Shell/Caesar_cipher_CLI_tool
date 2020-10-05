const path = require('path');
const fs = require('fs');
const CaesarCipheringMachine = require('./caesarCipher');

const { program } = require('commander');
const { pipeline } = require('stream');
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


program
  .storeOptionsAsProperties(false)
  .option('-s, --shift <shift>', 'a shift')
  .option('-a, --action <action>', 'an action encode/decode')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file');
program.parse(process.argv);
let { shift, action, input, output } = program.opts();

if (parseInt( shift, 10) !== (shift - 0)) {
  console.error(`Shift must be an integer! Not a '${shift}'`);
  process.exit(9);
}
shift = parseInt( shift, 10) %26;
shift = shift >= 0 ? shift : (26 + shift);

if ((typeof (action) !== 'string') || (!((action === 'encode') || (action === 'decode')))){
  console.error(`action must be 'encode' or 'decode'`);
  process.exit(9);
}


const myCaesar = new myCaesarTransform(action, shift);

let inputFile;
let outputFile;
let inputStream;
let outputStream;
if (input) {
  inputFile = path.resolve(input);
  try {
    fs.accessSync(inputFile, fs.constants.F_OK | fs.constants.R_OK);
    console.log(`${inputFile} exists, and it is readable`);
    inputStream = fs.createReadStream(inputFile);
  } catch (err) {
    console.error(`${inputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is cannot be read'}`);
    process.exit(9);
  }
} else {
  inputStream = process.stdin;
}
if (output) {
  outputFile = path.resolve(output);
  try {
    fs.accessSync(outputFile, fs.constants.F_OK | fs.constants.W_OK);
    console.log(`${outputFile} exists, and it is readable`);
    outputStream = fs.createWriteStream(outputFile,{flags:'a'});
  } catch (err) {
    console.error(`${outputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is cannot be write'}`);
    process.exit(9);
  }
} else {
  outputStream = process.stdout;
}

pipeline(
  inputStream,
  myCaesar,
  outputStream,
  (err) => {
    if (err) {
      console.error(`Problem with encription, ${err.code === 'EISDIR' ? 'It is not a file. It is a Directory!!' : 'LOL'}` );
      process.exit(9);
    } else {
      console.log('Ecription succeeded.');
    }
  }
);