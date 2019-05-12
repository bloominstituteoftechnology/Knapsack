#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// globals
typedef struct Item {
    int id, weight, value;
} Item;

Item items[1000];
int length = 0;
int weight_threshold = 300;


FILE *get_file_ptr(char *filename)
{
    FILE *file = fopen(filename, "r");
    if (file == NULL)
    {
        printf("Could not open file %s\n", filename);
        exit(0);
    }
    return file;
}

void print_results(Item selected_items[], int selected_items_length, int total_weight, int total_value)
{
    printf("Selected items:\n");
    for (int i = 0; i < selected_items_length; i++)
    {
        printf("%d %d %d\n", selected_items[i].id, selected_items[i].weight, selected_items[i].value);
    }
    printf("Total weight: %d\n", total_weight);
    printf("Total value: %d\n", total_value);
}

// Used to sort an array of items in descending order by value/weight ratio
int item_cmp(const void *a, const void *b)
{
    const Item *ia = (const Item *)a;
    const Item *ib = (const Item *)b;
    return ((float)ib->value / ib->weight) - ((float)ia->value / ia->weight);
}

// Sort solution
void solution_one()
{
    qsort(items, length, sizeof(Item), item_cmp);

    int total_weight = 0;
    int total_value = 0;

    Item selected_items[1000];
    int selected_items_length = 0;
    for (int i = 0; i < length; i++)
    {
        if (total_weight > weight_threshold) break;
        if (total_weight + items[i].weight > weight_threshold) continue;
        total_weight += items[i].weight;
        total_value += items[i].value;
        selected_items[selected_items_length++] = items[i];
    }

    print_results(selected_items, selected_items_length, total_weight, total_value);
}

// Brute force solution (it's definitely incomplete)
void solution_two()
{
    int max_weight = 0;
    int max_value  = 0;
    Item *max_item_list;
    int max_item_list_length = 0;
    for (int i = 0; i < length; i++)
    {
        int total_weight = items[i].weight;
        int total_value = items[i].value;

        Item selected_items[1000];
        int selected_items_length = 0;
        selected_items[selected_items_length++] = items[i];

        for (int j = 0; j < length; j++)
        {
            if (i == j) continue;
            if (total_weight + items[j].weight > weight_threshold) break;
            total_weight += items[j].weight;
            total_value += items[i].value;
            selected_items[selected_items_length++] = items[j];
        }

        if(total_value > max_value)
        {
            max_weight = total_weight;
            max_value = total_value;
            max_item_list = selected_items;
            max_item_list_length = selected_items_length;
        }
    }

    print_results(max_item_list, max_item_list_length, max_weight, max_value);
}

// Solution lecture / recursion
// Didn't have the time to refactor this to print out in the same format that the other two solutions do
int max(int a, int b) { return a > b ? a : b; }
int solution_three(int itemNum)
{
    if (itemNum == 0 || weight_threshold == 0) return 0;

    if (items[itemNum - 1].weight > weight_threshold) return solution_three(itemNum - 1);

    else return max(
        items[itemNum - 1].value + solution_three(itemNum - 1),
        solution_three(itemNum - 1)
    );
}


int main(int argc, char *argv[])
{
    int id, weight, value;

    // build an array of items
    FILE *file = get_file_ptr(argv[1]);
    int i = 0;
    while(fscanf(file, "%d %d %d\n", &id, &weight, &value) != EOF)
    {
        Item item;
        item.id = id;
        item.weight = weight;
        item.value = value;
        items[i] = item;
        i++;
    }
    length = i;
    fclose(file);

    // solutions can be commented and uncommented to be implemented
    solution_one();
    // solution_two();
    // printf("best value: %d\n", solution_three(length));

    return 0;
}