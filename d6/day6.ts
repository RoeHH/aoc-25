let input;
try {
  input = await Deno.readTextFile("d6/day6.input");
} catch (_error) {
  console.log("Cant read input will use test input");
  input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
}

const grid = input.split("\n").map((line) => line.split(""));

const part1 = () => {
  const results = new Array(Math.ceil(grid[0].length)).fill(0);

  for (let y = 0; y < grid.length - 1; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let number = Number(
        `${grid[y][x]}${grid[y][x + 1]}${grid[y][x + 2]}${grid[y][x + 3]}`,
      );
      number = isNaN(number)
        ? Number(`${grid[y][x]}${grid[y][x + 1]}${grid[y][x + 2]}`)
        : number;
      number = isNaN(number)
        ? Number(`${grid[y][x]}${grid[y][x + 1]}`)
        : number;

      if (grid[grid.length - 1][x] === "*") {
        if (y === 0) {
          results[x] = number;
        } else {
          results[x] *= number;
        }
      } else if (grid[grid.length - 1][x] === "+") {
        results[x] += number;
      }

      while (
        grid[grid.length - 1][x + 1] !== "*" &&
        grid[grid.length - 1][x + 1] !== "+" && x < grid[0].length
      ) {
        x++;
      }
    }
  }

  return results.reduce((acc, cur) => acc += cur, 0);
};

console.log(`Result part1: ${part1()}`);

Deno.bench("Day 6 part 1", () => {
  part1();
});

const part2 = () => {
  const results = new Array(Math.ceil(grid[0].length)).fill(0);

  for (let x = 0; x < grid[0].length; x++) {
    let movingX = x;
    while (
      grid[grid.length - 1][movingX + 1] !== "*" &&
      grid[grid.length - 1][movingX + 1] !== "+" && movingX < grid[0].length - 1
    ) {

      let number = Number(
        `${grid[0][movingX]}${grid[1][movingX]}${grid[2][movingX]}${
          grid[3][movingX]
        }`,
      );
      number = isNaN(number)
        ? Number(`${grid[0][movingX]}${grid[1][movingX]}${grid[2][movingX]}`)
        : number;

      if (grid[grid.length - 1][x] === "*") {
        if (movingX === x) {
          results[x] = number;
        } else {
          results[x] *= number;
        }
      } else if (grid[grid.length - 1][x] === "+") {
        results[x] += number;
      }

      movingX++;
    }
    x = movingX;
  }

  return results.reduce((acc, cur) => acc += cur, 0);
};

console.log(`Result part2: ${part2()}`);

Deno.bench('Day 6 part 2', () => {
  part2();
});

/*
| benchmark      | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| -------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Day 6 part 1   |        339.8 µs |         2,942 | (301.7 µs …   1.0 ms) | 342.8 µs | 614.9 µs | 711.9 µs |
| Day 6 part 2   |        162.5 µs |         6,155 | (145.5 µs … 701.5 µs) | 159.4 µs | 273.9 µs | 322.2 µs |
*/