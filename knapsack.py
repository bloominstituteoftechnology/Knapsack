#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  d = {}
  for index, item in enumerate(items):
    d.update({index:float(item[2]) / float(item[1])})
  d_sorted = sorted(d.items(), key=lambda kv: kv[1], reverse=True)
  cost_sum = 0
  value_sum = 0 
  chosen_list = []
  for index, ratio_tuples in enumerate(d_sorted):
    cost = items[ratio_tuples[0]][1]
    value = items[ratio_tuples[0]][2]
    chosen = items[ratio_tuples[0]][0]
    if cost + cost_sum > capacity:
      for ratio_tuples in d_sorted[index + 1:]:
        if cost_sum >= capacity:
          break
        cost = items[ratio_tuples[0]][1]
        value = items[ratio_tuples[0]][2]
        chosen = items[ratio_tuples[0]][0]
        if cost + cost_sum <= capacity:
          cost_sum += cost
          value_sum += value
          chosen_list.append(chosen)
      break
    else:
      cost_sum += cost
      value_sum += value
      chosen_list.append(chosen)
  return (value_sum, cost_sum, chosen_list)

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