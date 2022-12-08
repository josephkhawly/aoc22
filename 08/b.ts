const input = await Deno.readTextFile('./input.txt')
const grid: number[][] = []

const generateGrid = (input: string) => {
  for (const line of input.split('\n')) {
    grid.push(line.split('').map(Number))
  }
}

generateGrid(input)

const getScenicScore = (grid: number[][], x: number, y: number) => {
  const top = grid.slice(0, y).map((row) => row[x]).reverse()
  const left = grid[y].slice(0, x).reverse()
  const right = grid[y].slice(x + 1)
  const bottom = grid.slice(y + 1).map((row) => row[x])
  const isOnEdge =
    left.length === 0 || right.length === 0 || top.length === 0 || bottom.length === 0
  if (isOnEdge) return 0

  const findTrees = (arr: number[]) => {
    const visibleTrees = arr.findIndex((num) => num >= grid[y][x])

    if (visibleTrees < 0) return arr.length
    return visibleTrees + 1
  }
  const countLeft = findTrees(left)
  const countRight = findTrees(right)
  const countTop = findTrees(top)
  const countBottom = findTrees(bottom)

  return countLeft * countRight * countTop * countBottom
}

const getHighestScenicScore = (grid: number[][]) => {
  let highestScore = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const score = getScenicScore(grid, x, y)
      if (score > highestScore) {
        highestScore = score
      }
    }
  }
  return highestScore
}

console.log(getHighestScenicScore(grid))
