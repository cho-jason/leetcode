// Find the kth largest element in an unsorted array. Note that it is the kth
// largest element in the sorted order, not the kth distinct element.
//
// Example 1:
//  Input: [3,2,1,5,6,4] and k = 2
//  Output: 5
//
// Example 2:
//  Input: [3,2,3,1,2,4,5,5,6] and k = 4
//  Output: 4
//
// Note:
//  You may assume k is always valid, 1 ≤ k ≤ array's length.

/**
 * Solution 1:
 * This solution uses Min Heap where the heap has k nodes. As the heap grows to
 * more than k nodes, you delete the min (root) node and re-validate heap. This
 * way, the heap will always contain the k largest elements in an array.
 *
 * Time Complexity: O(N * log(k))
 * Space Complexity: O(k)
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // MIN HEAP
  const heap = []

  const insert = (num) => {
    heap.push(num)
    let childIdx = heap.length - 1
    let parentIdx = Math.floor((childIdx - 1) / 2)
    // Check validity for min heap
    while (heap[childIdx] < heap[parentIdx]) {
      // Swap values
      const temp = heap[childIdx]
      heap[childIdx] = heap[parentIdx]
      heap[parentIdx] = temp

      // Update childIdx & parentIdx
      childIdx = parentIdx
      parentIdx = Math.floor((childIdx - 1) / 2)
    }
  }

  const deleteMin = () => {
    heap[0] = heap.pop()
    let parentIdx = 0
    let childIdx = 2 * parentIdx + 1

    while (
      heap[parentIdx] > heap[childIdx] ||
      heap[parentIdx] > heap[childIdx + 1]
    ) {
      // Ternary must default to childIdx if invalid index is compared
      const minChildIdx =
        heap[childIdx + 1] < heap[childIdx] ? childIdx + 1 : childIdx
      // Swap values
      const temp = heap[minChildIdx]
      heap[minChildIdx] = heap[parentIdx]
      heap[parentIdx] = temp

      // Update childIdx & parentIdx
      parentIdx = minChildIdx
      childIdx = 2 * parentIdx + 1
    }
  }

  for (let num of nums) {
    insert(num)
    if (heap.length > k) {
      deleteMin()
    }
  }
  return heap[0]
}

/**
 * Solution 2:
 * This solution uses sort and then finding the Kth largest element.
 *
 * Time Complexity: O(N * log(N)) (depending or sorting algorithm)
 * Space Complexity: 1
 */
var findKthLargestSortSolution = function (nums, k) {
  nums.sort((a, b) => a - b)
  return nums[nums.length - k]
}
