#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

void insertionSort(int arr[][3], int n, int m)
{
  for (int i = 0; i < n; i++) {
    int col = arr[i][m];
    int temp = arr[i][2];
    int temp2 = arr[i][1];
    int temp3 = arr[i][0];
    int j = i - 1;
    while (j >= 0 && arr[j][m] > col) {
      arr[j+1][2] = arr[j][2];
      arr[j+1][1] = arr[j][1];
      arr[j+1][0] = arr[j][0];
      j--;
    }
    arr[j+1][2] = temp;
    arr[j+1][1] = temp2;
    arr[j+1][0] = temp3;
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
  insertionSort(result, k, 2);
  char items[30];
  char temp[10];
  int cost = 0;
  int value = 0;
  int max = k-1; 

  strcpy(items, "Items to select:");

  while (cost < threshold ) {
    sprintf(temp, " %d,", result[max][0]);
    strcat(items, temp);
    cost += result[max][1];
    printf("cost %d\n", cost);
    value += result[max][2];
    max--;
  }
  items[strlen(items)-1] = '\0';
  printf("%s\n", items);
  printf("Total cost: %d\n", cost);
  printf("Total value: %d\n", value);  

  // Start with the smallest weight and go from there
  char items2[30];
  char temp2[10];
  int cost2 = 0;
  int value2 = 0;
  int max2 = 0;

  insertionSort(result, k, 1);

  strcpy(items2, "Items to select:");

  
  while (cost2 < threshold ) {
      sprintf(temp2, " %d,", result[max2][0]);
      strcat(items2, temp2);
      cost2 += result[max2][1];
      value2 += result[max2][2];
      max2++;
  }

  items2[strlen(items2)-1] = '\0';

  printf("%s\n", items2);
  printf("Total cost: %d\n", cost2);
  printf("Total value: %d\n", value2); 

  return 0;
}