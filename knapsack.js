const fs = require('fs') // filesystem
const argv = process.argv.slice(2)
// console.log(argv)
if (argv.length !== 2) {
  console.error('usage requires filename and capacity') // size of knapsack is capacity
}
const filename = argv[0]
const capacity = argv[1]
// console.log(capacity, 'capacity')// 100

const fileData = fs.readFileSync(filename, 'utf8')
console.log(fileData)

const lines = fileData.trim().split(/[\r\n]+/g) // /[]/ regEx \n newline +/g global + treat multiple matches as one

console.log(lines) // array of 10

const items = lines.map(line => {
  const [index, size, value] = line.split(' ')
  const rval = value / size
  return {
    index,
    size,
    value,
    rval
  }
})
items.sort((a, b) => {
  return b.rval - a.rval
})
const knapsack = {
  contains: [],
  totalValue: 0,
  totalSize: 0,
  currentCapacity: capacity
}

for (let i = 0; i < items.length; i++) {
  console.log(i, items[i].size, 'size', knapsack.currentCapacity)
  if (Number(items[i].size) <= Number(knapsack.currentCapacity)) {
    console.log('Here we are!')
    knapsack.contains.push(items[i].index)
    knapsack.totalValue += Number(items[i].value)
    knapsack.totalSize += Number(items[i].size)
    knapsack.currentCapacity -= Number(items[i].size)
  }
}

console.log(knapsack)
