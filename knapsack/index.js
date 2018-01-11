const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});


class Knapped {
    constructor() {
        this.values = [];
        this.weights = [];
        this.items = [];
        this.averages = {
            weight: 0, value: 0
        }
        this.capacity = 0;
        
        this._prompt = ' \u2B55 \u0020\u0020';
        this.linein = rl;

        this.linein.on('line', this.input.bind(this));

        this.processors = {
            default: require('./processors/defaultProcessor.js')
        };

        this.clear();
        const args = process.argv.slice(2);

        if (args.length >= 2) {
            const flags = [];
            for (let x = 1; x < args.length; x++) {
                if (args[x].slice(0,2) === '--') {
                    // its a flag, so use this
                    let f = args[x].slice(2);
                    f = f.split('=');
                    if (f.length === 2) {
                        flags.push({flag: f[0], value: f[1]});
                    } else {
                        // it's a flag without an assignment
                    }
                }
            }
            console.log(`Processing with:
        File: ${args[0]}
        Arguments: ${flags.length}`)
            for (let t = 0; t < flags.length; t++) {
                console.log(`           ${flags[t].flag} = \t${flags[t].value}`);
            }

            for (let s = 0; s < flags.length; s++) {
                switch(flags[s].flag) {
                    case 'capacity':
                        this.capacity = flags[s].value;
                        break;
                    default:
                        break;
                }
            }
            this.readFromFile([args[0]]);
            this.process([]);
            this.displayStatistics();
        }

        this.showPrompt();
    }

    checkForFile(handler) {
        if (fs.existsSync(handler)) return true;
        return false;
    }

    readFromFile(filenames = []) {
        if (filenames === null) console.log('Error reading file ', filename);
        if (filenames.length === 0) console.log('Error, no filenames specified');
        let entries = 0;
        let files = 0;
        for(let i = 0; i < filenames.length; i++) {
            if (this.checkForFile(filenames[i])) {
                files++;
                const contents = fs.readFileSync(filenames[i], 'utf8').split('\n');
                console.log(`Index\tWeight\tValue`);
                contents.forEach((line, i) => {
                    const l = line.split(' ');
                    if (l.length === 3) {
                        entries++;
                        console.log(`${i.toString().padStart(5, ' ')}\t${l[1]}\t${l[2]}`);
                        this.values[l[0] - 1] = l[2];
                        this.weights[l[0] - 1] = l[1];
                        //this.items.push({item: l[0], value: l[1], weight: l[2]});
                    }
                });
            } else {
                console.log(`!!...The path for '${filenames[i]} is not valid;'`);
            }
        }
        console.log(`.....Read {${files}} files successfully.`);
        console.log(`.....Added ${entries} entries to test with`);
    }

    addProcessor(procArr) {
        if (procArr.length < 2) {
            console.log('.....Error');
            console.log('.....Did not provide name or file argument');
            return;
        }

        if(this.checkForFile(procArr[1])) {
            this.processors[procArr[0]] = require(procArr[1]);
            console.log(`.....Added ${procArr[0]} processor`);
        } else {
            console.log(`!!...Processor file path '${procArr[1]}' was not valid;`);
        }
    }

    process(procArr) {
        let store = { 
            values: this.values, 
            weights: this.weights, 
            items: this.items, 
            averages: this.averages, 
            capacity: this.capacity 
        };
        if (procArr.length < 2) {
            // Use default processor
            store = this.processors['default'](store);
        } else if (procArr[0] === 'with') {
            const processors = procArr.slice(1);
            const curProcessorNames = Object.keys(this.processors);
            for (let i = 0; i < processors.length; i++) {
                if (curProcessorNames.includes(processors[i]))
                    store = this.processors[processors[i]](store);
            }
        }
        this.values = store.values;
        this.weights = store.weights;
        this.items = store.items;
        this.averages = store.averages;
        this.capacity = store.capacity;
    }

    readEntry(entry) {
        if (entry.length < 2) {
            console.log('Error with item properties count. Must be \'{value} {weight}\'');
            return;
        }
        this.values.push(entry[0]);
        this.weights.push(entry[1]);
        //this.items.push({item: this.items.length, value: entry[0], weight: entry[1]});
    }

    clearValues() {
        this.values = [];
        this.weights = [];
        this.items = [];
        this.averages.weight = 0;
        this.averages.value = 0;
        this.capacity = 0;
        console.log('.....Cleared values to 0');
    }
    
    setProperty(propertySet) {
        if (!propertySet.length > 2) {
            console.log('.....Unmet parameters to set property.');
            return;
        }

        let wasSet = true;
        
        switch(propertySet[0]) {
            case 'average-weight':
                this.averages.weight = propertySet[1];
                break;
            case 'average-value':
                this.averages.value = propertySet[1];
                break;
            case 'capacity':
                this.capacity = parseInt(propertySet[1]);
                break;
            default: {
                wasSet = false;
                console.log(`.....The property '${propertySet[0]}' does not exist`);
            }
        }

        console.log(`.....Set ${propertySet[0]} to ${propertySet[1]}`);
    }

    displayStatistics() {
        console.log(`
        Store:
        ----------------------------------------------------------
        # Values: \t ${this.values.length}\t\t# Weights: \t ${this.weights.length}
        Capacity: \t ${this.capacity}

        Items: ${this.items.length}
        ----------------------------------------------------------
        | Value:    | Weight:
        ----------------------------------------------------------`);
        for (let i = 0; i < this.items.length; i++) console.log(`\t| ${this.items[i].value} \t    | ${this.items[i].weight}`);
        console.log(`
        Averages:
        ----------------------------------------------------------
        Value:\t ${this.averages.value}\t\t\tWeight:\t ${this.averages.weight}        
        `);
        console.log(`
       Processors:
       ----------------------------------------------------------`);
        const procKeys = Object.keys(this.processors);
        for (let i = 0; i < procKeys.length; i++) {
            console.log(`        ${procKeys[i]}`);
        }
        console.log(`
        ----------------------------------------------------------`);
        for (let i = 0; i < this.values.length; i++) {
            console.log(`       ${this.values[i]}       ${this.weights[i]}`);
        }
    }

    quit() {
        process.exit();
    }

    clear() {
        process.stdout.write('\x1Bc');
    }

    output(input) {
        console.log(input);
    }

    showPrompt() {
        //process.stdout.write("hello: ");
       process.stdout.write(this._prompt + '');
    }

    showHelp() {
        console.log(`
    help [ ? ]
        Show this message
    quit [ q |exit ]
        Exit Program
    load [ readFile | read ]
    -- file/path/to/file
        Read file from path
    add [ include ]
        -- {int Value} {int Weight}
        Add 1 line to data
    set
        -- {string name} {value}
        Set store value
    status [ data | output ]
        Display statistics from program store
    reset
        -- Reset store values to empty state
    clear [ clearScreen | cls ]
        Clear terminal and show prompt
    addProcessor
        -- {string name} {string path}
        Add processor to the program with a path and assign a name
        See example in app folder named: 'defaultProcessor.js'
    process
        -- [ with {string name} [ {string name} {string name} ...] ]
        process store data with default processor
        Optionally, call ' with processorName' to process with a specific processor(s)
        `);
    }

    input(res) {
        const args = res.split(' ');
        switch(args[0]) {
            case 'help':
            case '?':
                this.showHelp();
                break;
            case 'quit':
            case 'q':
            case 'exit':
                this.quit();
                break;
            case 'load':
            case 'readFile':
            case 'read':
                (args.length > 1) ? this.readFromFile(args.slice(1)) : this.readFromFile();
                break;
            case 'add':
            case 'include':
                this.readEntry(args.slice(1));
                break;
            case 'set':
                this.setProperty(args.slice(1));
                break;
            case 'status':
            case 'data':
            case 'output':
                this.displayStatistics();
                break;
            case 'reset':
                this.clearValues();
                break;
            case 'clear':
            case 'clearScreen':
            case  'cls':
                this.clear();
                break;
            case 'addProcessor': {
                this.addProcessor(args.slice(1));
                break;
            }
            case 'process': {
                if (args.length >= 3) {
                    this.process(args.slice(1));
                } else {
                    this.process([]);
                }
                break;
            }
            default: {
                console.log('.....Unknown command: ', args[0]);
            }
                
        }
        this.showPrompt();
    }
    
    prompt( p = this._prompt, q = '', cb = this.output) {
        
    }
}


const knapped = new Knapped();

knapped.prompt();

/*
// Input:
 2 // Values (stored in array v)
 3 // Weights (stored in array w)
 4 // Number of distinct items (n)
 5 // Knapsack capacity (W)
 6 
 7 for j from 0 to W do:
 8     m[0, j] := 0
 9 
10 for i from 1 to n do:
11     for j from 0 to W do:
12         if w[i] > j then:
13             m[i, j] := m[i-1, j]
14         else:
15             m[i, j] := max(m[i-1, j], m[i-1, j-w[i]] + v[i])
*/