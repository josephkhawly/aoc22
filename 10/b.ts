const input = await Deno.readTextFile('./input.txt')
const commands = input.split('\n')

let x = 1
const registerValues: number[] = []
const width = 40, height = 6, spriteWidth = 3
const screen: string[] = []

const getSpritePosition = (x: number) => {
  let line = ''
  for (let i = 0; i < width; i++) {
    if (i + 1 >= x && i + 1 < x + spriteWidth) line += '#'
    else line += '.'
  }
  return line
}

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

for (let i = 0; i < height; i++) {
  let drawLine = ''
  for (let j = 0; j < width; j++) {
    const sprite = getSpritePosition(registerValues[i * width + j])
    drawLine += sprite[j]
  }
  screen.push(drawLine)
}

console.log(screen)
