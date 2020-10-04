console.log('atata');
console.log(process.argv);
const path = require('path');
const fs = require('fs');
// let t = path.resolve(process.argv[8]);
// console.log(t);

const { program } = require('commander');
program
  .storeOptionsAsProperties(false)  
  .option('-s, --shift <shift>', 'a shift')
  .option('-a, --action <action>', 'an action encode/decode')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file');
program.parse(process.argv);
const {shift, action, input, output} = program.opts();
console.log(program.opts());
console.log(shift, action, input, output);
let inputFile;
let outputFile;
if (input) {
  inputFile = path.resolve(input);
}
if (input) {
  outputFile = path.resolve(output);
}
console.log(inputFile);
console.log(outputFile);
