console.log('atata');
console.log(process.argv);
const path = require('path');
const fs = require('fs');
// let t = path.resolve(process.argv[8]);
// console.log(t);

const { program } = require('commander');
const { pipeline } = require('stream');
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
  // try {
  //   if (fs.existsSync(inputFile)) {
  //     console.log(inputFile);
  //     // console.log(fs.access(inputFile));
  //     fs.accesss(inputFile, fs.constants.F_OK | fs.constants.R_OK, (err) => {
  //       if (err) {
  //         console.error(`${inputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  //       } else {
  //         console.log(`${inputFile} exists, and it is readable`);
  //       }
  //     });
  //     try {
  //       fs.accessSync(inputFile, fs.constants.F_OK | fs.constants.R_OK);
  //       console.log(`${inputFile} exists, and it is readable`);
  //     } catch (err) {
  //       console.error(`${inputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  //     }


  //   } else {
  //     console.log('input file not exist1');
  //   }
  // } catch(err) {
  //   console.error(err);
  //   console.log('input file not exist');
  // }

        try {
        fs.accessSync(inputFile, fs.constants.F_OK | fs.constants.R_OK);
        console.log(`${inputFile} exists, and it is readable`);
      } catch (err) {
        console.error(`${inputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is cannot be read'}`);
        process.exit(9);
      }
} else {
  inputFile = process.stdin;
}
if (input) {
  outputFile = path.resolve(output);
  // try {
  //   if (fs.existsSync(outputFile)) {
  //     console.log(outputFile);   
  //   }
  //   else {
  //     console.log('output file not exist');
  //   }
  // } catch(err) {
  //   console.log('output file not exist');
  //   console.error(err);
  // }
  try {
    fs.accessSync(outputFile, fs.constants.F_OK | fs.constants.W_OK);
    console.log(`${outputFile} exists, and it is readable`);
  } catch (err) {
    console.error(`${outputFile} ${err.code === 'ENOENT' ? 'does not exist' : 'is cannot be write'}`);
    process.exit(9);
  }
} else {
  outputFile = process.stdout;
}



pipeline(
  fs.createReadStream(inputFile),
  fs.createWriteStream(outputFile),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);