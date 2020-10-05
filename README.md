# Caesar_cipher_CLI_tool
## Task 1. Caesar cipher CLI tool

**CLI tool that will encode and decode a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool should accept 4 options (short alias and full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Details:**


1. Action (encode/decode) and the shift are required, if one of them missed - an error should be shown, the process should exit with non-zero status code.
2. If the input file is missed - use stdin as an input source.
3. If the output file is missed - use stdout as an output destination.
4. If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.
5. If passed params are fine the output (file or stdout) should contain encoded/decoded content of input (file or stdin).
6. For encoding/decoding use only the English alphabet, all other characters should be kept untouched.

**Usage example:**

```bash
$ node .\caesar-cipher-cli\index.js -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node .\caesar-cipher-cli\index.js --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node .\caesar-cipher-cli\index.js --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`