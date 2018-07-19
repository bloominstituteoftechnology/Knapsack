#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# taken = [0] * len(items)
items = []

def knapsack_solver(items, capacity):
    def knapsack_helper(items, capacity, value, taken):
        if not items:
            return value, taken
        elif len(items) == 1:
            if items[0].size <= capacity:
                taken[items[0].index - 1] = 1
                value += items[0].value
                return value, taken
            else:
                return value, taken

        elif items[0].size <= capacity:
            taken_copy = taken[:]
            taken_copy[items[0].index-1] = 1
            r1 = knapsack_helper(
                items[1:], capacity - items[0].size, value + items[0].value, taken_copy)
            r2 = knapsack_helper(items[1:], capacity, value, taken)
            return max(r1, r2, key=lambda tup: tup[0])
        else:
            return knapsack_helper(items[1:], capacity, value, taken)
    return knapsack_helper(items, capacity, 0, [0] * len(items))

def knapsack_iterative(items, capacity):
  """
  1. initialize a cache as a matrix where the x axis is item index and y axis is capcity
  2. seed the matrix with values
  3. pick out the items that we'll take in our knapsack
  4.
  """
  # initializing our matrix cache
  cache = [[0] * (capacity + 1) for _ in range(len(items)+1)]
  #initialize taken
  taken = set()

  #populate our matrix
  for item in range(1, len(cache)):
    for size in range(len(cache[item])):
      #decide if we're going to take this item or not
      if item[item-1].size > size:
        cache[item][size] = cache[item-1][size]
      else:
        # we take the item
        r1 = cache[item-1][size]
        r2 = cache[item-1][size-items[item-1].size + items[item-1].value]
        cache[item][size] = max(r1, r2)
        
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
  else:
    print('Usage: knapsack.py [filename] [capacity]')
