package application

import (
	"testing"
)

// =============================================================================
// DISCOUNT SERVICE TESTS
// Testing: discount_service.go
// =============================================================================

func TestDiscountService_CalculateDiscount_PremiumCustomer_Returns15PercentDiscount(t *testing.T) {
	// Arrange
	discountService := NewDiscountService()
	amount := 100.0
	customerType := "premium"

	// Act: Call the method that goes through multiple abstraction layers
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify the discount calculation
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	// Expected: 100 * (1 - 0.15) = 85.0
	expected := 85.0
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

func TestDiscountService_CalculateDiscount_RegularCustomer_Returns5PercentDiscount(t *testing.T) {
	// Arrange: Test regular customer discount
	discountService := NewDiscountService()
	amount := 200.0
	customerType := "regular"

	// Act
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify the discount calculation
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	// Expected: 200 * (1 - 0.05) = 190.0
	expected := 190.0
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

func TestDiscountService_CalculateDiscount_UnknownCustomer_ReturnsNoDiscount(t *testing.T) {
	// Arrange: Test unknown customer type
	discountService := NewDiscountService()
	amount := 150.0
	customerType := "unknown"

	// Act: Call the method
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify no discount applied
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	// Expected: 150 * (1 - 0.0) = 150.0
	expected := 150.0
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

func TestDiscountService_CalculateDiscount_EmptyCustomerType_ReturnsNoDiscount(t *testing.T) {
	// Arrange: Test empty customer type
	discountService := NewDiscountService()
	amount := 75.0
	customerType := ""

	// Act: Call the method
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify no discount applied
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	expected := 75.0
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

func TestDiscountService_CalculateDiscount_ZeroAmount_ReturnsZero(t *testing.T) {
	// Arrange: Test zero amount
	discountService := NewDiscountService()
	amount := 0.0
	customerType := "premium"

	// Act: Call the method
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify zero result
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	expected := 0.0
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

func TestDiscountService_CalculateDiscount_NegativeAmount_ReturnsNegativeResult(t *testing.T) {
	// Arrange: Test negative amount (edge case)
	discountService := NewDiscountService()
	amount := -50.0
	customerType := "premium"

	// Act: Call the method
	result, err := discountService.CalculateDiscount(amount, customerType)

	// Assert: Verify calculation still works
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	// Expected: -50 * (1 - 0.15) = -42.5
	expected := -42.5
	if result != expected {
		t.Errorf("Expected %.2f, got %.2f", expected, result)
	}
}

// TestDiscountService_VariousInputs tests multiple scenarios with table-driven tests
func TestDiscountService_VariousInputs(t *testing.T) {
	discountService := NewDiscountService()

	testCases := []struct {
		name         string
		amount       float64
		customerType string
		expected     float64
	}{
		{"Premium 100", 100.0, "premium", 85.0},
		{"Regular 100", 100.0, "regular", 95.0},
		{"Unknown 100", 100.0, "unknown", 100.0},
		{"Premium 50", 50.0, "premium", 42.5},
		{"Regular 200", 200.0, "regular", 190.0},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Act
			result, err := discountService.CalculateDiscount(tc.amount, tc.customerType)

			// Assert: Verify all scenarios work correctly
			if err != nil {
				t.Errorf("Expected no error, got %v", err)
			}
			if result != tc.expected {
				t.Errorf("Expected %.2f, got %.2f", tc.expected, result)
			}
		})
	}
}