import { MathPostFixCalculationComponent } from './calculator.model';

export function postFixEvaluator(postFixCalculation: MathPostFixCalculationComponent[]) {
  const stack: number[] = [];

  postFixCalculation.forEach((component, index) => {
    if (component === '+') {
      const num2 = stack.pop();
      const num1 = stack.pop();
      if (!num1 || !num2) {
        return;
      }
      stack.push(num1 + num2);
      return;
    }

    if (component === '-') {
      const num2 = stack.pop();
      const num1 = stack.pop();
      if (!num1 || !num2) {
        return;
      }
      stack.push(num1 - num2);
      return;
    }

    if (component === '*') {
      const num2 = stack.pop();
      const num1 = stack.pop();
      if (!num1 || !num2) {
        return;
      }
      stack.push(num1 * num2);
      return;
    }

    if (component === '/') {
      const num2 = stack.pop();
      const num1 = stack.pop();
      if (!num1 || !num2) {
        return;
      }
      stack.push(num1 / num2);
      return;
    }

    stack.push(component);
  });

  return stack.pop();
}
