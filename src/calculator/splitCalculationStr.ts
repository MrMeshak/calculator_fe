export function splitCalculationStr(calculationStr: string) {
  const calculationStrClean = '(' + calculationStr.replace(/s/g, '') + ')';

  const calculationStrArr = calculationStrClean.split(/(?=[+\-\/\*\(\)])|(?<=[+\-\/\*\(\)])/g);

  console.log('split calcuation string', calculationStrArr);

  //Checking for unitary operators and implicit multiplication
  if (calculationStrArr.length > 2) {
    for (let i = 1; i < calculationStrArr.length - 1; i++) {
      //unitary operator with number eg -2.34
      if (/^[\+\-\/\*\(]{1}$/.test(calculationStrArr[i - 1]) && /[+\-]$/.test(calculationStrArr[i]) && /[\d]/.test(calculationStrArr[i + 1])) {
        const numberStr = calculationStrArr.splice(i + 1, 1)[0];
        calculationStrArr[i] = calculationStrArr[i].concat(numberStr);
        continue;
      }

      if (calculationStr[i - 1] === '-' && /[\d]/.test(calculationStrArr[i]) && /^[\*\/\()]$/.test(calculationStrArr[i + 1])) {
        const sign = calculationStrArr.splice(i - 1, 1, '+')[0];
        calculationStrArr[i] = sign + calculationStrArr[i];
        continue;
      }

      //unitary operator with brackent eg. +() or -()
      if (/^[+\-\/\*(]{1}$/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '-' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1, '-1', '*');
        continue;
      }
      if (/^[+\-\/\*(]{1}$/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '+' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1);
        continue;
      }

      //number infront of bracket eg. 5() 0r  )(
      if (/[\d\)]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '(') {
        calculationStrArr.splice(i, 0, '*');
        continue;
      }
    }
  }

  console.log('split calculationStr with uniary plus and minus', calculationStrArr);
  return calculationStrArr;
}
