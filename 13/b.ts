const input = await Deno.readTextFile('./input.txt')

const pairs = input.split('\n\n')

const arePairsInOrder = (a: any, b: number | number[]): number => {
    if (typeof a === 'number' && typeof b === 'number') return a - b

    if (typeof a === 'number') a = [a]
    else if (typeof b === 'number') b = [b]

    for (let i = 0; i < a.length; i++) {
        if (b[i] === undefined) return 1

        const c = arePairsInOrder(a[i], b[i])
        if (c !== 0) return c
    }

    return a.length === b.length ? 0 : -1
}


const dividers = [[[2]], [[6]]]
const packets = pairs
    .map((pair) => pair.split('\n').map(eval))
    .flat()
    .concat(dividers)
    .sort(arePairsInOrder)
console.log(dividers.map((d) => packets.indexOf(d) + 1).reduce((acc, n) => acc * n))