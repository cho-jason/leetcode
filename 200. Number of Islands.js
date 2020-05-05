// Given a 2d grid map of '1's (land) and '0's (water), count the number of
// islands. An island is surrounded by water and is formed by connecting
// adjacent lands horizontally or vertically. You may assume all four edges of
// the grid are all surrounded by water.
//
// Example 1:
//  Input:
//    11110
//    11010
//    11000
//   00000
//  Output: 1
//
// Example 2:
//  Input:
//    11000
//    11000
//    00100
//    00011
//  Output: 3

/**
 * Solution 1:
 * BFS
 * Time complexity: O(N * M)
 * Space complexity: O(N * M)
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0

  const bfs = (pos) => {
    const queue = [pos]
    const searchSeq = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]

    while (queue.length) {
      const [n, m] = queue.shift()
      searchSeq.forEach(([N, M]) => {
        if (grid[n + N] && grid[n + N][m + M] === '1') {
          grid[n + N][m + M] = '0'
          queue.push([n + N, m + M])
        }
      })
    }
  }

  for (let n = 0; n < grid.length; n++) {
    for (let m = 0; m < grid[0].length; m++) {
      if (grid[n][m] === '1') {
        grid[n][m] = '0'
        bfs([n, m])
        count++
      }
    }
  }

  return count
}

/**
 * Solution 2:
 * DFS
 * Time complexity: O(N * M)
 * Space complexity: O(min(N, M))
 */
var numIslandsDFS = function (grid) {
  let count = 0

  const dfs = ([n, m]) => {
    grid[n][m] = '0'
    const searchSeq = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]
    searchSeq.forEach(([N, M]) => {
      if (grid[n + N] && grid[n + N][m + M] === '1') {
        dfs([n + N, m + M])
      } else {
      }
    })
  }

  for (let n = 0; n < grid.length; n++) {
    for (let m = 0; m < grid[0].length; m++) {
      if (grid[n][m] === '1') {
        dfs([n, m])
        count++
      }
    }
  }
  return count
}

/**
 * Solution 3:
 * Original solution
 * Time Complexity: O(N * M)?
 * Space Complexity: O(N * M)?
 */

var numIslandsOG = function (grid) {
  let count = 0

  // 1. If current element is an island, set out explorer
  // 2. Will refer to a grid map of places explored
  // 3. Keep track of elements below above and below, behind and in front that did not visit
  //      and is an island

  const visited = new Array(grid.length)
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(grid[0].length).fill(false)
  }
  const explore = (pos) => {
    const queue = [pos]
    visited[pos[0]][pos[1]] = true

    while (queue.length) {
      console.log(queue)
      const [n, m] = queue.shift()
      const nmDiff = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]

      // Check neigbors and add to queue if neighbor is an island
      while (nmDiff.length) {
        const [nDiff, mDiff] = nmDiff.pop()
        if (!grid[n - nDiff]) {
          continue
        } else if (
          +grid[n - nDiff][m - mDiff] &&
          !visited[n - nDiff][m - mDiff]
        ) {
          queue.push([n - nDiff, m - mDiff])
        }
        visited[n - nDiff][m - mDiff] = true
      }
    }

    count++
  }

  for (let n = 0; n < grid.length; n++) {
    for (let m = 0; m < grid[0].length; m++) {
      if (+grid[n][m] && !visited[n][m]) {
        explore([n, m])
      }
    }
  }

  return count
}
