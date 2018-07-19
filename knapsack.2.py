#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  S = [[0 for x in range(capacity + 1)] for x in range(len(items) + 1)]
  iterations = 0

  for i in range(len(items) + 1):

    for s in range(capacity + 1):
      if i == 0 or s == 0:
        S[i][s] = 0
      elif items[i - 1].size <= s:
        S[i][s] = max(items[i - 1].value + S[i - 1][s - items[i - 1].size], S[i - 1][s])
        iterations += 1
      else:
        S[i][s] = S[i - 1][s]
  
  print('No. of iterations:', iterations)
  # for list in S:
  #   print(f'\n{list}\n')

  return S[len(items)][capacity]

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