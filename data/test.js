const compareTest = (key, attempts) => {
    let answers = [];
    number = 0;
    key.split(' ').forEach(item => {
      number ++;
      if (item == 1) {
        answers.push(number);
      }
    });
    const attemptIndices = attempts.map(attempt => {
      return attempt.index;
    })
    const wronglyGuessed = attemptIndices.filter(index => {
      return !answers.includes(index);
    });
    const missing = answers.filter(answer => {
      return !attemptIndices.includes(answer);
    });
      console.log("Wrong: ", wronglyGuessed);
      console.log("Missing: ", missing);
  }; 