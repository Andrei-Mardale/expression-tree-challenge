const Node = require('./tree');

test('original test', () => {
  const tree = Node(
    '÷',
    null,
    Node(
      '+',
      null,
      Node('', 7, null, null),
      Node(
        'x',
        null,
        Node('-', null, Node('', 3, null, null), Node('', 2, null, null)),
        Node('', 5, null, null)
      )
    ),
    Node('', 6, null, null)
  );

  expect(tree.toString()).toBe('((7 + ((3 - 2) x 5)) ÷ 6)');
  expect(tree.result()).toBe(2);
});

test('binary operators fail if one operand is missing', () => {
  const functionCall = () => {
    Node('+', null, 1, null);
  };

  expect(functionCall).toThrow(TypeError);
});

test('unary operators fail if operand is not provided', () => {
  const functionCall = () => {
    Node('', null, null, null);
  };

  expect(functionCall).toThrow(TypeError);
});

test('explicit division by zero is not allowed', () => {
  // this checks that the user is not allowed to provide 0 as right-side operator for division
  const functionCall = () => {
    Node(
      '÷',
      null,
      Node('', 123, null, null),
      Node('', 0, null, null)
    );
  };

  expect(functionCall).toThrow(TypeError);
});
