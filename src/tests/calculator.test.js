const {
  calculate,
  main,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

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

  describe('modulo', () => {
    test('calculates the image example: 5 % 2', () => {
      expect(modulo(5, 2)).toBe(1);
      expect(calculate('%', [5, 2])).toBe(1);
      expect(main(['modulo', '5', '2'])).toBe(1);
    });

    test('supports negative dividends and exact divisions', () => {
      expect(modulo(-5, 2)).toBe(-1);
      expect(modulo(8, 4)).toBe(0);
    });

    test('rejects modulo by zero', () => {
      expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed.');
      expect(() => calculate('%', [5, 0])).toThrow(
        'Modulo by zero is not allowed.',
      );
    });

    test('requires exactly two operands', () => {
      expect(() => calculate('modulo', [10, 3, 1])).toThrow(
        'Modulo requires exactly two operands.',
      );
    });
  });

  describe('power', () => {
    test('calculates the image example: 2 ^ 3', () => {
      expect(power(2, 3)).toBe(8);
      expect(calculate('^', [2, 3])).toBe(8);
      expect(main(['power', '2', '3'])).toBe(8);
    });

    test('supports zero and negative exponents', () => {
      expect(power(5, 0)).toBe(1);
      expect(power(2, -2)).toBe(0.25);
    });

    test('requires exactly two operands', () => {
      expect(() => calculate('power', [2, 3, 4])).toThrow(
        'Power requires exactly two operands.',
      );
    });
  });

  describe('square root', () => {
    test('calculates the image example: square root of 16', () => {
      expect(squareRoot(16)).toBe(4);
      expect(calculate('sqrt', [16])).toBe(4);
      expect(main(['sqrt', '16'])).toBe(4);
    });

    test('supports zero and decimal values', () => {
      expect(squareRoot(0)).toBe(0);
      expect(squareRoot(0.25)).toBe(0.5);
    });

    test('rejects negative numbers', () => {
      expect(() => squareRoot(-1)).toThrow(
        'Square root of a negative number is not allowed.',
      );
      expect(() => calculate('sqrt', [-16])).toThrow(
        'Square root of a negative number is not allowed.',
      );
    });

    test('requires exactly one operand', () => {
      expect(() => calculate('sqrt', [9, 16])).toThrow(
        'Square root requires exactly one operand.',
      );
    });
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('log', [2, 3])).toThrow(
      'Unsupported operation. Use add, subtract, multiply, divide, modulo, power, or squareRoot.',
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
      'At least two operands are required.',
    );
  });
});
