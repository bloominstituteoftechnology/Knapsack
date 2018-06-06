const fs = require('fs')

/*
Greedy Strategy
0. Go through our items and filter out any items whose size > knapsack's capacity
1. 'Score' each item by determining its value/weight ratio
2. Sort the items array by each item's ratio such that the items with the best ratio
are at the top of the array of items
3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2)

if (argv.length != 2) {
  console.error('usage: filename capicity')
  process.exit(1)
}

const filename = argv[0]
const capacity = parseInt(argv[1])

const filedata = fs.readFileSync(filename, 'utf8')

const lines = filedata.trim().split(/[\r\n]+/g)

const items = []

for (let l of lines) {
  const [index, value, size] = l.split(' ').map(li => parseInt(li))
  items.push({ index, value, size })
}

const noFatItems = items.filter(({ size }) => size < capacity)

const scoreItem = item => {
  const score = item.value / item.size
  return Object.assign({}, item, { score })
}

const scoredItems = noFatItems.map(item => scoreItem(item))
const sortedScoredItems = scoredItems.sort((a, b) => b.score - a.score)

class Knapsack {
  constructor(threshold){
    this.threshold = threshold
  }
  
}
console.log(sortedScoredItems)
