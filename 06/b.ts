const buffer = await Deno.readTextFile('./input.txt')

const getFirstMarkerPosition = (input: string) => {
  const markerLength = 14
  for (let i = 0; i < input.length - 3; i++) {
    const currentSequence = input.slice(i, i + markerLength)
    if (markerLength === new Set(currentSequence).size) {
      return i + markerLength
    }
  }
  return 0
}

console.log(getFirstMarkerPosition(buffer))
