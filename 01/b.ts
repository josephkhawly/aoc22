const input = await Deno.readTextFile('./input.txt')
const elves = input.split('\n\n')

const totalCalories = elves.map((elf) => {
  const calories = elf.split('\n').map(Number)
  const total: number = calories.reduce((a, b) => a + b, 0)
  return total
}).sort((a, b) => b - a)

const [first, second, third] = totalCalories

console.log(first + second + third)