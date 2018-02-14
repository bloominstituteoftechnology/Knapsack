const fs = require('fs');

const args = process.argv.slice(2);

fs.readFile(filename, 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    
});