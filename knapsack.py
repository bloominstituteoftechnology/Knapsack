#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  
  
  # # if knapsack if full
  # if capacity == 0:
  #   return 0
  # # if we made room for items  
  # if len(value) == index: 
  #   return 0
  # # if item does not fit, ignore and move to next item
  # if size[index] > capacity:
  #   return knapsack(value, size, index+1, capacity)
  # # recursive step
  
#   def knapsack_helper(items, capacity, value, bag):
#     if not items:
#       return value, bag
#     elif len(items) == 1:
#       # Check if the last item fits or not
#       if items[0].size <= capacity:
#         # take the item by setting its index in `bag` to 1
#         bag[items[0].index - 1] = 1
#         # update our total value for taking this item
#         value += items[0].value
#         return value, bag
#       else:
#         # last item doesn't fit, just discard it
#         return value, bag
#     # we still have a bunch of items to consider
#     # check to see if the item we just picked up fits in our remaining capacity
#     elif items[0].size <= capacity:
#       # we can consider the overall value of this item 
#       # make a copy of our bag
#       bag_copy = bag[:] 
#       bag_copy[items[0].index - 1] = 1
#       # we take the item in this universe
#       r1 = knapsack_helper(items[1:], capacity - items[0].size,
#                            value + items[0].value, bag_copy)
#       # we don't take the item in this universe
#       r2 = knapsack_helper(items[1:], capacity, value, bag)
#       # pick the universe that results in a larger value
#       # make sure we're comparing just the resulting values 
#       return max(r1, r2, key=lambda tup: tup[0])
#     else:
#       # item doesn't fit, discard it and continue recursing
#       return knapsack_helper(items[1:], capacity, value, bag)
#   # Initial call our recursive knapsack_helper
#   return knapsack_helper(items, capacity, 0, [0] * len(items))

# if __name__ == '__main__':
#   if len(sys.argv) > 1:
#     capacity = int(sys.argv[2])
#     file_location = sys.argv[1].strip()
#     file_contents = open(file_location, 'r')
#     items = []

#     for line in file_contents.readlines():
#       data = line.rstrip().split()
#       items.append(Item(int(data[0]), int(data[1]), int(data[2])))
    
#     file_contents.close()
#     print(knapsack_solver(items, capacity))
#   else:
#     print('Usage: knapsack.py [filename] [capacity]')

  # def knapsack_greedy(items, max_weight, keyFunc=weight):
  #   knapsack = []
  #   knapsack_weight = 0
  #   knapsack_value = 0
  #   items_sorted = sorted(items, key=keyFunc)
  #   while len(items_sorted > 0):
  #     item = items_sorted.pop()
  #     if weight(item) + knapsack_weight <= max_weight:
  #       knapsack.append(item)
  #       knapsack_weight += weight(knapsack[-1])
  #       knapsack_value += value(knapsack[-1])
  #     else:
  #       break
  #     return knapsack, knapsack_weight, knapsack_value

  def knapsack_iterative(items, capacity):
    # initialize matrix cache
    cache = [[0] * (capacity + 1) for _ in range(len(items) +1)]
    # initialize bag
    bag = set()
    # populate matrix
    for item in range(1, len(cache)):
      for size in range(len(cache[item])):
        # decide to take item out or not
        if items[item-1].size > size:
          # skip item
          cache[item][size] = cahce[item-1][size]
        else:
          # take item
          r1 = cache[item-1][size]
          r2 = cache[item-1][size-items[item-1].size + items[item-1].value]
          cache[item][size] = max(r1, r2)
    rows = len(cache) - 1
    cols = len(cache[0]) - 1

    while rows > 0 and cols > 0:
      if cache[rows][cols] != cache[rows-1][cols]:
        bad.add(rows - 1)
        rows -= 1
        cols -= items[row].size
  
  knapsack_iterative(updated, 100) 