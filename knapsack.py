#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  def ks_helper(items, capacity, value, bag):
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
      branch_1 = ks_helper(items[1:], capacity - items[0].size,
                           value + items[0].value, bag_copy)
      branch_2 = ks_helper(items[1:], capacity, value, bag)
      return max(branch_1, branch_2, key=lambda tup: tup[0])
    else:
      return ks_helper(items[1:], capacity, value, bag)
  return ks_helper(items, capacity, 0, [0] * len(items))

def ks_iterative(items, capacity):
  cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]
  bag = set()

  for item in range(1, len(cache)):
    for size in range(len(cache[item])):
      if items[items-1].size > size:
        cache[item][size] = cache[item-1][size]
      else:
        branch_1 = cache[item-1][size]
        branch_2 = cache[item-1][size - items[item-1].size] + items[item-1].value
        cache[item][size] = max(branch_1, branch_2)
  
  rows = len(cache) - 1
  cols = len(cache[0]) - 1

  while rows > 0 and col > 0:
    if cache[rows][cols] != cache[rows-1][cols]:
      bag.add(rows - 1)
      rows -= 1
      cols -= items[rows].size
    else:
      rows -= 1
  
  return cache[-1][-1], bag
  return ks_iterative(items, capacity)

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
    print("Recursive: ", knapsack_solver(items, capacity))
    # print("Memoization: ", memo_knap(items, capacity))
    print("Iterative: ", ks_iterative(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')
