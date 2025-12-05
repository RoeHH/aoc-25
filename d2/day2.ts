let input: string;
try {
  input = await Deno.readTextFile("d2/day2.input");
} catch (_error) {
  console.error("Cant read input will use test input");
  input = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
}

const solve = (input: string, regex: RegExp): number => {

  const ranges = input.split(",").map(range => {
    const [start, end] = range.split("-").map(Number);
    return {start, end};
  });

  let res = 0;

  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i++) {
      const str = i.toString();
      if(str.length % 2 !== 0) continue;
      res += regex.test(str) ? i : 0      
    }
  }

  return res;
}

const regexTask1 = /^(.+)\1$/;
const regexTask2 = /^(.+)\1+$/;

console.log("Result Task 1:", solve(input, regexTask1));

Deno.bench("Day 2 Task 1", () => {
  solve(input, regexTask1);
});

console.log("Result Task 2:", solve(input, regexTask2));

Deno.bench("Day 2 Task 2", () => {
  solve(input, regexTask2);
});

/*
| benchmark      | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| -------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Day 2 Task 1   |        125.7 ms |           8.0 | (123.3 ms … 143.4 ms) | 125.2 ms | 143.4 ms | 143.4 ms |
| Day 2 Task 2   |        151.0 ms |           6.6 | (146.3 ms … 187.9 ms) | 149.6 ms | 187.9 ms | 187.9 ms |
*/