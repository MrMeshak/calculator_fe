export function splitCalculationStr(calculationStr: string) {
  const calculationStrClean = '(' + calculationStr.replace(/s/g, '') + ')';

  const calculationStrArr = calculationStrClean.split(/(?=[+\-\/\*\(\)])|(?<=[+\-\/\*\(\)])/g);

  console.log('split calcuation string', calculationStrArr);

  //Checking for unitary operators and implicit multiplication
  if (calculationStrArr.length > 2) {
    for (let i = 1; i < calculationStrArr.length - 1; i++) {
      //unitary operator with number eg -2.34
      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && /[+\-]/.test(calculationStrArr[i]) && /[\d]/.test(calculationStrArr[i + 1])) {
        const numberStr = calculationStrArr.splice(i + 1, 1)[0];
        calculationStrArr[i] = calculationStrArr[i].concat(numberStr);
        continue;
      }

      //unitary operator with brackent eg. +() or -()
      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '-' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1, '-1', '*');
        continue;
      }
      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '+' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1);
        continue;
      }

      //number infront of bracket eg. 5()
      if (/[/d]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '(') {
        calculationStrArr.splice(i, 0, '*');
        continue;
      }

      //bracket infront of bracket )(
      if (calculationStr[i - 1] === ')' && calculationStr[i] === '(') {
        calculationStrArr.splice(i, 0, '*');
        continue;
      }
    }
  }

  console.log('split calculationStr with uniary plus and minus', calculationStrArr);
  return calculationStrArr;
}
