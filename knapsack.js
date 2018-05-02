const fs = require('fs');

fs.readFile(`./data/${process.argv[2]}`, (err, data) => {
  if (err) {
    console.error('Could not find file')
    process.exit(1)
  }
  const dataArray = data
    .toString()
    .trim()
    .split('\r\n')

  console.log(dataArray);
})