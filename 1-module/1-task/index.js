/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let a = 1;
  for(let i; i = n;) {
  	a = a * n;
  	n = n - 1;// ваш код...
  }
  return a;
}
