const input = await Deno.readTextFile('./input.txt')
const grid: number[][] = []

const generateGrid = (input: string) => {
  for (const line of input.split('\n')) {
    grid.push(line.split('').map(Number))
  }
}

generateGrid(input)

let count = 0
const isVisible = (grid: number[][], x: number, y: number) => {
  const left = grid[y].slice(0, x)
  const right = grid[y].slice(x + 1)
  const top = grid.slice(0, y).map((row) => row[x])
  const bottom = grid.slice(y + 1).map((row) => row[x])

  const visibleFromLeft = left.every((num) => num < grid[y][x])
  const visibleFromRight = right.every((num) => num < grid[y][x])
  const visibleFromTop = top.every((num) => num < grid[y][x])
  const visibleFromBottom = bottom.every((num) => num < grid[y][x])

  const isOnEdge =
    left.length === 0 || right.length === 0 || top.length === 0 || bottom.length === 0
  if (isOnEdge) return true

  return visibleFromLeft || visibleFromRight || visibleFromTop || visibleFromBottom
}

const countVisible = (grid: number[][]) => {
  for (let y = 0; y < grid.length; y++) {
    console.log(grid[y])
    for (let x = 0; x < grid[y].length; x++) {
      if (isVisible(grid, x, y)) {
        count++
      }
    }
  }
  return count
}

console.log(countVisible(grid))
