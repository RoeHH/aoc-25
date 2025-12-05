
const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.split('\n')


class ClockDigit {
  digit: number;
  L: ClockDigit| null = null;
  R: ClockDigit| null = null;

  constructor(digit: number){
    this.digit = digit;   
  }
}

class Clock {
  head: ClockDigit | null = null;
  zerosPassed: number = 0;

  constructor(){
    const digit = new ClockDigit(0);
    this.head = digit;
    digit.R = digit;
    digit.L = digit;
    Array.from({length: 99}, (_, i) => i).map(i => new ClockDigit(i+1)).forEach(digit => this.append(digit));
  }

  append(digit: ClockDigit){
    const tail = this.head!.L!;

    tail.R = digit;
    digit.L = tail;

    digit.R = this.head;
    this.head!.L = digit;
  }

  find(digitValue: number): ClockDigit | null {
    if(!this.head) return null;

    let current: ClockDigit | null = this.head;

    do {
      if(current.digit === digitValue){
        return current;
      }
      current = current.R;
    } while (current && current !== this.head);

    return null;
  }

  tick(direction: string) {
    if(!this.head) return;

    this.head = direction === "L" ? this.head.L : this.head.R;

    if(this.head!.digit === 0){
      this.zerosPassed++;
    }
  }

  asciiCircle(): string {
    if (!this.head) return "";

    const RED = "\x1b[31m";
    const GREEN = "\x1b[32m";
    const RESET = "\x1b[0m";

    const digits: ClockDigit[] = [];
    let cur = this.head;
    do {
      digits.push(cur);
      cur = cur.R!;
    } while (cur !== this.head);

    const size = 25; // grid size (must be odd for symmetry)
    const grid: string[][] = Array.from({ length: size }, () =>
      Array(size).fill("  ")
    );

    const cx = Math.floor(size / 2);
    const cy = Math.floor(size / 2);
    const r = Math.floor(size / 2) - 2;

    digits.forEach((node, i) => {
      const angle = (i / digits.length) * 2 * Math.PI - Math.PI / 2; // start top
      const x = cx + Math.round(r * Math.cos(angle));
      const y = cy + Math.round(r * Math.sin(angle));
      
      
      
      const s = true ? "██" : node.digit.toString().padStart(2, "0");
      grid[y][x] = node.digit === 0 ? `${GREEN}${s}${RESET}` : node === this.head ? `${RED}${s}${RESET}` : s;
    });
    
    grid[cy][cx] = this.zerosPassed.toString().padStart(2, "0"); // center

    return grid.map(row => row.join("")).join("\n");
  }

  setHead(digitValue: number): void {
    const found = this.find(digitValue);
    if (found) {
      this.head = found;
    }
  }


}

const clock = new Clock();

clock.setHead(50);

for (const operation of input) {
  
  const direction = operation[0]
  const distance = parseInt(operation.slice(1), 10)

  for(let i = 0; i < distance; i++){
    clock.tick(direction);
    // wait a bit to see the movement
    await new Promise(resolve => setTimeout(resolve, 30));
        console.log(clock.asciiCircle());

  }

}











/*
class ClockDigit {
  digit: number;
  R: ClockDigit| null = null;
  L: ClockDigit| null = null;

  constructor(digit: number){
    this.digit = digit;   
  }

  setR(next: ClockDigit){
    this.R = next
  }

  setL(prev: ClockDigit){
    this.L = prev
  }

  calculate(direction: string, distance: number): ClockDigit {
    if(distance === 0){
      return this;
    }

    if(this.digit === 0){
      console.log("heyy ich bis 0");
    }

    const next = direction === "L" ? this.L : this.R;
    return next?.calculate(direction, distance - 1);
  }

}

let clockDigit: ClockDigit;
Array.from({length: 100}, (_, i) => i+1).map(i => new ClockDigit(i-1)).forEach((digit, index, arr) => {
  digit.setR(arr[(index + 1) % arr.length]);
  digit.setL(arr[(index - 1 + arr.length) % arr.length]);

  if(digit.digit === 50){
    clockDigit = digit;
  }
});



for (const operation of input) {

  const direction = operation[0]
  const distance = parseInt(operation.slice(1), 10)

  clockDigit = clockDigit.calculate(direction, distance);

}

console.log(zeros);
*/