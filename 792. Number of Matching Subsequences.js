// Given string S and a dictionary of words words, find the number of words[i]
// that is a subsequence of S.
//
// EXAMPLE :
//  Input:
//    S = "abcde"
//    words = ["a", "bb", "acd", "ace"]
//  Output: 3
//  Explanation: There are three words in words that are a subsequence of S: "a", "acd", "ace".
//
// NOTE:
// - All words in words and S will only consists of lowercase letters.
// - The length of S will be in the range of [1, 50000].
// - The length of words will be in the range of [1, 5000].
// - The length of words[i] will be in the range of [1, 50].

var numMatchingSubseq = function (S, words) {
  let count = 0
  const heads = {}

  // Store alphabet characters as key values in heads
  for (const char of 'abcdefghijklmnopqrstuvwxyz') {
    heads[char] = []
  }

  // Store words as values within heads array
  for (const word of words) {
    const char = word[0]
    heads[char].push(word)
  }

  // Iterate through S
  for (const char of S) {
    // Find collection of words whose first char correspond with S char
    const wordCollection = heads[char]
    const newWordCollection = []

    // Update the word to remaining char in word to go through
    while (wordCollection.length) {
      word = wordCollection.shift()
      const tempWord = word.slice(1)

      // If there are no remaining char, update count
      if (!tempWord) {
        count++
        // Otherwise if the first char in new word is char in S, add to newWordCollection
      } else if (tempWord[0] === char) {
        newWordCollection.push(tempWord)
        // Otherwise add to other other word collections in heads
      } else {
        heads[tempWord[0]].push(tempWord)
      }
    }

    if (newWordCollection.length) {
      heads[char] = newWordCollection
    }
  }

  return count
}

// Brute Force Solution
var numMatchingSubseqBruteForce = function (S, words) {
  let count = 0

  for (const word of words) {
    let SIdx = 0
    let match = true

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      // Iterate through each character in S to see if it matches with char in word
      while (SIdx < S.length) {
        // This conditional will increment SIdx after evaluating the conditional
        if (char === S[SIdx++]) {
          break
        }
      }

      // If there are remaining char in word but reached end of S
      if (i < word.length - 1 && SIdx === S.length) {
        match = false
        break
        // If there are no remaining char in word...
      } else if (i === word.length - 1) {
        // ...and reached the end of S, check if last char in S and word matches
        if (SIdx === S.length && S[SIdx - 1] !== char) {
          match = false
        }
      }
    }

    if (match) {
      count++
    }
  }

  return count
}
