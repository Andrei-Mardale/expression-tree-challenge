/* eslint-disable max-classes-per-file */

// eslint-disable-next-line @typescript-eslint/no-var-requires
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

/**
 * Class for holding simple operands
 * This is just a wrapper over the initial value
 */
class Operand implements TreeNode {
  value: number;

  constructor(value: number) {
    if (value == null || Number.isNaN(value)) {
      throw new TypeError('value is not a number');
    }

    this.value = value;
  }

  result() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

/**
 * Common logic for all binary operators
 * Responsible for storage and common typechecks
 */
abstract class BinaryNode implements TreeNode {
  left: TreeNode;

  right: TreeNode;

  constructor(left: TreeNode, right: TreeNode) {
    if (left == null || right == null) {
      throw new TypeError('Both left and right operands are required');
    }

    this.left = left;
    this.right = right;
  }

  // eslint-disable-next-line class-methods-use-this
  result(): number {
    throw new TypeError('not implemented');
  }

  // eslint-disable-next-line class-methods-use-this
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
  constructor(left: TreeNode, right: TreeNode) {
    if (right instanceof Operand && right.result() === 0) {
      // we do this check only if the right side value is an operand
      // for operator types, we let the potential error happen as a 'runtime' error
      throw new TypeError('Explicit division by zero is not allowed');
    }

    super(left, right);
  }

  result() {
    return this.left.result() / this.right.result();
  }

  toString() {
    return `(${this.left.toString()} ÷ ${this.right.toString()})`;
  }
}

/**
 * From a given string get the Operation enum value or throw an error if an invalid string
 * is provided
 *
 * @param originalStr string representing an operation or '' if the resulting createNode
 * should be a simple operand
 * @returns the associated enum
 */
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
 * We keep the initial createNode function as a sort-of factory for backwards compatibility
 */
const createNode = (operator: string, value: number, left: TreeNode, right: TreeNode) => {
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

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString());
assert.strictEqual(2, tree.result());

export default createNode;
