#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value', 'true_value'])

def knapsack_solver(items, capacity):
  temp = 0
  result = []
  knapsack = capacity or 100

  sort_items = sorted(items, key=lambda x: x[3]) #USE THIS INSTEAD OF ARRAY
  print(sort_items)


  while knapsack > 0:
    temp = sort_items.pop()
    print("Temp", temp)
    if sort_items == []:
      break

    for item in items:
      if item.index == temp.index:
        if item.size < knapsack:
          result.append(item.index)
          print("Result: ", result)
          knapsack -= item.size
        else: 
          continue
      else:
        continue
  result.sort(key=int)
  return result

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[2]) / int(data[1])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')