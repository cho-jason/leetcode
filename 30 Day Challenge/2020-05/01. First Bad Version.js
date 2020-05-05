// You are a product manager and currently leading a team to develop a new
// product. Unfortunately, the latest version of your product fails the quality
// check. Since each version is developed based on the previous version, all
// the versions after a bad version are also bad.
//
// Suppose you have n versions [1, 2, ..., n] and you want to find out the first
// bad one, which causes all the following ones to be bad.
//
// You are given an API bool isBadVersion(version) which will return whether
// version is bad. Implement a function to find the first bad version. You
// should minimize the number of calls to the API.
//
// Example:
//  Given n = 5, and version = 4 is the first bad version.
//  call isBadVersion(3) -> false
//  call isBadVersion(5) -> true
//  call isBadVersion(4) -> true
//  -> Then 4 is the first bad version.

/**
 * Solution:
 * Time Complexity: O(log(n))
 * Space Complexity: O(1)
 *
 * Explanation:
 * We always return left pointer because
 * 1. Solution will always be between left pointer (L) and right pointer (R)
 * 2. Algorithm can be broken to 2 scenarios:
 *
 * Scenario 1:
 *   L
 *  [M][ ]
 *      R
 * In this scenario, if middle pointer (M) is a BadVersion, then R gets moved to
 * left of M and out of bounds, leaving L pointing to the correct version. On
 * the other hand, if M is not the bad version, L gets the right of M, which
 * leads to scenario 2.
 *
 * Scenario 2
 *   L
 *  [M]
 *   R
 * In this scenario, M points to the first BadVersion so R will moved to the
 * right of M and out of bounds, leaving L pointing to the correct version.
 */

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1
    let right = n
    let mid = Math.floor((right - left) / 2) + left

    while (left <= right) {
      if (isBadVersion(mid)) {
        right = mid - 1
      } else {
        left = mid + 1
      }

      mid = Math.floor((right - left) / 2) + left
    }

    return left
  }
}
