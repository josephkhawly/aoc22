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

const knots = [...Array(10)].map(() => [0, 0])
const pointsTailVisited = new Set()

for (const step of steps) {
  const [direction, distance] = [step[0], Number(step.slice(1))]
  const [x1, y1] = moves[direction]

  for (let i = 0; i < distance; i++) {
    let currentPoint = knots[0]
    currentPoint[0] += x1
    currentPoint[1] += y1

    for (let j = 1; j < knots.length; j++) {
      const trailingPoint = knots[j]
      if (currentPoint.some(x => Math.abs(x) >= 2)) {
        const [x2, y2] = currentPoint.map(Math.sign)
        trailingPoint[0] += x2
        trailingPoint[1] += y2
        currentPoint[0] -= x2
        currentPoint[1] -= y2
      }
      currentPoint = trailingPoint
    }
    pointsTailVisited.add(`${currentPoint[0]},${currentPoint[1]}`)
  }
}

console.log(pointsTailVisited.size)
