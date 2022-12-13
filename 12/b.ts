const input = await Deno.readTextFile('./input.txt')

const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
]

const getElevation = (letter: string) => {
    const elevationLetters = 'abcdefghijklmnopqrstuvwxyz'
    if (letter === 'S') return 0
    if (letter === 'E') return 25
    return elevationLetters.indexOf(letter)
}

const startPoints: number[][] = []
let end: number[]
const mapElevations = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
        if (char === 'S' || char === 'a') startPoints.push([i, j])
        else if (char === 'E') end = [i, j]

        return getElevation(char)
    }),
)

const getShortestPath = () => {
    const queue = startPoints.map((start) => ({ pos: start, steps: 0 }))
    const visited: number[][] = []

    while (queue.length) {
        const {
            pos: [i, j],
            steps,
        } = queue.shift()
        if (visited[i]?.[j]) continue

        if (i === end[0] && j === end[1]) return steps

        for (const [di, dj] of directions) {
            if (
                mapElevations[i + di]?.[j + dj] === undefined ||
                mapElevations[i + di][j + dj] > mapElevations[i][j] + 1 ||
                visited[i + di]?.[j + dj]
            ) {
                continue
            }
            queue.push({ pos: [i + di, j + dj], steps: steps + 1 })
        }
        visited[i] = visited[i] ?? []
        visited[i][j] = 1
    }
}

console.log(getShortestPath())
