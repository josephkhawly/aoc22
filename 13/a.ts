const input = await Deno.readTextFile('./input.txt')

const pairs = input.split('\n\n')

const arePairsInOrder = (a: any, b: any): number => {
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

let sumOfIndices = 0
for (const pair of pairs) {
    const [left, right] = pair.split('\n').map(eval)
    if (arePairsInOrder(left, right) <= 0) {
        sumOfIndices += pairs.indexOf(pair) + 1
    }
}
console.log(sumOfIndices)
