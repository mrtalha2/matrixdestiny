/**
 * Matrix of Destiny - Numerological Reduction Utilities
 * 
 * In the Destiny Matrix (based on Natalia Ladini's 22 Major Arcana method),
 * all numerical values reduce to integers in the range [1, 22].
 * 
 * THE RULE OF 22:
 * 1. If a number is between 1 and 22 (inclusive), it is kept as-is.
 *    (e.g., 7 -> 7, 12 -> 12, 22 -> 22). 22 is NOT reduced to 4.
 * 2. If a number is greater than 22, its individual digits are summed together.
 *    (e.g., 23 -> 2 + 3 = 5; 31 -> 3 + 1 = 4).
 * 3. If the resulting sum is still greater than 22, the process repeats
 *    until a value <= 22 is reached.
 *    (e.g., 99 -> 9 + 9 = 18 <= 22).
 */

/**
 * Calculates the sum of digits for any positive integer.
 * e.g. sumDigits(1995) = 1 + 9 + 9 + 5 = 24
 */
export function sumDigits(num: number): number {
  let n = Math.abs(Math.floor(num));
  let sum = 0;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}

/**
 * Reduces any positive integer into the range [1, 22].
 * 
 * Examples:
 *  - reduceTo22(22)  => 22  (Preserved: represents The Fool / Complete Cycle)
 *  - reduceTo22(23)  => 5   (2 + 3)
 *  - reduceTo22(31)  => 4   (3 + 1)
 *  - reduceTo22(1995)=> 6   (1+9+9+5 = 24 -> 2+4 = 6)
 *  - reduceTo22(1999)=> 10  (1+9+9+9 = 28 -> 2+8 = 10)
 *  - reduceTo22(2000)=> 2   (2+0+0+0 = 2)
 */
export function reduceTo22(num: number): number {
  let val = Math.abs(Math.floor(num));

  // If number is 0 or negative after Math.abs, return 22 as the neutral archetype
  if (val === 0) return 22;

  while (val > 22) {
    val = sumDigits(val);
  }

  return val;
}

/**
 * Helper to sum multiple numbers and reduce the result to [1, 22].
 * e.g. reduceSum(6, 8, 6) = reduceTo22(20) = 20
 */
export function reduceSum(...numbers: number[]): number {
  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  return reduceTo22(total);
}
