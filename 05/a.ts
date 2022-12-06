import { getStacksFromInput, getTopCrates } from './helpers.ts'

const input = await Deno.readTextFile('./input.txt')

const [fromPositions, instructions] = input.split('\n\n')
const stacks = getStacksFromInput(fromPositions)

const moveCrates = (instructions: string) => {
  for (const instruction of instructions.split('\n')) {
    const [count, from, to] = instruction.match(/\d+/g)?.map(Number) as number[]
    for (let i = 0; i < count; i++) {
      const crate = stacks[from - 1].pop() as string
      stacks[to - 1].push(crate)
    }
  }
}

moveCrates(instructions)
console.log(getTopCrates(stacks))
