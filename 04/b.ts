const input = await Deno.readTextFile('./input.txt')
const pairs = input.split('\n')

const rangesOverlap = (range1: number[], range2: number[]) => {
  const [start1, end1] = range1
  const [start2, end2] = range2

  return start1 <= end2 && start2 <= end1
}

let overlapCount = 0
for (const pair of pairs) {
  const [range1, range2] = pair.split(',').map((range) => {
    return range.split('-').map((num) => parseInt(num))
  })

  if (rangesOverlap(range1, range2)) {
    overlapCount++
  }
}

console.log(overlapCount)