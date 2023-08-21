import { calculate } from '../calculate';
import { splitCalculationStr } from '../splitCalculationStr';

describe('Calculator - Calculate', () => {
  describe('When calculationStr is invalid', () => {
    describe('- calculationStr is empty', () => {
      it('[""] (empty string) should return ICalculationError', () => {
        const calculationStr = '';
        const result = calculate(calculationStr);
        const expected = { __typename: 'ICalculationError', message: 'Calculation string is empty' };
        expect(result).toMatchObject(expected);
      });
    });
    describe.each([['invalid chars', '(1+a)*b', { __typename: 'ICalculationError', message: 'Invalid calculation string' }]])(
      '- calculationStr contains invalid characters',
      (note, calcuationStr, expected) => {
        it(`[${calcuationStr}] (${note}) should return ICalculationError with message`, () => {
          expect(calculate(calcuationStr)).toMatchObject(expected);
        });
      }
    );
    describe.each([
      //prettier-ignore
      ['opening bracket before closing bracket', '1+2)*(3', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      ['opening brackets > closing brackets', '(1+2)*(3', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      ['closing brackets > opening brackets', '(1+2)*3)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }]
    ])('- calculationStr has unbalanced brackets', (note, calcuationStr, expected) => {
      it(`[${calcuationStr}] (${note}) should return ICalculationError with message`, () => {
        expect(calculate(calcuationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      [' ** ', '1**2', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' */ ', '1*/2', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' /* ', '1/*2', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' // ', '1//2', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' () ', '1*()', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' -) ', '(3+2-)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' +) ', '(3+2+)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' *) ', '(3+2*)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' /) ', '(3+2/)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' /* ', '(3/*2)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' -* ', '(3-/)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' -/ ', '(3-/2)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' +* ', '(3+*2)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' +/ ', '(3+/2)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' (* ', '(*3*5)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }],
      [' (/ ', '(/3*5)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }]
    ])('- calculationStr contains invalid operations', (note, calcuationStr, expected) => {
      it(`[${calcuationStr}] (${note}) should return ICalculationError with message`, () => {
        expect(calculate(calcuationStr)).toMatchObject(expected);
      });
    });

    describe.each([['multiple decimal points', '(1.345.4*123..)', { __typename: 'ICalculationError', message: 'Invalid calculation string' }]])(
      '- calculationStr contains multiple decimal points within a single number',
      (note, calculationStr, expected) => {
        it(`[${note}] (${calculationStr} should return ICalculationError with message`, () => {
          expect(calculate(calculationStr)).toMatchObject(expected);
        });
      }
    );
  });

  describe('When calculationStr is valid', () => {
    describe.each([
      ['multiply', '3*7', { __typename: 'ICalculationSuccess', value: 3 * 7 }],
      ['divide', '3/7', { __typename: 'ICalculationSuccess', value: 3 / 7 }],
      ['add', '3+7', { __typename: 'ICalculationSuccess', value: 3 + 7 }],
      ['subtract', '3-7', { __typename: 'ICalculationSuccess', value: 3 - 7 }]
    ])('- single operation with positive whole numbers', (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      ['multiply', '-3*-7', { __typename: 'ICalculationSuccess', value: -3 * -7 }],
      ['divide', '-3/-7', { __typename: 'ICalculationSuccess', value: -3 / -7 }],
      ['add', '-3+-7', { __typename: 'ICalculationSuccess', value: -3 + -7 }],
      ['subtract', '-3--7', { __typename: 'ICalculationSuccess', value: -3 - -7 }]
    ])(`- single operation with negative whole numbers`, (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      ['multiply', '-3*7', { __typename: 'ICalculationSuccess', value: -3 * 7 }],
      ['multiply', '3*-7', { __typename: 'ICalculationSuccess', value: 3 * -7 }],
      ['divide', '-3/7', { __typename: 'ICalculationSuccess', value: -3 / 7 }],
      ['divide', '3/-7', { __typename: 'ICalculationSuccess', value: 3 / -7 }],
      ['add', '-3+7', { __typename: 'ICalculationSuccess', value: -3 + 7 }],
      ['add', '3+-7', { __typename: 'ICalculationSuccess', value: 3 + -7 }],
      ['subtract', '-3--7', { __typename: 'ICalculationSuccess', value: -3 - -7 }],
      ['subtract', '3--7', { __typename: 'ICalculationSuccess', value: 3 - -7 }]
    ])('- single operation with positive and negative whole numbers', (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      ['positive numbers', '1+2*3-4/5', { __typename: 'ICalculationSuccess', value: 1 + 2 * 3 - 4 / 5 }],
      ['negative numbers', '-1+-2*-3--4/-5', { __typename: 'ICalculationSuccess', value: -1 + -2 * -3 - -4 / -5 }],
      ['positive and negative numbers', '-1-2*-3+4/-5', { __typename: 'ICalculationSuccess', value: -1 - 2 * -3 + 4 / -5 }],
      ['positive and negative numbers', '1/-2+3-4*-5', { __typename: 'ICalculationSuccess', value: 1 / -2 + 3 - 4 * -5 }]
    ])('- multiple operations with positive and negative whole numbers', (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      ['surrounding bracket', '(1+2*3-4/5)', { __typename: 'ICalculationSuccess', value: 1 + 2 * 3 - 4 / 5 }],
      ['single bracket', '(1+2)*3-4/5', { __typename: 'ICalculationSuccess', value: (1 + 2) * 3 - 4 / 5 }],
      ['multiple bracket', '(1+2)*(3-4)/5', { __typename: 'ICalculationSuccess', value: ((1 + 2) * (3 - 4)) / 5 }],
      ['bracket times bracket', '(1+2*3)(-4/5)', { __typename: 'ICalculationSuccess', value: (1 + 2 * 3) * (-4 / 5) }],
      ['number times bracket', '-(1+2*3)/-5(6-7)', { __typename: 'ICalculationSuccess', value: (-(1 + 2 * 3) / -5) * (6 - 7) }],
      ['nested bracket', '-((1+2)/3+4*5)/((6+7)*2+1)', { __typename: 'ICalculationSuccess', value: -((1 + 2) / 3 + 4 * 5) / ((6 + 7) * 2 + 1) }]
    ])('- multiple operations with brackets and whole numbers', (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });

    describe.each([
      ['surrounding bracket', '(1.23+2.34*3.45-4.56/5.67)', { __typename: 'ICalculationSuccess', value: 1.23 + 2.34 * 3.45 - 4.56 / 5.67 }],
      ['single bracket', '(1.23+2.34)*3.45-4.56/5.67', { __typename: 'ICalculationSuccess', value: (1.23 + 2.34) * 3.45 - 4.56 / 5.67 }],
      ['multiple bracket', '(1.23+2.34)*(3.45-4.56)/5.67', { __typename: 'ICalculationSuccess', value: ((1.23 + 2.34) * (3.45 - 4.56)) / 5.67 }],
      ['bracket times bracket', '(1.23+2.34*3.45)(-4.56/5.67)', { __typename: 'ICalculationSuccess', value: (1.23 + 2.34 * 3.45) * (-4.56 / 5.67) }],
      ['number times bracket', '-(1.23+2.34*3.45)/-5.67(6.78-7.89)', { __typename: 'ICalculationSuccess', value: (-(1.23 + 2.34 * 3.45) / -5.67) * (6.78 - 7.89) }],
      ['nested bracket', '-((1.23+2.34)/3.45+4.56*5.67)/((6.78+7.89)*2.34+1.23)', { __typename: 'ICalculationSuccess', value: -((1.23 + 2.34) / 3.45 + 4.56 * 5.67) / ((6.78 + 7.89) * 2.34 + 1.23) }]
    ])('- multiple operations with brackets and decimals', (note, calculationStr, expected) => {
      it(`[${calculationStr}] (${note}) should return ICalculationSuccess with correct value`, () => {
        expect(calculate(calculationStr)).toMatchObject(expected);
      });
    });
  });
});
