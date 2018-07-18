#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  choice_cost = 0
  value = 0
  chosen = []

  for default_item in items:
    # Don't run if the first item is over capacity
    if default_item[1] <= capacity:
      total_value = default_item[2]
      total_items = [default_item[0]]
      total_cost = default_item[1]
      
      for another_item in items:
        # Don't duplicate items
        if default_item == another_item:
          pass
        
        # Don't go over capacity
        elif total_cost + another_item[1] > capacity:
          pass

        else:
          total_value += another_item[2]
          total_items.append(another_item[0])
          total_cost += another_item[1]

          if total_value > value:
            choice_cost = total_cost
            value = total_value
  return (f'Value: {value} Size: {choice_cost} Chosen: {str(chosen)[1:-1]}') 

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