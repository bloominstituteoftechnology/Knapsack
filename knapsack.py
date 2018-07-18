#!/usr/bin/python

import sys
import math
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  knapsack = []
  total_cost = []
  def naive_knapsack(index, capacity):
    if index == 0 or capacity == 0:
      return 0
    elif items[index][1] > capacity:
      result = naive_knapsack(index-1, capacity)
    else:
      option1 = naive_knapsack(index-1, capacity)
      option2 = items[index][2] + naive_knapsack(index-1, capacity-items[index][1])
      if option2 > option1:
        if items[index][0] not in knapsack:
          knapsack.append(items[index][0])
          total_cost.append(items[index][1])
        result = option2
      else:
        result = option1
    return result
  # total_cost = sum(total_cost)
  result = naive_knapsack(len(items)-1, capacity)
  return "\nitems to select: %s\ntotal cost: %s\ntotal value: %s" %(knapsack, total_cost, result)
  # return "\nitems to select: %s\ntotal cost: %s\ntotal value: %s" %(knapsack, total_cost, total_value)
    
    
      

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