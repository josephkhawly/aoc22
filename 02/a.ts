// deno-lint-ignore-file no-explicit-any
const input = await Deno.readTextFile('./input.txt')
const rounds = input.split('\n')

const symbols: any = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
}
const outcome: any = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win',
}

enum Points {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
  Win = 6,
  Draw = 3,
  Lose = 0,
}

const getWinner = (round: string) => {
  const [opponent, desiredOutcome] = round.split(' ')

  const opponentSymbol = symbols[opponent]
  switch (outcome[desiredOutcome]) {
    case 'Draw':
      return Points.Draw + Points[opponentSymbol]
    case 'Win':
      if (opponentSymbol === 'Rock') return Points.Win + Points.Paper
      if (opponentSymbol === 'Paper') return Points.Win + Points.Scissors
      if (opponentSymbol === 'Scissors') return Points.Win + Points.Rock
      break
    case 'Lose':
      if (opponentSymbol === 'Rock') return Points.Lose + Points.Scissors
      if (opponentSymbol === 'Paper') return Points.Lose + Points.Rock
      if (opponentSymbol === 'Scissors') return Points.Lose + Points.Paper
      break
  }
}

const getScore = rounds.reduce((acc, round) => {
  const winner = getWinner(round)
  return acc + winner
}, 0)

console.log(getScore)
