#index, weight, value
with open("small1.txt", "r") as data:
    lines = data.readlines()
    items = []
    for line in lines:
        s = line.rstrip().split()
        item = (int(s[0]), int(s[1]), int(s[2]))
        items.append(item)
    print("items", items)

max_weight = 100


def total_value(items, max_weight):
    return sum([x[2] for x in items]) if sum([x[1] for x in items]) < max_weight else 0


cache = {}


def solve(items, max_weight):
    if not items:
        return ()
    for item in items:
        print("item:", item)
        if (item, max_weight) not in cache:
            head = items[0]
            print("head:", head)
            tail = items[1:]
            include = (head,) + solve(tail, max_weight - head[1])
            dont_include = solve(tail, max_weight)
            if total_value(include, max_weight) > total_value(dont_include, max_weight):
                answer = include
            else:
                answer = dont_include
            cache[(item, max_weight)] = answer
    return cache[(item, max_weight)]


solution = solve(items, max_weight)
print("solution:", solution)

# def item_print(solution):
#     for x in solution:
#         item_index = x[0]
#         return item_index


# print("items:", item_print(solution))
# print("value:", total_value(solution, max_weight))
# print("weight:", sum([x[1] for x in solution]))
