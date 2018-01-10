import os.path
import sys

class Item:
  def __init__(self, id, weight, value):
    try:
      id = int(id)
    except:
      raise ValueError('Expected id to be an Integer.')
    try:
      weight = int(weight)
    except:
      raise ValueError('Expected weight to be an Integer.')
    try:
      value = int(value)
    except:
      raise ValueError('Expected value to be an Integer.')
    self.id = id
    self.weight = weight
    self.value = value

class Knapsack:
  def __init__(self, max_weight):
    self.max_weight = max_weight
    self.inventory = []

  def add_item(self, item): # O(n) or O(2n)
    if isinstance(item, Item):
      self.inventory.append(item)
      if (self.get_weight() > self.max_weight):
        self.auto_drop_item()
    else:
      raise ValueError('Expected an Item.')

  def auto_drop_item(self): # O(n)
    worst_item = { 'index': -1, 'ratio': 10000 }
    for index, held_item in enumerate(self.inventory):
      ratio = held_item.value / held_item.weight
      if ratio < worst_item['ratio']:
        worst_item['index'] = index
        worst_item['ratio'] = ratio
    if worst_item['index'] > -1:
      self.inventory.pop(worst_item['index'])
    if (self.get_weight() > self.max_weight):
        self.auto_drop_item()

  def drop_item(self, item): # O(log n) or O(n)
    if isinstance(item, Item) or type(item) == int:
      item_id = item if type(item) == int else item.id
      for index, held_item in enumerate(self.inventory):
        if held_item.id == item_id:
          return self.inventory.pop(index)

  def get_weight(self): # O(n)
    current_weight = 0
    for item in self.inventory:
      current_weight += item.weight
    return current_weight

  def get_knap_value(self): # O(n)
    current_value = 0
    for item in self.inventory:
      current_value += item.value
    return current_value

  def print_inventory(self): # O(3n log n)
    ids = []
    total_weight = 0
    total_value = 0
    for item in self.inventory:
      ids.append(item.id)
      total_weight += item.weight
      total_value += item.value
    print('Items: ', end='')
    for index, id in enumerate(ids):
      print(id, end=', ' if index < len(ids) - 1 else '')
    print('');
    print('Weight: %d' % total_weight)
    print('Value: %d' % total_value)



def run():
  if len(sys.argv) != 3:
    return print('usage: knapsack <filepath> --threshold=<max threshold integer>')
  threshold = None
  knapsack = None
  file_name = sys.argv[1]
  try:
    threshold = int(sys.argv[2].split('=')[1])
  except:
    return print('--threshold must equal an integer')
  knapsack = Knapsack(threshold)
  if not os.path.isfile(file_name):
    return print('File "%s" not found' % file_name)
  with open(file_name, 'r') as file:
    line = file.readline().strip()
    count = 0
    while line:
      count+=1
      split = line.split(' ')
      if len(split) == 3:
        knapsack.add_item(Item(split[0], split[1], split[2]))
      else:
        raise ValueError('Bad item data on line %d in file ""' % (count, file_name))
      line = file.readline().strip()
  knapsack.print_inventory()

if __name__ == '__main__':
  run();


# small1.txt
  # Items: 1, 7, 8
  # Weight: 78
  # Value: 197
# small2.txt
  # Items: 1, 9, 10
  # Weight: 68
  # Value: 259
# small3.txt
  # Items: 4, 7, 9
  # Weight: 50
  # Value: 114
# medium1.txt
  # Items: 44, 49, 60, 77, 80, 83, 94, 104, 107, 117, 134, 157, 160, 170
  # Weight: 91
  # Value: 1009
# medium2.txt
  # Items: 1, 10, 28, 66, 120, 139, 145, 153, 155, 174, 188, 191, 200
  # Weight: 100
  # Value: 956
# medium3.txt
  # Items: 9, 14, 15, 47, 68, 116, 120, 133, 154, 158, 161, 164, 170, 181, 198
  # Weight: 94
  # Value: 847
# large1.txt
  # Items: 44, 83, 104, 107, 134, 160, 239, 271, 295, 297, 308, 329, 335, 337, 370, 373, 420, 432, 561, 566, 623, 648, 671, 693, 704, 737, 782, 795, 796, 814, 844, 866, 907, 909, 913, 935, 949, 997
  # Weight: 99
  # Value: 2628
