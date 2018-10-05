const fs = require('fs')

const argv = process.argv.slice(2)

if (argv.length !== 2) {
  console.error('usage: [filename] [capacity]')
  process.exit(1)
}

const filename = argv[0]
const capacity = argv[1]

const filedata = fs.readFileSync(filename, 'utf8')

const lines = filedata.trim().split(/[\r\n]+/g)
const items = lines.map(line => {
  const [index, size, value] = line.split(' ')
  const relValue = value / size
  return { index, size, value, relValue }
})
items.sort((a, b) => {
  return b.relValue - a.relValue
})

const knapsack = {
  contains: [],
  totalSize: Number(0),
  totalValue: Number(0),
  currCap: Number(capacity)
}

for (let i = 0; i < items.length; i++) {
  if (items[i].size <= knapsack.currCap) {
    knapsack.contains.push(items[i].index)
    knapsack.totalSize += Number(items[i].size)
    knapsack.totalValue += Number(items[i].value)
    knapsack.currCap -= Number(items[i].size)
  }
}

return knapsack