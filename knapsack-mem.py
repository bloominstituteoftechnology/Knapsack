#!/usr/bin/python

import sys
from collections import namedtuple

# added a value of 'rank' this allows me to sort items by worth
Item = namedtuple('Item', ['index', 'size', 'value'])

# watched a solution online. this is my version of that solution
def knapsack_solver(items, capacity):
  n = items[-1].index
  K = [[0 for x in range(capacity+1)] for x in range(n+1)]
  
  for i in range(n+1):
    for w in range(capacity+1):
      if i==0 or w==0:
        K[i][w] = 0
      elif items[i-1].size <= w:
        K[i][w] = max(items[i-1].value + K[i-1][w-items[i-1].size], K[i-1][w])
      else:
        K[i][w] = K[i-1][w]
  # print(0 for x in range(capacity+1))
  return K[n][capacity]


# this is my solution after watching the Q/A  
def knapsack_iterative(items, capacity):
  """
  1. Initialize a cache as a matrix where the x axis is item index and y axis is capacity
  2. Seed the matrix with values 
  3. Pick out the items that we'll take in our knapsack 
  """
  # initalizing our matrix cache
  cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]
  # initialize our bag 
  bag = set()

  # populate our matrix
  for item in range(1, len(cache)):
    for size in range(len(cache[item])):
      # decide if we're going to take this item or not 
      if items[item-1].size > size:
        # skip this item
        cache[item][size] = cache[item-1][size]
      else:
        # we take the item
        r1 = cache[item-1][size]
        r2 = cache[item-1][size - items[item-1].size] + items[item-1].value
        cache[item][size] = max(r1, r2)
  
  rows = len(cache) - 1
  cols = len(cache[0]) - 1

  while rows > 0 and cols > 0:
    if cache[rows][cols] != cache[rows-1][cols]:
      bag.add(rows)
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
      items.append(Item(int(data[0]), int(data[1]), int(data[2]) ))
    
    file_contents.close()
    print(knapsack_iterative(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')