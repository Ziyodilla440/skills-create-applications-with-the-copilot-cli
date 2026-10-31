const { calculate, main } = require('../calculator');

describe('calculate', () => {
  describe('addition', () => {
    test('adds the example values from the calculator image', () => {
      expect(calculate('+', [2, 3])).toBe(5);
    });

    test('adds two or more operands', () => {
      expect(calculate('add', [1, 2, 3, 4])).toBe(10);
    });

    test('supports negative and decimal operands', () => {
      expect(calculate('add', [-2.5, 5])).toBe(2.5);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example values from the calculator image', () => {
      expect(calculate('-', [10, 4])).toBe(6);
    });

    test('supports negative results', () => {
      expect(calculate('subtract', [4, 10])).toBe(-6);
    });

    test('requires exactly two operands', () => {
      expect(() => calculate('subtract', [10, 4, 1])).toThrow(
        'Subtraction requires exactly two operands.',
      );
    });
  });

  describe('multiplication', () => {
    test('multiplies the example values from the calculator image', () => {
      expect(calculate('*', [45, 2])).toBe(90);
    });

    test('multiplies two or more operands', () => {
      expect(calculate('multiply', [2, 3, 4])).toBe(24);
    });

    test('returns zero when an operand is zero', () => {
      expect(calculate('multiply', [8, 0, 3])).toBe(0);
    });
  });

  describe('division', () => {
    test('divides the example values from the calculator image', () => {
      expect(calculate('/', [20, 5])).toBe(4);
    });

    test('supports decimal results', () => {
      expect(calculate('divide', [5, 2])).toBe(2.5);
    });

    test('rejects division by zero', () => {
      expect(() => calculate('divide', [20, 0])).toThrow(
        'Division by zero is not allowed.',
      );
    });

    test('requires exactly two operands', () => {
      expect(() => calculate('divide', [20, 5, 1])).toThrow(
        'Division requires exactly two operands.',
      );
    });
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('power', [2, 3])).toThrow(
      'Unsupported operation. Use add, subtract, multiply, or divide.',
    );
  });

  test('requires at least two operands', () => {
    expect(() => calculate('add', [2])).toThrow(
      'At least two operands are required.',
    );
  });
});

describe('main', () => {
  test('parses CLI arguments and returns a result', () => {
    expect(main(['multiply', '45', '2'])).toBe(90);
  });

  test('rejects non-numeric CLI arguments', () => {
    expect(() => main(['add', '2', 'not-a-number'])).toThrow(
      'All operands must be valid numbers.',
    );
  });

  test('rejects incomplete CLI arguments', () => {
    expect(() => main(['add', '2'])).toThrow(
      'Usage: node src/calculator.js <operation> <number> [number...]',
    );
  });
});
