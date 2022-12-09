const input = await Deno.readTextFile('./input.txt')
const steps = input.split('\n')

interface Directions {
  [dir: string]: number[]
}

const moves: Directions = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
}

let xHead = 0, yHead = 0, xTail = 0, yTail = 0

const pointsTailVisited = new Set()
for (const step of steps) {
  const [direction, distance] = [step[0], Number(step.slice(1))]
  const [xMove, yMove] = moves[direction]

  for (let i = 0; i < distance; i++) {
    xHead += xMove
    yHead += yMove

    const inSameRow = yHead === yTail
    const inSameColumn = xHead === xTail
    const areHeadAndTailTouching = Math.abs(xHead - xTail) <= 1 && Math.abs(yHead - yTail) <= 1
    if (areHeadAndTailTouching) continue

    if (inSameRow || inSameColumn) {
      xTail += xMove
      yTail += yMove
    } else if (!inSameRow && !inSameColumn) {
      if (xHead > xTail) xTail++
      else xTail--

      if (yHead > yTail) yTail++
      else yTail--
    }
    pointsTailVisited.add(`${xTail},${yTail}`)
  }
}

console.log(pointsTailVisited.size)
