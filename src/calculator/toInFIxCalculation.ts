import { MathCalculationComponent } from './calculator.model';
import { splitCalculationStr } from './splitCalculationStr';

export function toInFixCalculation(calculationStr: string) {
  const calculationStrArr = splitCalculationStr(calculationStr);

  const calculation: MathCalculationComponent[] = calculationStrArr.map((str) => {
    if (str === '+' || str === '-' || str === '/' || str === '*' || str === '(' || str == ')') {
      return str;
    }
    return Number(str);
  });
  console.log(calculation);
  return calculation;
}
