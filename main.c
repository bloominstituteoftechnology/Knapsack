#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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
    int selected_items_length;
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

int main(int argc, char *argv[])
{
    int id, weight, value;

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
    solution_one();
    return 0;
}