const fs = require('fs');

const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exir(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Reas the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);
