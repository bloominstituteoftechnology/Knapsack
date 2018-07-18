#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT 
  if toConsider[] or avail == 0:
          result = (0, ())
      elif toConsider[0].getUnits() > avail:
          result = maxVal(toConsider[1:], avail)
      else:
          nextItem = toConsider[0]
          withVal, withToTake = maxVal(toConsider[1:]),
                                    avail - nextItem.getUnits())
          withVal += nextItem.getValue()
          withoutVal, withoutToTake = maxVal(toConsider[1:], avail)
      if withVal > withoutVal:
              result = (withVal, withToTake + (nextItem,))
          else:
                
              result = (withoutVal, withoutToTake)
      return result                                 

  
  pass

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
