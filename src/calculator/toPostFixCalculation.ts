import { MathCalculationComponent, MathCalculationOperation, MathPostFixCalculationComponent, operatorPrecidence } from './calculator.model';

export function toPostFixCalculation(inFixCalculation: MathCalculationComponent[]): MathPostFixCalculationComponent[] {
  const queue: MathCalculationComponent[] = [];
  const stack: MathCalculationOperation[] = [];

  inFixCalculation.forEach((component, index) => {
    if (component === '(') {
      shuntOpeningBracket(stack);
    } else if (component === ')') {
      shuntClosingBracket(stack, queue);
    } else if (component === '+' || component === '-' || component === '*' || component === '/') {
      shuntMathOperation(stack, queue, component);
    } else {
      shuntNumber(queue, component);
    }
    console.log('stack: ', stack);
    console.log('queue: ', queue);
  });

  return queue.concat(stack.reverse()) as MathPostFixCalculationComponent[];
}

function shuntOpeningBracket(stack: MathCalculationOperation[]) {
  stack.push('(');
}

function shuntClosingBracket(stack: MathCalculationOperation[], queue: MathCalculationComponent[]) {
  let prevOperation = stack.pop();

  while (prevOperation && prevOperation !== '(') {
    queue.push(prevOperation);
    prevOperation = stack.pop();
  }
}

function shuntMathOperation(stack: MathCalculationOperation[], queue: MathCalculationComponent[], mathToken: MathCalculationOperation) {
  let prevMathToken: MathCalculationOperation | undefined = stack[stack.length - 1];
  if (stack.length === 0) {
    stack.push(mathToken);
    return;
  }

  if (prevMathToken && operatorPrecidence[prevMathToken] < operatorPrecidence[mathToken]) {
    stack.push(mathToken);
    return;
  }

  queue.push(prevMathToken);
  stack.pop();
  stack.push(mathToken);
}

function shuntNumber(queue: MathCalculationComponent[], num: number) {
  queue.push(num);
}
