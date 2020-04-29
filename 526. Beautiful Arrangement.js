// Suppose you have N integers from 1 to N. We define a beautiful arrangement as an array that is constructed by these N numbers successfully if one of the following is true for the ith position (1 <= i <= N) in this array:

// The number at the ith position is divisible by i.
// i is divisible by the number at the ith position.
//
// Now given N, how many beautiful arrangements can you construct?
//
// EXAMPLE:
//  Input: 2
//  Output: 2
//  Explanation:
//    The first beautiful arrangement is [1, 2]:
//    Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).
//    Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).
//    The second beautiful arrangement is [2, 1]:
//    Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).
//    Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.
//
// Note:
//  N is a positive integer and will not exceed 15.

/**
 * @param {number} N
 * @return {number}
 */
var countArrangement = function (N) {
  let count = 0

  // Helper Function
  const isBeaut = (num, pos) => num % pos === 0 || pos % num === 0

  // Recursive Function
  const fill = (num, arrangement, visited) => {
    // Make sure num was not visited and arrangement is valid
    if (!visited[num - 1] && isBeaut(num, arrangement.length + 1)) {
      arrangement.push(num)
      visited[num - 1] = 1
      // BASE CASE 1
      // If we visited num or arrangement is invalid, move to next num
    } else {
      return
    }

    // BASE CASE 2
    // If arrangement is complete, upddate count
    if (arrangement.length === N) {
      count++
      return
      // RECURSIVE CASE
      // Iterate through rest of num and make sure to make copies of visited
      // and arrangements so they aren't mutated when we back track (return in
      // base cases)
    } else {
      for (let i = 1; i <= N; i++) {
        fill(i, arrangement.slice(), visited.slice())
      }
    }
  }

  for (let i = 1; i <= N; i++) {
    fill(i, [], new Array(N).fill(0))
  }

  return count
}
