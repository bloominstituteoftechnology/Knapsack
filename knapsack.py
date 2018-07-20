#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME

  # Create a sorted list of the items ranked by value ratio or value / weight
  sorted_list = ratio_list(items)
 
  # Base case
  if len(items) == 0 or capacity == 0:
    return 0

  index = 0  
  knapsack = {'indeces':[]  , 'value': 0, 'size': 0}

  while (capacity > 0) and (index < len(sorted_list)):
    if capacity >= int(sorted_list[index][2]):
      knapsack['indeces'].append(int(sorted_list[index][0])) # Append the item index
      knapsack['size'] += sorted_list[index][2] # Add item size
      knapsack['value'] += items[sorted_list[index][0]].value # Add the value of item found by using the index from sorted_list
      capacity -= int(sorted_list[index][2])  # subtract item size from the capacity  
      #print("capacity is ", capacity, "index is ", index) # Used for debugging somehow my value result does not match the result.
    index += 1 

  print('Value:', knapsack['value'], '\nSize:', knapsack['size'], '\nChosen:')
  return (sorted(knapsack['indeces']))

def ratio_list(items):
  number_of_items = len(items)
  sorted_list = [] * number_of_items

  for i in range(number_of_items):
    # The sorted_list contains index, ratio(value/size), and size; from items
    sorted_list.append([items[i][0], round((items[i][2] / items[i][1]),2), items[i][1]]) # Round was used to limit decimals to 2

  # Use the ratio of value/size and place the most convenient item at beginning of the list
  sorted_list = sorted(sorted_list, key=lambda ratio: ratio[1], reverse=True)
  return sorted_list
 

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

'''The gunner list was taken from the chosen output in the greedy section of the large1.txt file.
This test still shows the same outcome as my result which differs from the result in greedy algorithm of
the large1.txt file '''

#gunner = [671,104,737,370,432,239,107,935,561,297,796,134,693,83,949,704,271,782,814,866,566,420,295,795,997,44,648,844,623,160,337,907,909,329,335,308,373,913,700]
#suma = 0
#for i in gunner:
#  print(i, items[i].value)
#  suma += items[i].value
#  print('suma', suma)