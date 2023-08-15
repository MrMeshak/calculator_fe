export type MathCalculationOperation = '-' | '+' | '/' | '*' | '(' | ')';
export type MathCar = number | '-' | '+' | '/' | '*' | '(' | ')';
export type MathCalculationComponent = number | '-' | '+' | '/' | '*' | '(' | ')';
export type MathPostFixCalculationOperation = '-' | '+' | '/' | '*';
export type MathPostFixCalculationComponent = number | '+' | '-' | '/' | '*';

export const operatorPrecidence = {
  ')': 0,
  '(': 0,
  '+': 1,
  '-': 1,
  '/': 2,
  '*': 2
};
