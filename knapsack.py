import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  def recursive(i,size):
    if i == 0:
      return value = 0, size = 0, chosen:[]
    elif items.size > size:
      return recursive(i-1, size)
    else:
      r0 = recursive(i-1, size)
      r1 = recursive(i-1, size-items[i].size)
      r1.value += items[i].value
    if r0.value > r1.value:
      return r0
    else:
      r1.size += items[i].size
      r1.chosen = r1.chosen.concat(i)
      return r1
    return recursive(len(items-1), capacity)


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