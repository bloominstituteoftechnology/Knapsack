#!/usr/bin/python

import sys
from collections import namedtuple

# added a value of 'rank' this allows me to sort items by worth
Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # print(items)
  # Recursively checking all combinations of items
  # inputs: items, capacity, total value, taken items
  # returns: the resulting value and the taken array of taken items
  def knapsack_helper(items, capacity, value, bag):
    print(len(items), capacity, value, bag)
    if not items:
      return value, bag
    elif len(items) == 1:
      # Check if the last item fits or not
      if items[0].size <= capacity:
        # take the item by setting its index in `bag` to 1
        bag[items[0].index - 1] = 1
        # update our total value for taking this item
        value += items[0].value
        return value, bag
      else:
        # last item doesn't fit, just discard it
        return value, bag
    # we still have a bunch of items to consider
    # check to see if the item we just picked up fits in our remaining capacity
    elif items[0].size <= capacity:
      # we can consider the overall value of this item 
      # make a copy of our bag
      bag_copy = bag[:] 
      bag_copy[items[0].index - 1] = 1
      # we take the item in this universe
      r1 = knapsack_helper(items[1:], capacity - items[0].size,
                           value + items[0].value, bag_copy)
      # we don't take the item in this universe
      r2 = knapsack_helper(items[1:], capacity, value, bag)
      # pick the universe that results in a larger value
      # make sure we're comparing just the resulting values 
      return max(r1, r2, key=lambda tup: tup[0])
    else:
      # item doesn't fit, discard it and continue recursing
      return knapsack_helper(items[1:], capacity, value, bag)
  # Initial call our recursive knapsack_helper
  return knapsack_helper(items, capacity, 0, [0] * len(items))

  



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
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')