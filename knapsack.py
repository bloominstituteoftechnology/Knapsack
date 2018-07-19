#!/usr/bin/python
#Tramane Hall
import sys
from collections import namedtuple


Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  best_haul = None
  highest_value = 0

  for FirstItem in items:
    haul = []
    size = 0 
    value = 0

    haul.append(FirstItem)
    size += FirstItem.size
    value += FirstItem.value

    if value > highest_value:
      best_haul = haul
      highest_value = value

    for SecondItem in items:
      if FirstItem != SecondItem:
        if SecondItem.size + size <= capacity:
          haul.append(SecondItem)
          size += SecondItem.size
          value += SecondItem.value
  
    if value > highest_value:
      best_haul = haul
      highest_value = value

  


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