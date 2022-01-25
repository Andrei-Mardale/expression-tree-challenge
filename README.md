## Expression Tree Challenge

### How to run

 1. `git clone`
 2. `npm install`
 3. `npm run test`

### Implementation details



 - the implementation was done in TypeScript with Jest for testing
 - the refactoring was done with the OOP paradigm in mind:
	 - there is a base `TreeNode` interface that defines the common operations for all elements
	 - conceptually there are 2 kinds of `TreeNode` entities:
		 - unary - in our case just simple values
		 - binary - nodes that require 2 operands to fulfill the operation
	 - binary nodes share a common logic for storing and type-checking defined in the `BinaryNode` abstract class
	 - the individual implementation are straightforward except for `Division` where there is an extract check added
 - the original `Node` function has been renamed to `createNode`
 - the external behaviour of the function is identical, but the implementation changed in order to benefit from the newly refactored OOP style code - currently it is used as an entry point for the main logic
