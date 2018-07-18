#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  diffs = sorted(items, key=lambda x: (x[2]*1000)/(x[1]), reverse=True)
  res = []
  curSum = 0
  
  for diff in diffs:
    print(diff[0], diff[1], diff[2], (diff[2]*1000)/(diff[1]))
    
  for diff in diffs:
    if curSum + diff[2] < capacity:
      curSum += diff[2]
      res.append(diff[0])
    else:
      res.append(diff[0])
      return res

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