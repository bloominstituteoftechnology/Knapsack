#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  knapsack, total_cost, total_value = [], 0, 0
  while capacity > 0:
    biggest_gain, cost, value, chosen_item = -1, 0, 0, None
    for item in items:
      ratio = item.value/item.size
      if item.size <= capacity and ratio > biggest_gain:
        biggest_gain = ratio
        chosen_item = item
        value = item.value
        cost = item.size
    if chosen_item == None:
      capacity = 0
      break
    else:
      knapsack.append(chosen_item.index)
      total_cost += cost
      total_value += value
      items.remove(chosen_item)
      capacity -= cost
  return "Value: %s\nSize: %s\nChosen: %s" %(total_value, total_cost, knapsack)

    
      

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