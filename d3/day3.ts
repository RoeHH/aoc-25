let input;
try {
  input = await Deno.readTextFile("d3/day3.input");
} catch (_error) {
  console.log("Cant read input will use test input");
  input = `987654321111111
811111111111119
234234234234278
818181911112111`;
}

const part1 = () => {
  let result = 0;
  for (const row of input.split("\n")) {
    let [tens, ones] = [0, 0];
    for (const [i, digit] of row.split("").map(Number).entries()) {
      if (digit > tens && i !== row.length - 1) {
        tens = digit;
        ones = 0;
      } else if (digit > ones) {
        ones = digit;
      }
    }
    result += Number(`${tens}${ones}`);
  }
  return result;
};

const part2 = (n: number) => {
  let result = 0;
  for (const row of input.split("\n")) {
    const digits = new Array(n).fill(0);
    for (const [i, number] of row.split("").map(Number).entries()) {
      let found = false;
      for (const [j, digit] of digits.entries()) {
        if (digits.length - (row.length - i) > j) {
          continue;
        } else if (found) {
          digits[j] = 0;
        } else if (digit < number) {
          digits[j] = number;
          found = true;
        }
      }
    }
    result += Number(digits.join(""));
  }
  return result;
};

console.log(`Result part 1: ${part1()}`);

Deno.bench("Day 3 part 1", () => {
  part1();
});

console.log(`Result part 2: ${part2(12)}`);

for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  Deno.bench(`Day 3 part 2 with n=${i}`, () => {
    part2(i);
  });
}

/*
| benchmark                | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| ------------------------ | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Day 3 part 1             |        338.0 µs |         2,959 | (296.9 µs …   1.5 ms) | 368.2 µs | 591.7 µs | 666.9 µs |
| Day 3 part 2 with n=1    |        704.4 µs |         1,420 | (584.8 µs …   3.6 ms) | 707.7 µs |   1.2 ms |   1.5 ms |
| Day 3 part 2 with n=2    |        948.2 µs |         1,055 | (831.4 µs …   2.0 ms) | 955.6 µs |   1.7 ms |   1.7 ms |
| Day 3 part 2 with n=3    |          1.2 ms |         839.8 | (  1.1 ms …   1.5 ms) |   1.2 ms |   1.3 ms |   1.4 ms |
| Day 3 part 2 with n=4    |          1.4 ms |         700.5 | (  1.3 ms …   1.7 ms) |   1.5 ms |   1.6 ms |   1.7 ms |
| Day 3 part 2 with n=5    |          1.9 ms |         535.9 | (  1.6 ms …   2.7 ms) |   2.0 ms |   2.4 ms |   2.5 ms |
| Day 3 part 2 with n=6    |          2.0 ms |         488.4 | (  1.8 ms …   2.5 ms) |   2.1 ms |   2.5 ms |   2.5 ms |
| Day 3 part 2 with n=7    |          2.9 ms |         350.3 | (  2.1 ms …   9.0 ms) |   3.3 ms |   8.0 ms |   9.0 ms |
| Day 3 part 2 with n=8    |          3.9 ms |         259.3 | (  3.5 ms …   4.7 ms) |   3.9 ms |   4.6 ms |   4.7 ms |
| Day 3 part 2 with n=9    |          4.8 ms |         208.8 | (  4.0 ms …   8.2 ms) |   5.7 ms |   6.2 ms |   8.2 ms |
| Day 3 part 2 with n=10   |          4.7 ms |         214.4 | (  4.4 ms …   5.9 ms) |   4.7 ms |   5.8 ms |   5.9 ms |
*/
