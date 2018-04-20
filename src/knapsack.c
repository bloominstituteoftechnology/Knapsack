#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

#define DEBUG 0 // Set to 1 to turn on some debugging output, or 0 to turn off

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
  char buffer[100000];

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
         "0: All\n"
         "-1: Exit\n"
         "Method chosen: ");

  fgets(num, sizeof(num), stdin);

  return atoi(num);
}

/**
 * Quick sort
 */

int partition_values_asc(item arr[], int lo, int hi)
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

int partition_weight_desc(item arr[], int lo, int hi)
{
  int pivot = hi;
  int i = lo;

  for (int j = lo; j < hi; j++)
  {
    if (arr[j].weight <= arr[pivot].weight)
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

int partition_avg_weight_asc(item arr[], int lo, int hi)
{
  int pivot = hi;
  int i = lo;

  for (int j = lo; j < hi; j++)
  {
    if ((double)arr[j].value / arr[j].weight >= (double)arr[pivot].value / arr[pivot].weight)
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

void algorithm(item arr[], int lo, int hi, int option)
{
  int pivot = -1;

  if (option == 1)
    pivot = partition_values_asc(arr, lo, hi);
  if (option == 2)
    pivot = partition_weight_desc(arr, lo, hi);
  if (option == 3)
    pivot = partition_avg_weight_asc(arr, lo, hi);

  if (lo < pivot - 1)
  {
    algorithm(arr, lo, pivot - 1, option);
  }
  if (hi > pivot)
  {
    algorithm(arr, pivot, hi, option);
  }
}

void quick_sort(item arr[], int low, int high, int option)
{
  algorithm(arr, low, high, option);
}

/**
 * Brute force method
 */
int calculate_knapsack_value(item chest[], int knapsack[], int chest_size)
{
  int total_value = 0;

  for (int i = 0; i < chest_size; i++)
  {
    if (knapsack[i] == 0)
      total_value += chest[i].value;
  }

  return total_value;
}

int knapSack_gfg(int W, item chest[], int knapsack[], int n, int chest_size)
{
  int i, w;
  int K[n + 1][W + 1];
  int ***K_k;
  int y, z;

  K_k = (int ***)malloc(sizeof(int **) * (n + 1));
  for (y = 0; y < (n + 1); y++)
  {
    K_k[y] = (int **)malloc(sizeof(int *) * (W + 1));

    for (z = 0; z < (W + 1); z++)
    {
      K_k[y][z] = (int *)malloc(sizeof(int) * chest_size);
    }
  } /* 3d malloc from https://bytes.com/topic/c/answers/546378-dynamic-3d-array-memory-alllocation */

  // int **arr_2d = malloc(sizeof (int*) * n * W);
  // int *arr_1d = malloc(sizeof(int) * n * W * chest_size);

  // for (size_t i = 0; i < )

  // for (y = 0; y < n; y++)
  // {
  //   K_k[y] = malloc(sizeof(int *) * n);

  //   for (z = 0; z < chest_size; z++)
  //   {
  //     K_k[y][z] = malloc(sizeof(int) * chest_size);
  //   }
  // }

  // int K_k[n + 1][W + 1][chest_size]; /* this is a knapsack matrix */

  for (i = 0; i <= n; i++)
  {
    for (w = 0; w <= W; w++)
    {
      /* put this knapsack into a temp array */
      // int tmp[chest_size];

      // for (int j = 0; j < chest_size; j++)
      // {
      //   int t = knapsack[j];
      //   tmp[j] = t;
      // }

      if (i == 0 || w == 0)
      {
        K[i][w] = 0;

        for (int b = 0; b < chest_size; b++)
        {
          K_k[i][w][b] = knapsack[b];
        }
      }
      else if (chest[i - 1].weight <= w)
      {
        int num1, num2, largest_num;
        int tmp[chest_size];

        num1 = chest[i - 1].value + K[i - 1][w - chest[i - 1].weight];

        num2 = K[i - 1][w];

        if (num1 > num2)
        {
          largest_num = num1;

          for (int b = 0; b < chest_size; b++)
          {
            tmp[b] = (int)K_k[i - 1][w - chest[i - 1].weight][b];
          }
          // memcpy(tmp, K_k[i - 1][w - chest[i - 1].weight], chest_size);
          tmp[i - 1] = 0;

          /* if tmp is the larger knapsack */
          // for (int j = 0; j < chest_size; j++)
          // {
          //   int t = tmp[j];
          //   knapsack[j] = t;
          // }
        }
        else
        {
          largest_num = num2;

          for (int b = 0; b < chest_size; b++)
          {
            tmp[b] = (int)K_k[i - 1][w][b];
          }

          // memcpy(tmp, K_k[i - 1][w], chest_size);
        }

        K[i][w] = largest_num;

        for (int b = 0; b < chest_size; b++)
        {
          K_k[i][w][b] = tmp[b];
        }
        // memcpy(K_k[i][w], tmp, chest_size);
      }
      else
      {
        K[i][w] = K[i - 1][w];

        for (int b = 0; b < chest_size; b++)
        {
          K_k[i][w][b] = (int)K_k[i - 1][w][b];
        }
        // memcpy(K_k[i][w], K_k[i - 1][w], chest_size);
      }
    }
  }

  // printf("\n");

  // for (int x = 0; x <= n; x++)
  // {
  //   printf("x: %d\n", x);
  //   for (int y = 0; y <= W; y++)
  //   {
  //     printf("%d [ %d ] ", y, K[n][y]);
  //   }
  //   printf("\n");
  // }

  for (int b = 0; b < chest_size; b++)
  {
    knapsack[b] = (int)K_k[n][W][b];
  }
  // memcpy(knapsack, K_k[n][W], chest_size);
  return K[n][W];

  /* naive solution */
  /* put this knapsack into a temp array */
  // int tmp[chest_size];

  // for (int i = 0; i < chest_size; i++)
  // {
  //   int t = knapsack[i];
  //   tmp[i] = t;
  // }

  // if (n == 0 || W == 0)
  // {
  //   return 0;
  // }

  // if (chest[n - 1].weight > W)
  // {
  //   return knapSack_gfg(W, chest, knapsack, n - 1, chest_size);
  // }

  // else
  // {
  //   int num1, num2, largest_num;
  //   tmp[n - 1] = 0;

  //   num1 = chest[n - 1].value + knapSack_gfg(W - chest[n - 1].weight, chest, tmp, n - 1, chest_size);

  //   num2 = knapSack_gfg(W, chest, knapsack, n - 1, chest_size);

  //   if (num1 > num2)
  //   {
  //     largest_num = num1;
  //     /* if tmp is the larger knapsack */
  //     for (int i = 0; i < chest_size; i++)
  //     {
  //       int u = tmp[i];
  //       knapsack[i] = u;
  //     }
  //   }
  //   else
  //     largest_num = num2;

  //   return largest_num;
  // }
} /* adapted from https://www.geeksforgeeks.org/knapsack-problem/ */

void brute_force(item treasure_chest[], int treasure_chest_size, int threshold)
{
  int knapsack[treasure_chest_size];

  for (int i = 0; i < treasure_chest_size; i++)
  {
    knapsack[i] = 1; /* 0 = include, 1 = not include */
  }

  int largest_value = knapSack_gfg(threshold, treasure_chest, knapsack, treasure_chest_size, treasure_chest_size);

  item knapsack_ans[treasure_chest_size];
  int knapsack_i = 0;
  int knapsack_weight = 0;

  for (int i = 0; i < treasure_chest_size; i++)
  {
    if (knapsack[i] == 0)
    {
      knapsack_ans[knapsack_i++] = treasure_chest[i];
      knapsack_weight += treasure_chest[i].weight;
    }
  }

  printf("\nItems to select: ");
  for (int i = 0; i < knapsack_i; i++)
  {
    printf("%d ", knapsack_ans[i].id);
  }

  printf("\nTotal cost: %d", knapsack_weight);
  printf("\nTotal value: %d\n", largest_value);

  // item brute_force_method_knapsack[treasure_chest_size];
  // int largest_value = -1;

  // /* total possible knapsack sizes */
  // for (int i = 1; i <= treasure_chest_size; i++)
  // {
  //   /* treasure chest index */
  //   for (int j = 0; j + i < treasure_chest_size; j++)
  //   {
  //     /* add to tmp knapsack */
  //     int i = 0;
  //     for (int k = 1; k <= i; k++)
  //     {
  //       brute_force_method_knapsack[i++] = treasure_chest[j+k];
  //     }
  //   }
  // }
}

/**
 * Print results
 */
void print_results(item *treasure_chest, int treasure_chest_size, int threshold)
{
  item knapsack[treasure_chest_size];
  int knapsack_ids[treasure_chest_size];
  int knapsack_weight = 0;
  int knapsack_value = 0;
  int knapsack_i = 0;

  for (int i = 0; i < treasure_chest_size; i++)
  {

#if DEBUG

    /* debug for checking sorted knapsack */

    printf("\nitem_no: %d\nweight: %d\nvalue: %d\n", treasure_chest[i].id, treasure_chest[i].weight, treasure_chest[i].value);

#endif

    if (treasure_chest[i].weight + knapsack_weight <= threshold)
    {
      knapsack[knapsack_i] = treasure_chest[i];
      knapsack_ids[knapsack_i] = treasure_chest[i].id;
      knapsack_weight += treasure_chest[i].weight;
      knapsack_value += treasure_chest[i].value;
      knapsack_i++;
    }
  }

  printf("\nItems to select: ");
  for (int i = 0; i < knapsack_i; i++)
  {
    printf("%d ", knapsack_ids[i]);
  }

  printf("\nTotal cost: %d", knapsack_weight);
  printf("\nTotal value: %d\n", knapsack_value);
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
  // quick_sort(treasure_chest, 0, treasure_chest_size - 1, get_method());

  /* execute all methods */
  for (int i = 1; i < 4; i++)
  {
    if (i == 1)
    {
      printf("\nLargest Values First Method:");
    }

    else if (i == 2)
    {
      printf("\nSmallest Weights First Method:");
    }
    else
    {
      printf("\nAverage Weighted Method:");
    }

    quick_sort(treasure_chest, 0, treasure_chest_size - 1, i);
    print_results(treasure_chest, treasure_chest_size, threshold);
  }

  printf("\nBrute Force Method");
  brute_force(treasure_chest, treasure_chest_size, threshold);

  // switch (get_method())
  // {
  // case 1:
  //   quick_sort(treasure_chest, 0, treasure_chest_size - 1, 1);
  //   break;
  // case 2:
  //   printf("method 2");
  //   break;
  // case 3:
  //   printf("method 3");
  //   break;
  // case 4:
  //   printf("method 4");
  //   break;
  // case 0:
  //   printf("all");
  //   break;
  // case -1:
  //   exit(0);
  //   break;
  // default:
  //   printf("Invalid option. Enter 1 - 4 only");
  //   exit(1);
  // }

  // print_results(treasure_chest, treasure_chest_size, threshold);

  return 0;
}