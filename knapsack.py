#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  def knapsack_slover(items, capacity):
    if items == 0 or capacity == 0:
      return 0

    elif size(items) > capacity:
      result = knapsack_slover(items - 1, capacity)

    else:
      tmp1 = knapsack_slover(items -1, capacity)
      tmp2 = value[items] + knapsack_slover(items - 1, capacity - size[items])
      result = max(tmp1,tmp2)
    return result

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