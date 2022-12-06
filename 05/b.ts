import { getStacksFromInput, getTopCrates } from './helpers.ts'

const input = await Deno.readTextFile('./input.txt')

const [fromPositions, instructions] = input.split('\n\n')
const stacks = getStacksFromInput(fromPositions)

const moveCrates = (instructions: string) => {
  for (const instruction of instructions.split('\n')) {
    const [count, from, to] = instruction.match(/\d+/g)?.map(Number) as number[]
    const fromStack = stacks[from - 1]
    const cratesToMove = fromStack.splice(fromStack.length - count, count)
    stacks[to - 1].push(...cratesToMove)
  }
}

moveCrates(instructions)
console.log(getTopCrates(stacks))
