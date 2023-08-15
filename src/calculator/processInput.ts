export type ProcessCalculationStrSuccess = {
  __typename: 'ProcessCalculationStrSuccess';
  message: string;
  operations: string[];
  numbers: number[];
};

export type ProcessCalculationStrError = {
  __typename: 'ProcessCalculationStrError';
  message: string;
};

export type ProcessCalculationStrResult = ProcessCalculationStrSuccess | ProcessCalculationStrError;

export function processCalculationStr(calculationStr: string): ProcessCalculationStrResult {
  if (calculationStr === '') {
    return {
      __typename: 'ProcessCalculationStrError',
      message: 'invalid calculation'
    };
  }

  //remove any white spaces
  let calculation = calculationStr.replace(/\s+/g, '');

  if (!/^[+-]?\d*\.?\d+(?:[+*\/-][+-]?\d*\.?\d+)*$/.test(calculation)) {
    return {
      __typename: 'ProcessCalculationStrError',
      message: 'invalid calculation'
    };
  }

  //replace ++ -- +- -- with single operation
  calculation = calculation.replace(/\+\+/g, '+');
  calculation = calculation.replace(/\-\-/g, '+');
  calculation = calculation.replace(/\+\-/g, '-');
  calculation = calculation.replace(/\-\+/g, '-');

  const sections = calculation.split(/[\/\*]/);

  console.log(sections);

  return {
    __typename: 'ProcessCalculationStrSuccess',
    message: 'success',
    operations: [],
    numbers: []
  };
}
