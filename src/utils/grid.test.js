import {
  describe,
  expect,
  test,
} from 'vitest'
import { toRowFromIndex, toColFromIndex } from '@/utils/grid.js'

describe('@/utils/grid.js', () => {
  describe('toRowFromIndex', () => {
    test.each`
      index    | numCols   | zeroBased   | expected
      ${1}     | ${3}      | ${false}     | ${0}
      ${2}     | ${3}      | ${false}     | ${0}
      ${3}     | ${3}      | ${false}     | ${0}
      ${4}     | ${3}      | ${false}     | ${1}
      ${5}     | ${3}      | ${false}     | ${1}
      ${6}     | ${3}      | ${false}     | ${1}
      ${7}     | ${3}      | ${false}     | ${2}
      ${8}     | ${3}      | ${false}     | ${2}
      ${9}     | ${3}      | ${false}     | ${2}
      ${0}     | ${3}      | ${true}      | ${0}
      ${1}     | ${3}      | ${true}      | ${0}
      ${2}     | ${3}      | ${true}      | ${0}
      ${3}     | ${3}      | ${true}      | ${1}
      ${4}     | ${3}      | ${true}      | ${1}
      ${5}     | ${3}      | ${true}      | ${1}
      ${6}     | ${3}      | ${true}      | ${2}
      ${7}     | ${3}      | ${true}      | ${2}
      ${8}     | ${3}      | ${true}      | ${2}
    `('should return $expected for ($index, $numCols, $zeroBased) ', ({ index, numCols, zeroBased, expected }) => {
      expect(toRowFromIndex(index, numCols, zeroBased)).toBe(expected);
    });
  })

  describe('toColFromIndex', () => {
    test.each`
      index    | numCols   | zeroBased   | expected
      ${1}     | ${3}      | ${false}     | ${0}
      ${2}     | ${3}      | ${false}     | ${1}
      ${3}     | ${3}      | ${false}     | ${2}
      ${4}     | ${3}      | ${false}     | ${0}
      ${5}     | ${3}      | ${false}     | ${1}
      ${6}     | ${3}      | ${false}     | ${2}
      ${7}     | ${3}      | ${false}     | ${0}
      ${8}     | ${3}      | ${false}     | ${1}
      ${9}     | ${3}      | ${false}     | ${2}
      ${0}     | ${3}      | ${true}      | ${0}
      ${1}     | ${3}      | ${true}      | ${1}
      ${2}     | ${3}      | ${true}      | ${2}
      ${3}     | ${3}      | ${true}      | ${0}
      ${4}     | ${3}      | ${true}      | ${1}
      ${5}     | ${3}      | ${true}      | ${2}
      ${6}     | ${3}      | ${true}      | ${0}
      ${7}     | ${3}      | ${true}      | ${1}
      ${8}     | ${3}      | ${true}      | ${2}
    `('should return $expected for ($index, $numCols, $zeroBased) ', ({ index, numCols, zeroBased, expected }) => {
      expect(toColFromIndex(index, numCols, zeroBased)).toBe(expected);
    });
  })
})
