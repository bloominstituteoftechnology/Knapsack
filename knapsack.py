#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
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