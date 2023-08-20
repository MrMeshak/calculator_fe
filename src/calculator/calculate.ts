import { isValidCalculationStr } from './isValidCalculation';
import { splitCalculationStr } from './splitCalculationStr';
import { toInFixCalculation } from './toInFIxCalculation';
import { toPostFixCalculation } from './toPostFixCalculation';
import { postFixEvaluator } from './postFixEvaluator';

interface ICalculationError {
  __typename: 'ICalculationError';
  message: string;
}

interface ICalculationSuccess {
  __typename: 'ICalculationSuccess';
  message: string;
  value: number;
}

type CalculationResult = ICalculationError | ICalculationSuccess;

export function calculate(calcuationStr: string): CalculationResult {
  if (!isValidCalculationStr(calcuationStr)) {
    return {
      __typename: 'ICalculationError',
      message: 'Invalid calculation'
    };
  }

  const result = postFixEvaluator(toPostFixCalculation(toInFixCalculation(splitCalculationStr(calcuationStr))));

  if (!result) {
    return {
      __typename: 'ICalculationError',
      message: 'Calculation Undefined'
    };
  }

  return {
    __typename: 'ICalculationSuccess',
    message: 'Calculation Success',
    value: result
  };
}
