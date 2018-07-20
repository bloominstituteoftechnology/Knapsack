#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  solutions = []
  for head_item in items:
    bag = []
    head_item_index = items.index(head_item)
    if head_item_index == 0:
      rest_of_items = items[head_item_index +1:]
    else:
      rest_of_items = items[head_item_index + 1:] + items[0:head_item_index]

    for item in rest_of_items:
      bag_len = len(bag)
      bag_size = 0
      bag_value = 0
      if bag_len == 0:
        bag.append(head_item)
      for bag_item in bag:
        bag_size += bag_item[1]
        bag_value += bag_item[2]
      if item[1] + bag_size > capacity:
        if len(solutions) == 0:
          solutions.append([bag_value, bag])
          bag = []
        else:
          if solutions[0][0] < bag_value:
            solutions[0] = [bag_value, bag]
      else:
        bag.append(item)
    
  indexes = []
  cost = 0
  for item in solutions[0][1]:
    indexes.append(item.index)
    cost += item.size

  solution = {
    "value": solutions[0][0],
    "indexes": indexes,
    "cost": cost
  }
  return solution

    


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