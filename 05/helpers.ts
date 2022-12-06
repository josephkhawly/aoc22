export const getStacksFromInput = (input: string): string[][] => {
  const stacks: string[][] = []
  for (const line of input.split('\n').slice(0, -1)) {
    for (let i = 0; i < line.length; i += 4) {
      const currentStack = i / 4
      if (line[i + 1] !== ' ') {
        stacks[currentStack] = stacks[currentStack] ?? []
        stacks[currentStack].unshift(line[i + 1])
      }
    }
  }
  return stacks
}

export const getTopCrates = (stacks: string[][]) => stacks.map((stack) => stack[stack.length - 1]).join('')