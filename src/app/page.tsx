import { calculate } from '@/calculator/calculate';

export default function Home() {
  const calculationStr = '(1+10)(4+1)*3';
  const result = calculate(calculationStr);
  return (
    <main className="">
      <h1>{calculationStr}</h1>
      {result.__typename === 'ICalculationSuccess' ? <h2>{result.value}</h2> : null}
    </main>
  );
}
