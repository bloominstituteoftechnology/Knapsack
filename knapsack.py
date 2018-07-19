#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  #print(items[:][-1])
  sorted_list = ratio_list(items)
  print(sorted_list)
 
  # Base case
  if len(items) == 0 or capacity == 0:
    return 0

  counter = 0 
  knapsack = []

  print(sorted_list[counter][2])

  while (capacity > 0) and (counter < len(sorted_list)):
    if capacity >= int(sorted_list[counter][2]):
      knapsack.append(int(sorted_list[counter][0]))
      capacity -= int(sorted_list[counter][2])
      print("capacity is ", capacity, "counter is ", counter)
    counter += 1
  
  return sorted(knapsack)

def ratio_list(items):
  number_of_items = len(items)
  sorted_list = [] * number_of_items

  for i in range(number_of_items):
    # Index, ratio, and size
    sorted_list.append([items[i][0], round((items[i][2] / items[i][1]),2), items[i][1]]) # Round was used to limit decimals to 2

  # Use the ratio of value/size and place the most convenient item at beginning of the list
  sorted_list = sorted(sorted_list, key=get_key, reverse=True)
  #print(sorted_list)
  return sorted_list

 
def get_key(item):
  return item[1]


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
