package main

import (
	"fmt"
	"time"
)

// =============================================================================
// PURE FUNCTIONAL APPROACH - NO SHARED STATE
// =============================================================================

type OrderState struct {
	ID          string
	Amount      float64
	Status      string
	ProcessedAt time.Time
}

type SystemState struct {
	Orders        []OrderState
	TotalOrders   int
	TotalPayments int
}

func createOrder(state SystemState, orderID string, amount float64) SystemState {
	newOrder := OrderState{
		ID:          orderID,
		Amount:      amount,
		Status:      "pending",
		ProcessedAt: time.Now(),
	}

	return SystemState{
		Orders:        append(state.Orders, newOrder),
		TotalOrders:   state.TotalOrders + 1,
		TotalPayments: state.TotalPayments,
	}
}

func processPayment(state SystemState, orderID string) SystemState {
	newOrders := make([]OrderState, len(state.Orders))
	
	for i, order := range state.Orders {
		if order.ID == orderID {
			newOrders[i] = OrderState{
				ID:          order.ID,
				Amount:      order.Amount,
				Status:      "paid",
				ProcessedAt: order.ProcessedAt,
			}
		} else {
			newOrders[i] = order
		}
	}

	return SystemState{
		Orders:        newOrders,
		TotalOrders:   state.TotalOrders,
		TotalPayments: state.TotalPayments + 1,
	}
}

func processOrder(initialState SystemState, orderID string, amount float64) SystemState {
	step1 := createOrder(initialState, orderID, amount)
	step2 := processPayment(step1, orderID)
	return step2
}

// =============================================================================
// DEMONSTRATION
// =============================================================================

func demonstratePureFunctions() {
	fmt.Println("=== PURE FUNCTION BENEFITS ===")
	
	initialState := SystemState{
		Orders:        []OrderState{},
		TotalOrders:   0,
		TotalPayments: 0,
	}

	result1 := createOrder(initialState, "TEST_ORDER", 100.0)
	result2 := createOrder(initialState, "TEST_ORDER", 100.0)
	
	fmt.Printf("Same input = same output: %t\n", 
		result1.TotalOrders == result2.TotalOrders)

	fmt.Printf("Original state unchanged: %t\n", initialState.TotalOrders == 0)
	
	finalState := processOrder(initialState, "COMPOSED", 50.0)
	fmt.Printf("Functions compose: %d total operations\n", finalState.TotalOrders + finalState.TotalPayments)
	fmt.Println()
}

func simulateOrders() {
	initialState := SystemState{
		Orders:        []OrderState{},
		TotalOrders:   0,
		TotalPayments: 0,
	}

	fmt.Println("=== PURE FUNCTIONAL APPROACH (Go) ===")
	fmt.Println("Processing multiple orders...")
	fmt.Println()

	orders := []struct {
		id     string
		amount float64
	}{
		{"ORDER_001", 99.99},
		{"ORDER_002", 149.99},
		{"ORDER_003", 79.99},
	}

	for _, order := range orders {
		finalState := processOrder(initialState, order.id, order.amount)

		fmt.Printf("Order %s processed:\n", order.id)
		fmt.Printf("  - Total orders: %d\n", finalState.TotalOrders)
		fmt.Printf("  - Total payments: %d\n", finalState.TotalPayments)
		
		for _, ord := range finalState.Orders {
			if ord.ID == order.id {
				fmt.Printf("  - Status: %s\n", ord.Status)
				break
			}
		}
		fmt.Println()
	}

	fmt.Println("Result: Consistent output every time")
}

func main() {
	demonstratePureFunctions()
	simulateOrders()
	
	fmt.Println("Pure functions + Immutable state = No shared state problems")
}