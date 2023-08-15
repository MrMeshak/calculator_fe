import { ProcessCalculationStrError, ProcessCalculationStrResult, processCalculationStr } from '../processInput';

describe('calculator - processInput', () => {
  describe('when calculator input string is not a valid calculation', () => {
    describe('- calculator input string is empty', () => {
      it('should return ProcessCalculationStrError', () => {
        const calculation = '';

        const result = processCalculationStr(calculation);

        const expected: ProcessCalculationStrError = {
          __typename: 'ProcessCalculationStrError',
          message: 'invalid calculation'
        };

        expect(result).toEqual(expected);
      });
    });
    describe('- calculator input string contains invalid characters', () => {
      it('should return ProcessingCalculationStrError', () => {
        const calculations = ['23 + hello'];

        const results = calculations.map((calculation) => processCalculationStr(calculation));

        const expected: ProcessCalculationStrError = {
          __typename: 'ProcessCalculationStrError',
          message: 'invalid calculation'
        };

        results.forEach((result) => expect(result).toEqual(expected));
      });
    });
    describe('- calculator input string contains invalid operations (**, *+, +++ etc) ', () => {
      it('should return ProcessingCalculationStrError', () => {
        const calculations = ['23.5 +++ 45', '67 ** 78', '54 // 74'];

        const results: ProcessCalculationStrResult[] = calculations.map((calculation) => processCalculationStr(calculation));

        const expected: ProcessCalculationStrError = {
          __typename: 'ProcessCalculationStrError',
          message: 'invalid calculation'
        };

        results.forEach((result) => expect(result).toEqual(expected));
      });
    });
    describe('- calculator input string ends in an operation', () => {
      it('should return ProcessingInputError', () => {
        const calculations = ['34 + 56 +', '-56 - 78 /'];

        const results: ProcessCalculationStrResult[] = calculations.map((calculation) => processCalculationStr(calculation));

        const expected: ProcessCalculationStrError = {
          __typename: 'ProcessCalculationStrError',
          message: 'invalid calculation'
        };

        results.forEach((result) => expect(result).toEqual(expected));
      });
    });
    describe('- calculator input string contains decimal points in invalid positions or mutiple decimal points in a single number', () => {
      it('should return ProcessCalculationStrError', () => {
        const calculations = ['100-34.56.', '23.4-..52'];

        const results: ProcessCalculationStrResult[] = calculations.map((calculation) => processCalculationStr(calculation));

        const expected: ProcessCalculationStrError = {
          __typename: 'ProcessCalculationStrError',
          message: 'invalid calculation'
        };

        expect(results[0]).toEqual(expected);
        results.forEach((result) => expect(result).toEqual(expected));
      });
    });
  });

  describe('when calculator input string is a valid calculation', () => {
    xdescribe('- contains positive whole numbers', () => {});
    xdescribe('- contains positive and negative whole numbers', () => {});
    xdescribe('- contains ++ , --, +-, -+', () => {});
    describe('- contains positive and negative decimals', () => {
      it('Should return ProcessCalculationSuccess', () => {
        const calculations = ['23.5 * -45.8'];
        processCalculationStr(calculations[0]);
      });
    });
  });
});
