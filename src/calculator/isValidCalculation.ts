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
      invalidOperators.forEach((operator) => {
        if (operator[0] === calcuationStr[i - 1] && operator[1] === calcuationStr[i]) {
          return false;
        }
      });
    }
  }

  if (bracketBalanceCount !== 0) {
    return false;
  }

  if (/[\+\-\/\*]{3,}/.test(calcuationStr)) {
    return false;
  }

  const sections = calcuationStr.split(/[\+\-\*\/\(\)]g/);
  sections.forEach((section) => {
    if (section.length > 0 && Number.isNaN(Number(section)) && !Number.isFinite(Number(section))) {
      return false;
    }
  });

  return true;
}
