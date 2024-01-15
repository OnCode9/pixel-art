export const DEFAULT_COLOR = '#FFFFFF'

export function toRowFromIndex(index, numCols, zeroBased = false) {
  const offset = zeroBased ? 0 : 1
  return Math.floor((index - offset) / numCols)
}

export function toColFromIndex(index, numCols, zeroBased = false) {
  const offset = zeroBased ? 0 : 1
  return (index - offset) % numCols
}

export function toGridStoreKey({row, col}) {
  return `${row}-${col}`
}
