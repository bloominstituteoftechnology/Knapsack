#!/usr/bin/python

import sys
from collections import namedtuple
from itertools import combinations

Item = namedtuple('Item', ['index', 'size', 'value', 'ratio'])

def knapsack_solver_very_slowly(items, capacity):
  best_set = []
  best_value = 0
  iterations = 0
  
  for i in range(1,len(items)+1):
    # print('i:',i)

    comb = combinations(items,i)
    
    for c in comb:
      iterations += 1
      c_size = sum([item.size for item in c])

      # print('c:',[e.index for e in c],'c_size:',c_size)

      if c_size <= capacity:
        c_value = sum([item.value for item in c])
        if best_value < c_value:
          best_value = c_value
          best_set = c
          
          # print('\nbest_set:',[b.index for b in c],'best_value:',best_value,'\n')

  return f'''\nItems to select: {[item.index for item in best_set]}
Total cost: {sum([item.size for item in best_set])}
Total value: {sum([item.value for item in best_set])}
Number of iterations: {iterations}'''

def knapsack_solver(items, capacity):
  sorted_items = sorted(items, key=lambda item: item.ratio, reverse=True)
  best_set = []
  current_size = 0

  for item in sorted_items:
    if item.size + current_size <= capacity:
      best_set.append(item)
      current_size += item.size
      # print('best set so far:',[item.index for item in best_set])
  
  return f'''\nItems to select: {sorted([item.index for item in best_set])}
Total cost: {sum([item.size for item in best_set])}
Total value: {sum([item.value for item in best_set])}'''

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[2])/int(data[1])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')