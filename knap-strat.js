// const greedy = (items, capacity) => {
//     items.sort((a, b) => {
//       return b.value / b.size - a.value / a.size;
//     });
  
//     const result = {
//       knapsack: [],
//       value: 0,
//       cost: 0
//     }
  
//     items.forEach(item => {
//       if (item.size <= capacity) {
//         result.knapsack.push(item.index);
//         capacity -= item.size;
//         result.cost += item.size;
//         result.value += item.value;
//       }
//     });
//     console.log('GREEDY\n\n', result)
//     return result
//   }
//   const recursive = (items, capacity) => {
//     const recurse = (i, room) => {
//       if (i === -1) {
//         return {
//           knapsack: [],
//           value: 0,
//           cost: 0
//         }
//       }
//       const { size, value, index } = items[i]
//       if (size > room) {
//         return recurse(i - 1, space)
//       } else {
//         const noRoom = recurse(i - 1, room)
//         const Room = recurse(i - 1, room - size)
  
//         Room.value += value
  
//         if (noRoom.value > Room.value) {
//           return noRoom
//         } else {
//           Room.cost += size
//           Room.knapsack.push(index)
//           return Room
//         }
//       }
//     }
//     result = recurse(items.length - 1, capacity)
//     console.log('RECURSIVE\n\n', result)
//     return result
//   }
  
//   const iterative = (items, capacity) => {
//     let cache = [[]]
//     for (let i = 0; i <= capacity; i++) {
//       cache[0][i] = 0
//     }
  
//     for (let i = 1; i < items.length; i++) {
//       cache[i] = []
//       const { value, size } = items[i - 1]
//       for (let c = 0; c <= capacity; c++) {
//         if (size <= c) {
//           cache[i][c] = Math.max(cache[i - 1][c], value + cache[i - 1][c - size])
//         } else {
//           cache[i][c] = cache[i -1][c]
//         }
//       }
//     }
    
//     console.log(cache.pop()[capacity])
//   }
  
//   module.exports = {
//     greedy,
//     recursive,
//     iterative
//  }