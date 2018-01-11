#include <stdio.h>
#include <stdlib.h>


#define MAXCHAR 100
#define MAXSIZE 1000

void getNumbers(char* str, int* arr) {
    
    int i, x = 0, y = 0, z = 0;

    for (i = 0; i < strlen(str); i++) {
        if (x == 0) {
            while (str[i] != 32 && str[i] >= 48 && str[i] <= 57) {
                x = x * 10 + (str[i] - '0');
                i++;
            }
        }

        if (y == 0) {
            while (str[i] != 32 && str[i] >= 48 && str[i] <= 57) {
                y = y * 10 + (str[i] - '0');
                i++;
            }
        }

        if (z == 0) {
            while (str[i] != 32 && str[i] >= 48 && str[i] <= 57) {
                z = z * 10 + (str[i] - '0');
                i++;
            }
        }

    }

    arr[0] = x; arr[1] = y; arr[2] = z;

}


int max(int a, int b) {
    return (a > b) ? a : b;
}

int knapSack(int threshold, int weights[], int values[], int size, int indexes[]) {

    int i, j, k;
    int dp[size + 1][threshold + 1];
    int arr[size];
    int sum = 0, sum2 = 0;
    for (i = 0; i <= size; i++) {
        for (j = 0; j <= threshold; j++) {

            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (weights[i - 1] <= j) {
                dp[i][j] = max(values[i - 1] + dp[i - 1][j - weights[i - 1]], dp[i - 1][j]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }

        }
    }
    for (k = 0; k < size; k++) {
        arr[k] = 0;
    }

    // this part doesn't work well
    i--; 
    j--;
    while (i > 0 && j > 0) {
        if (dp[i][j] != dp[i-1][j]) {
            arr[i - 1] = 1;
            i--;
            j -= 3; // <---- this probably the issue 
        } else {
            i--;
        }

    }

    for (k = 0; k < size; k++) {
        if (arr[k] == 1) {
            sum += values[k];
            sum2 += weights[k];
        }
    }
    printf("values -> %d, weights -> %d\n", sum, sum2);
    printf("%d\n", dp[size][threshold]);
    return dp[size][threshold];
}

int main(int argc, char ** argv) {

    int indexes[MAXSIZE];
    int weights[MAXSIZE];
    int values[MAXSIZE];
    char str[MAXCHAR];

    char* filename = argv[1]; 
    int i = 0, idx = 0, threshold = atoi(argv[2]);
    int tempArr[3];

    FILE *fp;
    fp = fopen(filename, "r");

    if (fp == NULL) {
        printf("Error opening file!\n");
        exit(1);
    }

    while (fgets(str, MAXCHAR, fp) != NULL) {
        getNumbers(str, tempArr);
        indexes[i] = tempArr[0];
        weights[i] = tempArr[1];
        values[i] = tempArr[2];
        i++; 
    }

    fclose(fp);
    // for (idx = 0; idx < i; idx++) {
    //     printf("%d %d %d\n", indexes[idx], weights[idx], values[idx]);
    // }

    knapSack(threshold, weights, values, i, indexes);
    return 0;

}