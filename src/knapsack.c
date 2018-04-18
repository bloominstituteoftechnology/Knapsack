#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

int open_treasure_chest(char *filename)
{
  return open(filename, O_RDONLY);
}

int close_treasure_chest(int fd)
{
  return close(fd);
}

typedef struct item
{
  int id;
  int weight;
  int value;
} item;

item *create_item(int id, int weight, int value)
{
  item *item = malloc(sizeof(item));

  item->id = id;
  item->weight = weight;
  item->value = value;

  return item;
}

int read_file(int fd, item *treasure_chest)
{
  char buffer[10000];

  lseek(fd, 0, SEEK_SET);

  int bytes_read = read(fd, buffer, sizeof buffer);
  buffer[bytes_read] = '\0';

  if (bytes_read < 0)
  {
    perror("read");
    exit(1);
  }

  int i = 0;
  char tmp[8];
  char merge[2];

  int id = -1;
  int weight = -1;
  int value = -1;

  int chest_i = 0;

  while (buffer[i] != '\0')
  {
    char c = buffer[i++];

    if (c == '\n')
    {
      value = atoi(tmp);
      strcpy(tmp, "");

      treasure_chest[chest_i++] = *create_item(id, weight, value);

      id = -1;
      weight = -1;
      value = -1;
    }
    else if (c == ' ')
    {
      if (id == -1)
        id = atoi(tmp);
      else if (weight == -1)
        weight = atoi(tmp);
      else
        printf("This should not print!");

      strcpy(tmp, "");
    }
    else
    {
      merge[0] = c;
      merge[1] = '\0';
      strcat(tmp, merge);
    }
  }

  return chest_i;
}

int get_method()
{
  char num[sizeof(int)];

  printf("Enter a method number:\n"
         "1: Most valuable first\n"
         "2: Smallest weights first:\n"
         "3: Weighted average\n"
         "4: Brute force\n"
         "-1: Exit\n"
         "Method chosen: ");

  fgets(num, sizeof(num), stdin);

  return atoi(num);
}

/**
 * Quick sort
 */

int partition(item arr[], int lo, int hi)
{
  int pivot = hi;
  int i = lo;

  for (int j = lo; j < hi; j++)
  {
    if (arr[j].value >= arr[pivot].value)
    {
      item tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
      i++;
    }
  }

  item temp = arr[i];
  arr[i] = arr[hi];
  arr[hi] = temp;
  return i;
}

item algorithm(item arr[], int lo, int hi)
{
  int pivot = partition(arr, lo, hi);

  if (lo < pivot - 1)
  {
    algorithm(arr, lo, pivot - 1);
  }
  if (hi > pivot)
  {
    algorithm(arr, pivot, hi);
  }

  return *arr;
}

void quick_sort(item arr[], int low, int high)
{
  algorithm(arr, low, high);
}

/**
 * Most valuable first method
 */
void most_valuable_first(item *treasure_chest, int treasure_chest_size, int threshold)
{
  item knapsack[treasure_chest_size];
  int knapsack_ids[treasure_chest_size];
  int knapsack_weight = 0;
  int knapsack_value = 0;
  int knapsack_i = 0;

  quick_sort(treasure_chest, 0, treasure_chest_size - 1);

  for (int i = 0; i < treasure_chest_size; i++)
  {
    /* debug for checking sorted knapsack */
    // printf("\niteme_no: %d\nweight: %d\nvalue: %d\n", treasure_chest[i].id, treasure_chest[i].weight, treasure_chest[i].value);

    if (treasure_chest[i].weight + knapsack_weight <= threshold)
    {
      knapsack[knapsack_i] = treasure_chest[i];
      knapsack_ids[i] = treasure_chest[i].id;
      knapsack_weight += treasure_chest[i].weight;
      knapsack_value += treasure_chest[i].value;
      i++;
    }
  }

  printf("Items to select: ");
}

/**
 * Main
 */
int main(int argc, char **argv)
{
  /* check args */
  /* check number of args */
  if (argc < 3)
  {
    printf("usage: ./knapsack file_path.txt threshold\n");
    exit(1);
  }

  /* check file */
  int fd = open_treasure_chest(argv[1]);

  if (fd < 0)
  {
    printf("Error opening file: %s\n", argv[1]);
    exit(1);
  }

  /* check threshold */
  int threshold = atoi(argv[2]);

  if (threshold < 1)
  {
    printf("Threshold minimum: 1\n");
  }

  /* read file */
  item treasure_chest[10000];
  int treasure_chest_size = -1;

  treasure_chest_size = read_file(fd, treasure_chest);

  /* close file */
  close_treasure_chest(fd);

  /* get method chosen by user */
  switch (get_method())
  {
  case 1:
    most_valuable_first(treasure_chest, treasure_chest_size, threshold);
    break;
  case 2:
    printf("method 2");
    break;
  case 3:
    printf("method 3");
    break;
  case 4:
    printf("method 4");
    break;
  case -1:
    exit(0);
    break;
  default:
    printf("Invalid option. Enter 1 - 4 only");
    exit(1);
  }

  return 0;
}