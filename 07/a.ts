// deno-lint-ignore-file no-explicit-any
const input = await Deno.readTextFile('./input.txt')

const termOutput: any = input.split('\n')

const sizes = { '/': 0 }
const paths: string[] = []

const cd = (dir: string) => {
  if (dir === '..') {
    paths.pop()
  } else {
    paths.push(`${paths.at(-1)}${dir}/`)
  }
}

const ls = (i: number) => {
  for (i++; i < termOutput.length; i++) {
    const parts = termOutput[i].split(' ')
    if (parts[0] === '$') return
    
    if (parts[0] !== 'dir') {
      for (const path of paths) {
        sizes[path] = (sizes[path] ?? 0) + Number(parts[0])
      }
    }
  }
}

for (let i = 0; i < termOutput.length; i++) {
  const [, cmd, dir] = termOutput[i].split(' ')
  if (cmd === 'ls') {
    ls(i)
  } else if (cmd === 'cd') {
    cd(dir)
  }
}

const getSumOfSizes = (maxSize: number) => {
    return Object.values(sizes)
      .filter((size) => size <= maxSize)
      .reduce((acc, size) => acc + size)
}

console.log(getSumOfSizes(100000))
