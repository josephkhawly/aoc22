const input = await Deno.readTextFile('./input.txt')
const pairs = input.split('\n')

const rangesFullyContained = (range1: number[], range2: number[]) => {
  const [start1, end1] = range1
  const [start2, end2] = range2

  const range1ContainsRange2 = start1 <= start2 && end1 >= end2
  const range2ContainsRange1 = start2 <= start1 && end2 >= end1

  return range1ContainsRange2 || range2ContainsRange1
}

let fullyContainedCount = 0
for (const pair of pairs) {
  const [range1, range2] = pair.split(',').map((range) => {
    return range.split('-').map((num) => parseInt(num))
  })

  if (rangesFullyContained(range1, range2)) {
    fullyContainedCount++
  }
}

console.log(fullyContainedCount)
