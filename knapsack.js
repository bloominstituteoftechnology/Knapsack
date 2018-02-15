const fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("require input file & threshold");
    process.exit(1);
}

const filename = args[0];
const threshold = args[1];

let content;

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log(`error: ${err}`);
        exit(1);
    }

    content = formatData(data);

    console.log(content);
    
});



const formatData = (data) => {
    content = data.toString().trim().split("\n");

    for (let i = 0; i < content.length; i ++) {
        content[i] = content[i].toString().split(" ");
    }

    for (let i = 0; i < content.length; i++) {
        for(var j = 0; j < content[i].length; j++) {
            content[i][j] = parseInt(content[i][j], 10);
        } 
    }

    return content;
}