const input = await Deno.readTextFile('./input.txt')
const commands = input.split('\n')

let x = 1
const registerValues: number[] = []

const getSignalStrength = (cycle: number) => registerValues[cycle - 1] * cycle

for (const command of commands) {
  const [instruction, v] = command.split(' ')

  if (instruction === 'noop') {
    registerValues.push(x)
  } else if (instruction === 'addx') {
    const cycleTime = 2
    for (let i = 0; i < cycleTime; i++) {
      registerValues.push(x)
    }
    x += Number(v)
  }
}

let signalSum = 0
for (let i = 20; i <= 220; i += 40) {
  signalSum += getSignalStrength(i)
}

console.log(signalSum)
