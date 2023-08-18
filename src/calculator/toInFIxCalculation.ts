import { MathCalculationComponent } from './calculator.model';
import { splitCalculationStr } from './splitCalculationStr';

export function toInFixCalculation(calculationStrArr: string[]) {
  const calculation: MathCalculationComponent[] = calculationStrArr.map((component) => {
    if (component === '+' || component === '-' || component === '/' || component === '*' || component === '(' || component == ')') {
      return component;
    }
    return Number(component);
  });
  console.log(calculation);
  return calculation;
}
