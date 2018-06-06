// O(n)
const greedy = (items, capacity) => {
  items.sort((a, b) => {
    return b.value / b.size - a.value / a.size;
  });

  const result = {
    knapsack: [],
    value: 0,
    cost: 0
  }

  items.forEach(item => {
    if (item.size <= capacity) {
      result.knapsack.push(item.index);
      capacity -= item.size;
      result.cost += item.size;
      result.value += item.value;
    }
  });
  console.log('GREEDY\n\n', result)
  return result
}

module.exports = {
  greedy,
}