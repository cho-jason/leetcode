// Given a string, find the first non-repeating character in it and return it's
// index. If it doesn't exist, return -1.
//
// Example 1:
//  s = "leetcode"
//  return 0.
//
// Example 2:
//  s = "loveleetcode",
//  return 2.
//
// Note: You may assume the string contain only lowercase letters.

/**
 * Solution:
 * Time Complexity: O(N) where N is the number of characters in the string
 * Space Complexity: O(N + M) where M is the number of unique characters
 */

/**
 * @param {string} s
 * @return {number}
 */
// Using Map and Set
var firstUniqChar = function (string) {
  const seenChar = new Set()
  const uniqChar = new Map()

  for (let i = 0; i < string.length; i++) {
    const char = string[i]
    if (!seenChar.has(char)) {
      uniqChar.set(char, i)
    } else if (uniqChar.has(char)) {
      uniqChar.delete(char)
    }

    seenChar.add(char)
  }

  return uniqChar.size ? uniqChar.values().next().value : -1
}
