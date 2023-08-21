import { MathCalculationComponent, MathPostFixCalculationComponent } from './calculator.model';

export function isValidCalculationStr(calcuationStr: string) {
  const calculationStr = '(' + calcuationStr.replace(/[\s]/g, '') + ')';

  //prettier-ignore
  const invalidOperators = ['**', '*/', '/*', '//', '()', '-)', '+)', '*)', '/*', '-*', '-/', '+*', '+/', '(*', '(/', '/)', '*)', '+)', '-)']

  let bracketBalanceCount = 0;
  for (let i = 0; i < calculationStr.length; i++) {
    //Brackets balance
    if (calcuationStr[i] === '(') {
      bracketBalanceCount++;
    } else if (calcuationStr[i] === ')') {
      bracketBalanceCount--;
      if (bracketBalanceCount < 0) {
        return false;
      }
    }

    if (i > 0) {
      for (let j = 0; j < invalidOperators.length; j++)
        if (invalidOperators[j][0] === calcuationStr[i - 1] && invalidOperators[j][1] === calcuationStr[i]) {
          return false;
        }
    }
  }

  if (bracketBalanceCount !== 0) {
    return false;
  }

  if (/[\+\-\/\*]{3,}/.test(calcuationStr)) {
    return false;
  }

  const sections = calcuationStr.split(/[\+\-\*\/\(\)]/g);
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].length > 0 && Number.isNaN(Number(sections[i])) && !Number.isFinite(Number(sections[i]))) {
      return false;
    }
  }

  return true;
}
