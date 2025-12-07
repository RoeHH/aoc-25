let input;
try {
  input = await Deno.readTextFile("d7/day7.input");
} catch (_error) {
  console.log("Cant read input will use test input");
  input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
}

const part1And2 = () => {
  const grid = input.split("\n").map((line) => line.split(""));

  const activeBeams = Array(grid[0].length).fill(0)
  activeBeams[grid[0].indexOf('S')] = 1

  let splits = 0;
  for (const row of grid) {
    for (let i = 0; i < row.length; i++) {
      if(row[i]==='^' && activeBeams[i]){
        splits += 1;
        activeBeams[i-1] += activeBeams[i];
        activeBeams[i+1] += activeBeams[i];
        activeBeams[i] = 0;
      }
    }
  }

  return { splits, possibleTimelines: activeBeams.reduce((a,b) => a+b, 0) };
}

console.log("Part 1 and 2", part1And2());

Deno.bench("Day 7 Part 1 and 2", () => {
  part1And2();
});


/*
| benchmark            | time/iter (avg) |        iter/s |      (min … max)      |      p75 |      p99 |     p995 |
| -------------------- | --------------- | ------------- | --------------------- | -------- | -------- | -------- |
| Day 7 Part 1 and 2   |         37.8 µs |        26,480 | ( 28.6 µs … 427.9 µs) |  37.0 µs | 103.8 µs | 121.2 µs |
*/