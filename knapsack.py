#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  """-------------------
  def naiveRecurse(i, size):
    if i == -1:
      return {'value': 0, 'size': 0, 'chosen': []}
    elif items[i].size > size:
      return naiveRecurse(i - 1, size)
    else:
      r0 = naiveRecurse(i - 1, size) #if we dont meet if statement, we store next items size here
      r1 = naiveRecurse(i - 1, size - items[i].size) #we hold the remaining size in bag here

      r1.value += items[i].value

      if r0.value > r1.value:
        return r0
      else: 
        r1.size += items[i].size
        r1.chosen = r1.chosen.concat(i + 1)
        return r1

  return naiveRecurse(len(items) - 1, capacity)
-------------------"""
#recursively checking all combinations
  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:
      if items[0].size <= capacity:
        bag[items[0].index - 1] = 1
        value += items[0].value
        return value, bag
      else:
        return value, bag
    elif items[0].size <= capacity:
      bag_copy = bag[:]
      bag_copy[items[0].index - 1] = 1
      r1 = knapsack_helper(items[1:], capacity - items[0].size, 
                           value + items[0].value, bag_copy)
      r2 = knapsack_helper(items[1:], capacity,value,bag)
      return max(r1,r2, key=lambda tup: tup[0])
    else:
      return knapsack_helper(items[1:], capacity, value, bag)
  return knapsack_helper(items, capacity, 0, [0] * len(items))

#Greedy Algorithm

def greedyAl(items, capacity):
  result = {
    'size': 0,
    'value': 0,
    'chosen': []
  }
  sorted(items)
  print(items)
  return items

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