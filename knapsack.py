#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])
#                 item_set  e[0],    e[1],    e[2]

def knapsack_solver(items, capacity, value, size):
  '''
  # return subset but not the knapsack answer

  # initialize the placeholders
  knapsack = []
  best_value = 0
  max_capacity = 0

  # find the subset
  def powerset(items):
    res = []
    for item in items:
      newset = [r+[item] for r in res]
      res.extend(newset)
    return res

  print('powerset', items)

  # sum weight and value through each subset
  # update the weight and value when it finds the best value and less weight
  for item_set in powerset(items):
    set_capacity = sum([e[1] for e in item_set])
    set_value = sum([e[2] for e in item_set])
    if set_value > best_value and set_capacity <= max_capacity:
      best_value = set_value
      max_capacity = set_capacity
      knapsack = item_set
  return knapsack, best_value, max_capacity
'''

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