let input: string;
try {
  input = await Deno.readTextFile("d4/day4.input");
} catch (_error) {
  console.error("Cant read input will use test input");
  input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
}


const grid = input.split("\n").map(row => row.split("").map(char => char === "@"))
const resultGrid = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(-1));

const saveCheck = (grid: boolean[][], x: number, y: number) => {
  if (y < 0 || x < 0 || y > grid.length -1 || x > grid[0].length -1){
    return 0;
  }
  return grid[y][x] ? 1 : 0;
}

const driveTheForklift = (grid: boolean[][], resultGrid: number[][]): void => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if(grid[y][x]) {
        resultGrid[y][x] = saveCheck(grid, x-1, y-1) + saveCheck(grid, x, y-1) + saveCheck(grid, x+1, y-1) + saveCheck(grid, x-1, y) + saveCheck(grid, x+1, y) + saveCheck(grid, x-1, y+1) + saveCheck(grid, x, y+1) + saveCheck(grid, x+1, y+1);
      }
    }
  }
}

const updateTheGrid = (grid: boolean[][], resultGrid: number[][]): void => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if(resultGrid[y][x] < 4) {
        grid[y][x] = false;
      }
    }
  }
}

let resultBeforeDrive = 0;
let resultAfterDrive = 0;
while (true) {
  resultBeforeDrive = resultGrid.flat().filter(v => v >= 0 && v < 4).length;
  driveTheForklift(grid, resultGrid);
  resultAfterDrive = resultGrid.flat().filter(v => v >= 0 && v < 4).length;
  if(resultBeforeDrive === resultAfterDrive) {
    break;
  }
  console.log(resultGrid.map(row => row.map(v => v === -1 ? "🔳" : v < 4 ? "✅" : "❌").join("")).join("\n"));
  console.log("Result after drive:", resultGrid.flat().filter(v => v >= 0 && v < 4).length);
  updateTheGrid(grid, resultGrid);
  // wait a bit to see the movement
  await new Promise(resolve => setTimeout(resolve, 200));
}
