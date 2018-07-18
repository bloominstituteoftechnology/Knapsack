#!/usr/bin/python
"""
value / weight = most val per pound
sort val
iterate through.

go through pick 
notes:
m(i, w) maxium that can be attained with weight <= w
m(0,w) = 0  no items = no value
m(i, 0) = 0 no allowed weight means no items
m(i,w) = m(i - 1, w) if w(i) > w  ((w is weight limit))
m(i,w) = max(m(i - 1, w)), w(i) + m(i-1, w - w(i))
"""

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  max_value_list = []
  print(items)
  for i, c, v in items:
    max_val = i, c, v, ((v // c) * 100)
    max_value_list.append(max_val)
    
  print(max_value_list)

  
  
  """if items < 1 or capacity < 1:
    return 0  
  new_item = []
  for i in items:
    new_item.append(i)
    new_item.reverse()
  print(sorted(new_item, key=lambda value: value[2], reverse=True))

  """
  #print(isinstance(items, list))
  
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