const { add } = require('../src/utils/calculator');

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});
