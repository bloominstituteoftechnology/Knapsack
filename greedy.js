const fs = require('fs');
const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
};

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, 'utf8');
// split input data by line
const lines = filedata.trim().split(/[\r\n]+/g);

