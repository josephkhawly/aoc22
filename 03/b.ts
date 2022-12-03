const input = await Deno.readTextFile('./input.txt')
const rucksacks = input.split('\n')

const getLetterValue = (letter: string) => {
  const unicodeValue = letter.charCodeAt(0)
  if (unicodeValue > 96) return unicodeValue - 96
  return unicodeValue - 38
}

// split rucksacks into groups of three
const rucksackGroups = rucksacks.reduce((acc, rucksack) => {
    const lastGroup = acc[acc.length - 1]
    if (lastGroup.length < 3) {
        lastGroup.push(rucksack)
    } else {
        acc.push([rucksack])
    }
    return acc
}, [[]])

// find the letter in common for each group
const getMatchingItems = (rucksackGroup: string[]) => {
    const [left, middle, right] = rucksackGroup
    const matchingItem = left.split('').find((letter) => middle.includes(letter) && right.includes(letter))
    console.log(matchingItem)
    return matchingItem ? getLetterValue(matchingItem) : 0
}

const itemPriorityTotal = rucksackGroups.reduce((acc, rucksack) => {
  const matchingItem = getMatchingItems(rucksack)
  return acc + matchingItem
}, 0)

console.log(itemPriorityTotal)
