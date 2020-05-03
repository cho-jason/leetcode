// Given an arbitrary ransom note string and another string containing letters
// from all the magazines, write a function that will return true if the ransom
// note can be constructed from the magazines ; otherwise, it will return false.
//
// Each letter in the magazine string can only be used once in your ransom note.
//
// Note:
//  You may assume that both strings contain only lowercase letters.
//
// Example:
//  canConstruct("a", "b") -> false
//  canConstruct("aa", "ab") -> false
//  canConstruct("aa", "aab") -> true

/**
 * Solution:
 * Time Complexity: O(R + M)
 * Space Complexity: O(1)
 */

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  // If the ransomNote has no characters, immediately return true
  if (!ransomNote.length) return true

  const ransomChar = {}
  for (let char of ransomNote) {
    if (ransomChar[char]) {
      ransomChar[char]++
    } else {
      ransomChar[char] = 1
    }
  }

  for (let char of magazine) {
    if (ransomChar[char]) {
      ransomChar[char]--
      // Delete char key from ransom note if there are no char left
      if (!ransomChar[char]) {
        delete ransomChar[char]
      }
      // Immediately return true if there are char left in ransom Note
      if (!Object.keys(ransomChar).length) {
        return true
      }
    }
  }

  return false
}
