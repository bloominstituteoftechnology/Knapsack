#include <stdio.h>

int main (int argc, char *argv[]
)
//TODO:  Read command line argument to get file and size

FILE *fp = fopen("/fakedir/test.txt, "w+);

if(fp == NULL) {
  printf("Unable to open file";)
}

fprint(fp, "This is testing for fprintf...\n");
fputs("This is a test for fputs...\n", fp);
fclose(fp);

prinf("I think I remember how this works.\n";

return 0;