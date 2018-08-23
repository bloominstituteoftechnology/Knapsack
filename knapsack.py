#!/usr/bin/python

import sys
from collections import namedtuple


Item = namedtuple('Item', ['index', 'size', 'value', 'ratio'])

# okay so let's try to implement the brute-force version
# I don't know why but I keep going in circles with this one
# 



# greedy version--seems to work
def knapsack_solver(items, capacity):
    items_sorted_by_ratios = (sorted(items, key=lambda x: x.ratio))
    knapsack = []
    total_value = 0
    total_weight = 0
    avail_weight = capacity
    
    for i in reversed(items_sorted_by_ratios):
        if i.size <= avail_weight:
          knapsack.append(i)
          avail_weight -= i.size
          total_value += i.value
          total_weight += i.size
    knapsack.append(['total value: ', total_value])
    knapsack.append(['total weight: ', total_weight])
    return knapsack




if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[2]) / int(data[1])))
    
    file_contents.close()
    print("Here are the contents of your knapsack: ", knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')