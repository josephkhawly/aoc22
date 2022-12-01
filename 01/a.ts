const input = await Deno.readTextFile('./input.txt')
const elves = input.split('\n\n')
const totalCalories = elves.map(elf => {
    const calories = elf.split('\n').map(Number)
    const total: number = calories.reduce((a, b) => a + b, 0)
    return total
})

console.log(Math.max(...totalCalories))
