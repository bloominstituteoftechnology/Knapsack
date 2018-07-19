#!/usr/bin/python
#Tramane Hall
import sys
from collections import namedtuple


Item = namedtuple('Item', ['index', 'size', 'value'])

'''
Greedy Strategy
  1. Go through our items and filter out any items whose size > knapsack's capacity
  2. 'Score' each item by determining its value/weight ratio
  3. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  4. Grab items off the top of the items array until we reach our knapsack's full capacity

'''

def knapsack_solver(items, capacity):
  best_haul = []
  highest_value = 0

  for item in items:
     Prehaul = []
     for FirstItem in items:
      haul = []
      size = 0 
      value = 0

      haul.append(FirstItem)
      size += FirstItem.size
      value += FirstItem.value
      print(size, value)
     
      if value > highest_value:
        #if FirstItem != haul[0]:
          if size <= capacity:
            best_haul = haul
            Prehaul.append(haul[0])
            highest_value = value

  return best_haul

'''
    for SecondItem in items:
      if FirstItem != SecondItem:
        if SecondItem.size + size <= capacity:
          haul.append(SecondItem)
          size += SecondItem.size
          value += SecondItem.value
  
    if value > highest_value:
      best_haul = haul
      highest_value = value
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