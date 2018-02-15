# index, weight, value
max_weight = 100
cache = {}

with open("small1.txt", "r") as data:
    lines = data.readlines()
    database_list = []
    for line in lines:
        s = line.rstrip().split()
        item = (int(s[0]), int(s[1]), int(s[2]))
        database_list.append(item)
    database = tuple(database_list)
    print("database", database)


def total_value(database, max_weight):
    return sum([x[2] for x in database]) if sum([x[1] for x in database]) < max_weight else 0


def solve(database, max_weight):
    if not database:
        return ()
    if (database, max_weight) not in cache:
        head = database[0]
        tail = database[1:]
        compare_a = (head,) + solve(tail, max_weight - head[1])
        compare_b = solve(tail, max_weight)
        if total_value(compare_a, max_weight) > total_value(compare_b, max_weight):
            result = compare_a
        else:
            result = compare_b
        cache[(database, max_weight)] = result
    return cache[(database, max_weight)]


solution = solve(database, max_weight)
print("solution:", solution)
print("value:", total_value(solution, max_weight))
print("weight:", sum([x[1] for x in solution]))
