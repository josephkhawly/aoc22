const input = await Deno.readTextFile('./input.txt')
const rucksacks = input.split('\n')

const getLetterValue = (letter: string) => {
    const unicodeValue = letter.charCodeAt(0)
    if (unicodeValue > 96) return unicodeValue - 96
    return unicodeValue - 38
}

const getMatchingItems = (rucksack: string) => {
    const middle = rucksack.length / 2
    const [left, right] = [rucksack.slice(0, middle), rucksack.slice(middle)]
    const matchingItem = left.split('').find((letter) => right.includes(letter))
    return matchingItem ? getLetterValue(matchingItem) : 0
}

const itemPriorityTotal = rucksacks.reduce((acc, rucksack) => {
    const matchingItem = getMatchingItems(rucksack)
    return acc + matchingItem
}, 0)

console.log(itemPriorityTotal)
