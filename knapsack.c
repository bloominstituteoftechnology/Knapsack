#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void insertionSort(int arr[][3], int n)
{
  for (int i = 0; i < n; i++) {
    int temp = arr[i][2];
    int j = i - 1;
    while (j >= 0 && arr[j][2] > temp) {
      arr[j+1][2] = arr[j][2];
      j--;
    }
    arr[j+1][2] = temp;
  }
}

int main(int argc, char* argv[]) 
{
  if (argc != 3) {
    fprintf(stderr, "Must provide filename and threshold\n");
    exit(1);
  }

  int threshold;
  char other[30];
  char filename[30];
  FILE *fp;
  char *line = NULL;
  size_t len2 = 0;
  ssize_t read;

  int j = 0;
  int len = strlen(argv[2]);
  int arr[1001][3]={{0,0,0}};
  int k = 0;

  for (int i = 0; i < len; i++) {
    if (isdigit(argv[2][i])) {
      other[j] += argv[2][i];
      j++;
    }
  }

  threshold = atoi(other);

  strcpy(filename, "data/");
  strcat(filename, argv[1]);


  fp = fopen(filename, "r");
  if (fp == NULL) {
    printf("file %s does not exist", filename);
    exit(1);
  }

  while((read = getline(&line, &len2, fp)) != -1) {
    sscanf(line, "%d %d %d", &arr[k][0], &arr[k][1], &arr[k][2]);
    k++;
  }
  fclose(fp);


  // Start with the most valuable and go from there

  int result[1001][3];

  for (int m = 0; m < k; m++) {
    result[m][0] = arr[m][0];
    result[m][1] = arr[m][1];
    result[m][2] = arr[m][2];

  }
  insertionSort(result, k);
  char items[30];
  char temp[10];
  int cost = 0;
  int value = 0;
  int max = k-1; 

  strcpy(items, "Items to select: ");

  while (cost < threshold ) {
      sprintf(temp, "%d ", result[max][0]);
      strcat(items, temp);
      cost += result[max][1];
      value += result[max][2];
      max--;
  }
  printf("%s\n", items);
  printf("Total cost: %d\n", cost);
  printf("Total value: %d\n", value);  

  return 0;
}