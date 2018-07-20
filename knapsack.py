#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# BRUTE FORCE NAIVE SOLUTION (RECURSIVE?)

# def knapsack_solver(items, capacity):
#   def knapsack_helper(items, capacity, value, bag):
#     if not items:
#       return value, bag
#     elif len(items) == 1:
#       if items[0].size <= capacity:
#         bag[items[0].index - 1] = 1
#         value += items[0].value
#         return value, bag
#       else:
#         return value, bag
#     elif items[0].size <= capacity:
#       bag_copy = bag[:]
#       bag_copy[items[0].index - 1] = 1
#       r1 = knapsack_helper(items[:], capacity - items[0].size,
#                           value + items[0].value, bag_copy)
      
#       r2 = knapsack_helper(items[1:], capacity, value, bag)
#       return max(r1, r2, key=lambda tup: tup[0])
#     else:
#       return knapsack_helper(items[1:], capacity, value, bag)
#   return knapsack_helper(items, capacity, 0, [0] * len(items))


# ITERATIVE SOLUTION (A BETTER SOLUTION)

def knapsack_solver(items, capacity):
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
      bag.add(rows - 1)
      rows -= 1
      cols -= items[rows].size
    else: 
      rows -= 1

  return cache[-1][-1], bag

  knapsack_iterative(items, capacity)


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