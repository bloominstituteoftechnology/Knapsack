// Exhaustive Solution
const knapsackExhaustive = (items, capacity) => {
    // Inner helper method to accomodate tracking state
    let knapsackRec = (items, capacity, value, taken) => {
        if ((!items || items.length === 1) && (items[0].size > capacity)) {
            // Nothing left, or one thing but it doesn't fit
            return value, taken;
        } else if (items.length === 1) {
            // One thing left, and it fits
            taken[items[0].index -1] = 1;
            value += items[0].value;
            return value, taken;
        } else if (capacity >= items[0].size) {
            // Multiple things left, head fits
            new_taken = taken.map();
            new_taken[items[0].index -1] = 1;
            return max(
                // wtf is this code QQ
            );
        } else {
            // Multiple Things left, head doesn't fit
            return // ?
        }
    }
}


// Greedy Solution
const knapsackGreedy = (items, capacity) => {
    /*
    Scalable/efficient but incorrect solution
    */
    let value, weight = 0;
    let taken = [0] * items.length;
    // Consider items by increasing order of weight by value
    let norm_items = [Item(item.index, float(item.size) / item.value, item.value)]
}







//  Dynamic Approach to the knapsack problem
const knapsackDP = (items, capacity) => {
    // Dynamic: Semi-Scalable (depends on knapsack size/available memory) correct solution
    // Initialize the knapsack matrix: rows are items (including a "no item" row)
    // Columns are integral capacities: 0, 1, 2, ..., capacity - 1, capacity
    let knapsack = [[0] * (capacity + 1)]

    const taken = [0];
}