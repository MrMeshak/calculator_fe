import { toInFixCalculation } from '@/calculator/toInFIxCalculation';
import { toPostFixCalculation } from '@/calculator/toPostFixCalculation';
import { postFixEvaluator } from '@/calculator/postFixEvaluator';

export default function Home() {
  const inFixCalculation = toInFixCalculation('-3*-(-5*4+-3.45*2)-1');
  const postFixCalcuation = toPostFixCalculation(inFixCalculation);
  console.log(postFixCalcuation);
  const evaluatedValue = postFixEvaluator(postFixCalcuation);
  console.log(evaluatedValue);
  return (
    <main className="">
      <h1>home</h1>
    </main>
  );
}
