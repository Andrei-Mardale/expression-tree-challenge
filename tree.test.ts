import createNode from './tree.ts';

test('original test', () => {
  const tree = createNode(
    '÷',
    null,
    createNode(
      '+',
      null,
      createNode('', 7, null, null),
      createNode(
        'x',
        null,
        createNode('-', null, createNode('', 3, null, null), createNode('', 2, null, null)),
        createNode('', 5, null, null),
      ),
    ),
    createNode('', 6, null, null),
  );

  expect(tree.toString()).toBe('((7 + ((3 - 2) x 5)) ÷ 6)');
  expect(tree.result()).toBe(2);
});

test('binary operators fail if one operand is missing', () => {
  const functionCall = () => {
    createNode('+', null, 1, null);
  };

  expect(functionCall).toThrow(TypeError);
});

test('unary operators fail if operand is not provided', () => {
  const functionCall = () => {
    createNode('', null, null, null);
  };

  expect(functionCall).toThrow(TypeError);
});

test('explicit division by zero is not allowed', () => {
  // this checks that the user is not allowed to provide 0 as right-side operator for division
  const functionCall = () => {
    createNode(
      '÷',
      null,
      createNode('', 123, null, null),
      createNode('', 0, null, null),
    );
  };

  expect(functionCall).toThrow(TypeError);
});

test('unary operators are not serialized with parantheses', () => {
  const node = createNode('', 2, null, null);

  expect(node.toString()).toBe('2');
});

test('invalid operators are not supported', () => {
  const functionCall = () => {
    createNode('/', null, null, null);
  };

  expect(functionCall).toThrow(TypeError);
});
