#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  """-------------------
  def naiveRecurse(i, size):
    if i == -1:
      return {'value': 0, 'size': 0, 'chosen': []}
    elif items[i].size > size:
      return naiveRecurse(i - 1, size)
    else:
      r0 = naiveRecurse(i - 1, size) #if we dont meet if statement, we store next items size here
      r1 = naiveRecurse(i - 1, size - items[i].size) #we hold the remaining size in bag here

      r1.value += items[i].value

      if r0.value > r1.value:
        return r0
      else: 
        r1.size += items[i].size
        r1.chosen = r1.chosen.concat(i + 1)
        return r1

  return naiveRecurse(len(items) - 1, capacity)
-------------------"""
#recursively checking all combinations
  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:
      if items[0].size <= capacity:
        bag[items[0].index - 1] = 1
        value += items[0].value
        return value, bag
      else:
        return value, bag
    elif items[0].size <= capacity:
      bag_copy = bag[:]
      bag_copy[items[0].index - 1] = 1
      r1 = knapsack_helper(items[1:], capacity - items[0].size, 
                           value + items[0].value, bag_copy)
      r2 = knapsack_helper(items[1:], capacity,value,bag)
      return max(r1,r2, key=lambda tup: tup[0])
    else:
      return knapsack_helper(items[1:], capacity, value, bag)
  return knapsack_helper(items, capacity, 0, [0] * len(items))

#Greedy Algorithm
def anotherKnapsack(items, capacity):
  def greedyAl(items, capacity):
    result = {
      'size': 0,
      'value': 0,
      'chosen': []
    }
    items = sorted(items, key=lambda i: i.size / i.value)
    for item in items:
      if item.size <= capacity:
        chosen.append(item.index)
        capacity -= item.size
        value += item.value
    return  [value, chosen]
    
    return items

#Iterative Knapsack
def iterative_knapsack(items, capacity):
  cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]
  bag = set()
#populate matrix
  for item in range(1, len(cache)):
    for size in range(len(cache[item])):
      #decide if we're going to take this item or not
      if items[item - 1].size > size:
        #skip this item
        cache[item][size] = cache[item - 1][size]
      else:
        #we take the item
        r1 = cache[[item - 1][size]]
        r2 = cache[item - 1][size - items[item - 1].size] + items[item - 1].size.value
        cache[item][size] = max(r1, r2)

  print(cache)
  rows = len(cache) - 1
  cols = len(cache[0]) - 1

  while rows > 0 and cols > 0:
    if cache[rows][cols] != cache[rows - 1][cols]:
      bag.add(rows - 1)
      rows -= 1
      cols -= items[rows].size
    else:
      rows -= 1
  return cache[-1][-1], bag

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
    print(anotherKnapsack(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')