function sum(a, b) {
  return a + b;
}

test('teste', () => {
  const result = sum(4, 5);

  expect(result).toBe(9);
});
