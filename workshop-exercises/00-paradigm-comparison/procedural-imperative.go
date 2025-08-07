package main

import "fmt"

// =============================================================================
// PROCEDURAL & IMPERATIVE
// PROCEDURAL: No relationship between state and functions/behaviour & modify state
// IMPERATIVE: Mutate state
// =============================================================================

func main() {
	numbers := []int{1, 2, 3, 4, 5}
	
	// Mutable variables that change over time
	sum := 0
	evenCount := 0
	
	// Step-by-step instructions with mutations
	for i := 0; i < len(numbers); i++ {
		sum = sum + numbers[i]           // Mutate sum
		if numbers[i]%2 == 0 {
			evenCount = evenCount + 1    // Mutate count
		}
	}
	
	fmt.Printf("Sum: %d, Even count: %d\n", sum, evenCount)
}
