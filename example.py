
#!/usr/bin/python3
import operator
import sys

items = [ [20, 50], [15, 45], [10, 35], [20, 35], [25, 30], [30, 30], [15, 20], [10, 15], [5, 10], [20, 10] ]
weight_capacity = 166


def value(item): return item[0]
def weight(item): return item[1]

def weight_items(items):
	return sum(weight(item) for item in items)

def value_items(items):
	return sum(value(item) for item in items)

def value_weight_ratio(item):
	return float(value(item)) / weight(item)

def items_with_ratios(items):
	return [item + [value_weight_ratio(item)] for item in items]

def sort_items_with_ratios(items):
	return sorted(items, key=operator.itemgetter(2), reverse=True)

def fractional_knapsack(items, weight_capacity):
	weight_current = 0
	value_current = 0
	items_sorted = sort_items_with_ratios(items_with_ratios(items))

	print('#1) Optimal greedy solution for fractional knapsack\n')
	print('1. items are sorted by value-to-weight ratios as below')
	print("2. pick items until the current item's weight exceeds weight_capacity")
	print("3. for the last item, only pick portion (weight_capacity - weight_current) / weight(item)\n")

	print("https://en.wikipedia.org/wiki/Continuous_knapsack_problem")

	print('\n*** KNAPSACK CONTENTS (REUSED FOR THE OTHER VARIANTS) ***')
	print('weight_capacity = %d' % weight_capacity)
	print('(val  wt  val/wt)')
	for item in items_sorted: sys.stdout.write( '(%-4d %-4d %-4.2f)\n' % (value(item), weight(item), value_weight_ratio(item)) )
	sys.stdout.write('\n')

	print('*** GREEDY-KNAPSACK EXECUTION ***')
	items_taken = []
	for item in items_sorted:
		if weight_current + weight(item) < weight_capacity:
			weight_current += weight(item)
			value_current += value(item)
			items_taken.append(item)
			print('added item with (value, weight) = (%s, %s)' % (value(item), weight(item)))
		else:
			portion = (weight_capacity - weight_current) / float(weight(item))
			weight_current += portion*weight(item)
			value_current += portion*value(item)
			print('added PORTION %.2f of item with (value, weight) = (%s, %s), contributing only (%s, %.2f)' %\
					(portion, value(item), weight(item), portion*value(item), portion*weight(item)))
			print('current weight of knapsack is %d (full)' % weight_current)
			print('current value of knapsack is', value_current)
			print('')
			break

discrete_knapsack_calls = 0

def discrete_knapsack(items, size, weight_capacity):
	# items is the list of [value, weight]
	# size is the size of the list
	# weight_capacity is the maximum weight the knapsack can hold

	global discrete_knapsack_calls
	discrete_knapsack_calls += 1

	# item is the item in the knapsack we are deciding whether to keep or leave
	item = items[size-1]

	# item is the only item; decide whether to keep or leave it based on weight
	if size == 1:
		if weight(item) <= weight_capacity:
			return [item]
		else:
			return []

	# size > 1
	items_leave = discrete_knapsack(items, size-1, weight_capacity)

	items_keep = items_leave
	if weight_capacity - weight(item) >= 0:
		items_keep = discrete_knapsack(items, size-1, weight_capacity-weight(item)) + [item]

	if value_items(items_leave) >= value_items(items_keep):
		return items_leave
	return items_keep


discrete_knapsack_memo_calls = 0

def discrete_knapsack_memo(items, size, weight_capacity, dptable):
	# items is the list of [value, weight]
	# size is the size of the list
	# weight_capacity is the maximum weight the knapsack can hold

	global discrete_knapsack_memo_calls
	discrete_knapsack_memo_calls += 1

	# item is the item in the knapsack we are deciding whether to keep or leave
	item = items[size-1]

	# item is the only item; decide whether to keep or leave it based on weight
	if size == 1:
		if weight(item) <= weight_capacity:
			dptable[size][weight_capacity] = [item]
			return [item]
		else:
			dptable[size][weight_capacity] = []
			return []

	# size > 1
	if dptable[size-1][weight_capacity] is not None:
		items_leave = dptable[size-1][weight_capacity]
	else:
		items_leave = discrete_knapsack_memo(items, size-1, weight_capacity, dptable)

	items_keep = items_leave
	if weight_capacity - weight(item) >= 0:
		if dptable[size-1][ weight_capacity-weight(item)] is not None:
			items_keep = dptable[size-1][ weight_capacity-weight(item)] + [item]
		else:
			items_keep = discrete_knapsack_memo(items, size-1, weight_capacity-weight(item), dptable) + [item]

	if items_leave >= items_keep:
		dptable[size][weight_capacity] = items_leave
		return items_leave

	dptable[size][weight_capacity] = items_keep
	return items_keep
	


def discrete_knapsack_memo_toplevel(items, size, weight_capacity):
	dptable = [[ None for j in range(weight_capacity+1)] for i in range(len(items)+1)]
	return discrete_knapsack_memo(items, size, weight_capacity, dptable)




def discrete_knapsack_dp_trace_solution(dptable, items):
	

	item_idx = len(dptable) - 1
	weight_idx = len(dptable[item_idx]) - 1

	knapsack = []

	print('tracing solution from table')
	while item_idx != -1:
		next_item_idx, next_weight_idx = dptable[item_idx][weight_idx][1]

		if weight_idx > next_weight_idx:
			print('took item with (value, weight) = (%d, %d)' % (value(items[item_idx]), weight(items[item_idx])))
			knapsack.append(items[item_idx])

		item_idx, weight_idx = next_item_idx, next_weight_idx
	return knapsack


def discrete_knapsack_dp(items, weight_capacity):
	dptable = [[[-1, (-1,-1)] for j in range(weight_capacity+1)] for i in range(len(items))]
	VALUE = 0
	PARENT = 1

	steps = 0
	for item_idx in range(len(dptable)):
		for weight_idx in range(len(dptable[item_idx])):
			steps += 1

			if item_idx == 0:
				if weight_idx >= weight(items[item_idx]):
					dptable[item_idx][weight_idx][VALUE] = value(items[item_idx])
				else:
					dptable[item_idx][weight_idx][VALUE] = 0
			else:
				value_if_leaveitem = dptable[item_idx - 1][weight_idx][VALUE]

				keepitem_weight_idx = weight_idx - weight(items[item_idx])
				value_if_keepitem = value_if_leaveitem - 1
				if keepitem_weight_idx >= 0:
					value_if_keepitem = dptable[item_idx - 1][keepitem_weight_idx][VALUE] + value(items[item_idx])

				if value_if_leaveitem >= value_if_keepitem:
					dptable[item_idx][weight_idx][VALUE] = value_if_leaveitem
					dptable[item_idx][weight_idx][PARENT] = (item_idx - 1, weight_idx)
				else:
					dptable[item_idx][weight_idx][VALUE] = value_if_keepitem
					dptable[item_idx][weight_idx][PARENT] = (item_idx - 1, keepitem_weight_idx)

	print('max value =', dptable[len(items)-1][weight_capacity][VALUE])
	print('number of iterations = (weight_capacity+1) * len(items) = %d' % ((weight_capacity+1) * len(items)))
	print('the number of columns in the table is weight_capacity+1, since it goes from 0 through weight_capacity')
	print('this also allows for items with weights in the range [0, weight_capacity]\n')
	return discrete_knapsack_dp_trace_solution(dptable, items)


def main():

	fractional_knapsack(items, weight_capacity)

	print('------------------------------\n')

	print('#2) recursive top-down discrete 0-1 knapsack with no optimization\n')
	print("https://en.wikipedia.org/wiki/Knapsack_problem#Definition")
	print("")
	knapsack = discrete_knapsack(items, len(items), weight_capacity)
	print('final items in knapsack =', knapsack)
	print('number of items taken =', len(knapsack))
	print('value =', value_items(knapsack))
	print('weight =', weight_items(knapsack))
	print('number of recursive calls =', discrete_knapsack_calls)

	print('\n------------------------------\n')

	print('#3) dynamic programming solution to discrete 0-1 knapsack\n')
	print("https://en.wikipedia.org/wiki/Knapsack_problem#0/1_knapsack_problem")
	print("")
	knapsack = discrete_knapsack_dp(items, weight_capacity)
	print('value =', value_items(knapsack))
	print('weight =', weight_items(knapsack))

	print('\n------------------------------\n')

	print('#4) recursive top-down 0-1 discrete knapsack with memoization\n')
	knapsack = discrete_knapsack_memo_toplevel(items, len(items), weight_capacity)
	print('number of recursive calls =', discrete_knapsack_memo_calls)
	print('final items in knapsack =', knapsack)
	print('value =', value_items(knapsack))
	print('weight =', weight_items(knapsack))


if __name__ == "__main__":
	main()