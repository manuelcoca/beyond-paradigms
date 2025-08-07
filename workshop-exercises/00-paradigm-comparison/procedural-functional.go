package main

import "fmt"

// =============================================================================
// PROCEDURAL & FUNCTIONAL
// Pure functions, immutable data, no side effects
// PROCEDURAL: No relationship between state and functions/behaviour
// FUNCTIONAL: No state mutations
// =============================================================================

func main() {
	numbers := []int{1, 2, 3, 4, 5}
	
	// Pure functions that don't modify input
	sum := calculateSum(numbers)
	evenCount := countEvens(numbers)
	
	fmt.Printf("Sum: %d, Even count: %d\n", sum, evenCount)
}

// Pure function: same input always gives same output
func calculateSum(nums []int) int {
	if len(nums) == 0 {
		return 0
	}
	return nums[0] + calculateSum(nums[1:]) // Recursive, no mutation
}

// Pure function: no side effects
func countEvens(nums []int) int {
	count := 0
	for _, num := range nums {
		if num%2 == 0 {
			count++ // Only local mutation, no external state changed
		}
	}
	return count
}
