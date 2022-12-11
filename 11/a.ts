const input = await Deno.readTextFile('./input.txt')
const inputMonkeys = input.split('\n\n')

interface Monkey {
  items: number[]
  divisor: number
  trueDest: number
  falseDest: number
  operation: string[]
  itemsInspected: number
}

const operators = {
  '+': (x: number, y: number) => x + y,
  '-': (x: number, y: number) => x - y,
  '*': (x: number, y: number) => x * y,
  '/': (x: number, y: number) => x / y,
}

const monkeys: Monkey[] = []

const parseItems = (itemString: string): number[] =>
  itemString.trim().split(': ')[1].split(', ').map(Number)
const isDivisible = (worryLevel: number, divisor: number) => worryLevel % divisor === 0

const parseOperation = (operation: string[], worryLevel: number) => {
  const [x, op, y] = operation
  return operators[op](Number(x) || worryLevel, Number(y) || worryLevel)
}

const parseInput = (input: string[]) => {
  for (const monkey of input) {
    const [_, items, operation, divisor, trueDest, falseDest] = monkey.split('\n')

    monkeys.push({
      items: parseItems(items),
      operation: operation.trim().split(' ').splice(3),
      divisor: Number(divisor.trim().split(' ')[3]),
      trueDest: Number(trueDest.trim().split(' ')[5]),
      falseDest: Number(falseDest.trim().split(' ')[5]),
      itemsInspected: 0,
    })
  }
}

const playRound = () => {
  for (const monkey of monkeys) {
    const { items, operation, divisor, trueDest, falseDest } = monkey
    for (const item of items) {
      monkey.itemsInspected++
      const worryLevel = Math.floor(parseOperation(operation, item) / 3)
      if (isDivisible(worryLevel, divisor)) {
        monkeys[trueDest].items.push(worryLevel)
      } else {
        monkeys[falseDest].items.push(worryLevel)
      }
      monkey.items = monkey.items.slice(1)
    }
  }
}

parseInput(inputMonkeys)

const rounds = 20
for (let i = 0; i < rounds; i++) playRound()

const topTwoMonkeys = monkeys
  .sort((a, b) => b.itemsInspected - a.itemsInspected)
  .map((m) => m.itemsInspected)
  .slice(0, 2)
console.log(topTwoMonkeys[0] * topTwoMonkeys[1])
