#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
    
  def sort_value(x):
    return x[2]
  
  items.sort(key=sort_value, reverse=True)

  def max_getter(tuple, index):
    current_max = [tuple]
    currentsum = 0
    size = current_max[0][1]
    for y in range(index + 1, len(items) -1):
      if items[y][1] + size <= capacity and current_max[0] != items[y]:
        current_max.append(items[y])
        size += items[y][1]
    for element in current_max:
      currentsum += element[2]
    return [current_max, currentsum]
  
  temp = max_getter(items[0], 0)  #possible max values
  temp_one = max_getter(items[1], 1) # possible max
  temp_two = max_getter(items[2], 2) # possible max
  temp_three = max_getter(items[3], 3)  #possible max
  temp_four = max_getter(items[4], 4)  #possible max
  """temp_five = max_getter(items[5], 5)  #possible max
  temp_six = max_getter(items[6], 6)  #possible max
  temp_seven = max_getter(items[7], 7)  #possible max
  temp_eight = max_getter(items[8], 8)  #possible max
  temp_nine = max_getter(items[9], 9)  #possible max
  temp_ten = max_getter(items[10], 10)  #possible max
  temp_eleven = max_getter(items[11], 11)  #possible max
  temp_twelve = max_getter(items[12], 12)  #possible max
  temp_thirteen = max_getter(items[13], 13)  #possible max
  temp_fourteen = max_getter(items[13], 13)  #possible max
  temp_fifteen = max_getter(items[14], 14)  #possible max
  """
  
  print(temp)
  print(temp_one)
  print(temp_two)
  print(temp_three)

  def sort_result(x):
    return x[1]
    
  max_value = sorted([temp, temp_one, temp_two, temp_three], key=sort_result, reverse=True)


  dictionary = {
    'index': '',
    'weight': 0,
    'value': 0
  }

  for key in max_value[0][0]:
    dictionary['index'] += f" {key[0]}"
    dictionary['weight'] += key[1]
    dictionary['value'] += key[2]

  for key in dictionary:
    if type(dictionary[key]) == str:
      print(f"Items to select: {dictionary[key].strip()}")
    else:
        if key == 'weight':
          print(f"Total cost: {dictionary[key]}")
        else:
          print(f"Total value: {dictionary[key]}")

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