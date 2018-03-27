const add = require('../src')

test('add', () => {
  expect(add(1)).toBe(1)
  expect(add(1, 2, 3, 4, 5)).toBe(15)
})
