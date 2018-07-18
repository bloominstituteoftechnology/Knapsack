#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # Greedy Algorithm
  valuable_chosen_items = []
  total_cost_of_chosen_items = 0
  running_total_cost = 0

  # variables for print statements
  item_nums_list = []
  total_value = 0

  # sorted by value in descending order 
  items_sorted_by_value = sorted(items, key=lambda item:item[2]/item[1], reverse=True)
  print(items_sorted_by_value)

  for item in items_sorted_by_value:
    if item[1] + running_total_cost < capacity:
      valuable_chosen_items.append(item)
      running_total_cost += item[1]
  
  for chosen_item in valuable_chosen_items:
    item_nums_list.append(chosen_item[0])
  
  for chosen_item in valuable_chosen_items:
    total_value += chosen_item[2]

  
  print('Items to select:' + str(item_nums_list[:]))
  print('Total cost: ' + str(running_total_cost))
  print('Total value: ' + str(total_value))
  return valuable_chosen_items
    


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