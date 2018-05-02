const fs = require('fs');

const exhaustive = () => {
};

function readFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('usage: extractlinks inputfile followed by threshold');
    process.exit(1);
  }

  const filename = args[0];
  const data = fs.readFileSync(`./data/${filename}`, 'utf-8');
  let parsed = data.trim().split('\n').map(each => each.split(' '));
  parsed = parsed.map(each => [Number(each[0]), Number(each[1]), Number(each[2])]);
  console.log(parsed);
}

readFile();