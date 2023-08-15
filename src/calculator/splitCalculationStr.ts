export function splitCalculationStr(calculationStr: string) {
  const calculationStrArr = calculationStr.split(/(?=[+\-\/\*()])|(?<=[+\-\/\*\(\)])/g);

  console.log('split calcuation string', calculationStrArr);

  //Check for starting uniary operator
  if (/[+-]/.test(calculationStrArr[0]) && /[\d]/.test(calculationStrArr[1])) {
    const numberstr = calculationStrArr.splice(1, 1)[0];
    calculationStrArr[0] = calculationStrArr[0].concat(numberstr);
  }
  if (calculationStrArr[0] === '-' && calculationStrArr[1] === '(') {
    calculationStrArr.shift();
    calculationStrArr.unshift('-1', '*');
  }
  if (calculationStrArr[0] === '+' && calculationStrArr[1] === '(') {
    calculationStrArr.shift();
  }

  //Check for uniary operator
  if (calculationStrArr.length > 2) {
    for (let i = 1; i < calculationStrArr.length - 1; i++) {
      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && /[+\-]/.test(calculationStrArr[i]) && /[\d]/.test(calculationStrArr[i + 1])) {
        const numberStr = calculationStrArr.splice(i + 1, 1)[0];
        calculationStrArr[i] = calculationStrArr[i].concat(numberStr);
        continue;
      }

      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '-' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1, '-1', '*');
        continue;
      }

      if (/[+\-\/\*(]/.test(calculationStrArr[i - 1]) && calculationStrArr[i] === '+' && calculationStrArr[i + 1] === '(') {
        calculationStrArr.splice(i, 1);
        continue;
      }
    }
  }

  console.log('split calculationStr with uniary plus and minus', calculationStrArr);
  return calculationStrArr;
}
