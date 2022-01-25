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