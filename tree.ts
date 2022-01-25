/* eslint-disable max-classes-per-file */

const assert = require('assert');

enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = 'x',
  DIVIDE = '÷',
  NONE = '',
}

interface TreeNode {
  result(): number,
  toString(): string,
}

class Operand implements TreeNode {
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  result() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

abstract class BinaryNode implements TreeNode {
  left: TreeNode;

  right: TreeNode;

  constructor(left: TreeNode, right: TreeNode) {
    this.left = left;
    this.right = right;
  }

  result(): number {
    throw new TypeError('not implemented');
  }

  toString(): string {
    throw new TypeError('not implemented');
  }
}

class Add extends BinaryNode {
  result() {
    return this.left.result() + this.right.result();
  }

  toString() {
    return `(${this.left.toString()} + ${this.right.toString()})`;
  }
}

class Subtract extends BinaryNode {
  result() {
    return this.left.result() - this.right.result();
  }

  toString() {
    return `(${this.left.toString()} - ${this.right.toString()})`;
  }
}

class Multiply extends BinaryNode {
  result() {
    return this.left.result() * this.right.result();
  }

  toString() {
    return `(${this.left.toString()} x ${this.right.toString()})`;
  }
}

class Divide extends BinaryNode {
  result() {
    return this.left.result() / this.right.result();
  }

  toString() {
    return `(${this.left.toString()} ÷ ${this.right.toString()})`;
  }
}

function operationFromStr(originalStr: string): Operation {
  /*
   * more generic solutions exist, but this is by far the simplest
   */
  switch (originalStr) {
    case '': return Operation.NONE;
    case '+': return Operation.ADD;
    case '÷': return Operation.DIVIDE;
    case '-': return Operation.SUBTRACT;
    case 'x': return Operation.MULTIPLY;
    default: throw new TypeError(`invalid operation: ${originalStr}`);
  }
}

/**
 * We keep the initial node function as a sort-of factory for backwards compatibility
 */
const Node = (operator: string, value: number, left: TreeNode, right: TreeNode) => {
  const operationType = operationFromStr(operator);

  // yes, this is an anti-pattern, but we really want that backwards compatiblity
  switch (operationType) {
    case Operation.ADD: return new Add(left, right);
    case Operation.SUBTRACT: return new Subtract(left, right);
    case Operation.MULTIPLY: return new Multiply(left, right);
    case Operation.DIVIDE: return new Divide(left, right);
    case Operation.NONE: return new Operand(value);
    default: throw new TypeError('unsupported operator');
  }
};

module.exports = Node;

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString());
assert.strictEqual(2, tree.result());
