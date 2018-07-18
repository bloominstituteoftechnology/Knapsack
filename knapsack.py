#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])
'''
1. (W) capacity...we need to know how large of a knapsack we have
2. (Items)...available items for us to take
3. (Item)...has an index(i), a size(w), value(v)
4. (V)...size(w) * value(v)





'''
def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  pass

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