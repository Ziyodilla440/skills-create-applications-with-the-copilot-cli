#!/usr/bin/env node

/**
 * Node.js CLI calculator.
 *
 * Supported operations:
 * - addition (+ or add)
 * - subtraction (- or subtract)
 * - multiplication (* or multiply)
 * - division (/ or divide)
 *
 * Usage:
 *   node src/calculator.js <operation> <number> [number...]
 */

const operationAliases = {
  '+': 'add',
  add: 'add',
  '-': 'subtract',
  subtract: 'subtract',
  '*': 'multiply',
  multiply: 'multiply',
  '/': 'divide',
  divide: 'divide',
};

function parseNumbers(values) {
  const numbers = values.map(Number);

  if (numbers.some((number) => !Number.isFinite(number))) {
    throw new Error('All operands must be valid numbers.');
  }

  return numbers;
}

function calculate(operation, operands) {
  const normalizedOperation = operationAliases[operation.toLowerCase()];

  if (!normalizedOperation) {
    throw new Error(
      'Unsupported operation. Use add, subtract, multiply, or divide.',
    );
  }

  if (operands.length < 2) {
    throw new Error('At least two operands are required.');
  }

  switch (normalizedOperation) {
    // Addition: add two or more numbers together.
    case 'add':
      return operands.reduce((total, number) => total + number, 0);

    // Subtraction: subtract the second number from the first.
    case 'subtract':
      if (operands.length !== 2) {
        throw new Error('Subtraction requires exactly two operands.');
      }
      return operands[0] - operands[1];

    // Multiplication: multiply two or more numbers together.
    case 'multiply':
      return operands.reduce((total, number) => total * number, 1);

    // Division: divide the first number by the second.
    case 'divide':
      if (operands.length !== 2) {
        throw new Error('Division requires exactly two operands.');
      }
      if (operands[1] === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return operands[0] / operands[1];

    default:
      throw new Error('Unsupported operation.');
  }
}

function main(args) {
  if (args.length < 3) {
    throw new Error(
      'Usage: node src/calculator.js <operation> <number> [number...]',
    );
  }

  const [operation, ...operandValues] = args;
  return calculate(operation, parseNumbers(operandValues));
}

if (require.main === module) {
  try {
    console.log(main(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate, main };
