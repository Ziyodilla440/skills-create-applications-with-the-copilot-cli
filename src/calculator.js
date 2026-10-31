#!/usr/bin/env node

/**
 * Node.js CLI calculator.
 *
 * Supported operations:
 * - addition (+ or add)
 * - subtraction (- or subtract)
 * - multiplication (* or multiply)
 * - division (/ or divide)
 * - modulo (% or modulo)
 * - exponentiation (^, power, or exponentiate)
 * - square root (sqrt or squareRoot)
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
  '%': 'modulo',
  modulo: 'modulo',
  '^': 'power',
  power: 'power',
  exponentiate: 'power',
  sqrt: 'squareRoot',
  squareroot: 'squareRoot',
};

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

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
      'Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot.',
    );
  }

  if (operands.length < 1) {
    throw new Error('At least two operands are required.');
  }

  if (normalizedOperation !== 'squareRoot' && operands.length < 2) {
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

    // Modulo: return the remainder after dividing the first number by the second.
    case 'modulo':
      if (operands.length !== 2) {
        throw new Error('Modulo requires exactly two operands.');
      }
      return modulo(operands[0], operands[1]);

    // Exponentiation: raise the first number to the power of the second.
    case 'power':
      if (operands.length !== 2) {
        throw new Error('Power requires exactly two operands.');
      }
      return power(operands[0], operands[1]);

    // Square root: calculate the square root of the only operand.
    case 'squareRoot':
      if (operands.length !== 1) {
        throw new Error('Square root requires exactly one operand.');
      }
      return squareRoot(operands[0]);

    default:
      throw new Error('Unsupported operation.');
  }
}

function main(args) {
  if (args.length < 2) {
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

module.exports = { calculate, main, modulo, power, squareRoot };
