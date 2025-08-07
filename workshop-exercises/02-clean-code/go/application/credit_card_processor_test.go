package application

import (
	"strings"
	"testing"
)

// =============================================================================
// CREDIT CARD PROCESSOR TESTS
// Testing: credit_card_processor.go
// =============================================================================

func TestCreditCardProcessor_ProcessPayment_ValidAmount_ReturnsSuccessMessage(t *testing.T) {
	// Arrange: Test the over-abstracted CreditCardProcessor
	processor := NewCreditCardProcessor()
	amount := 100.0

	// Act: Call the method that goes through multiple abstraction layers
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify payment processing
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if result == "" {
		t.Error("Expected non-empty result")
	}
	if !strings.Contains(result, "Credit Card") {
		t.Errorf("Expected result to contain 'Credit Card', got '%s'", result)
	}
	if !strings.Contains(result, "102.90") { // Amount + 2.9% fee
		t.Errorf("Expected result to contain '102.90', got '%s'", result)
	}
	if !strings.Contains(result, "fee:") {
		t.Errorf("Expected result to contain 'fee:', got '%s'", result)
	}
}

func TestCreditCardProcessor_ProcessPayment_SmallAmount_CalculatesCorrectFee(t *testing.T) {
	// Arrange: Test small amount processing
	processor := NewCreditCardProcessor()
	amount := 10.0

	// Act: Process through the abstraction layers
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify fee calculation (10 + 2.9% = 10.29)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if !strings.Contains(result, "10.29") {
		t.Errorf("Expected result to contain '10.29', got '%s'", result)
	}
}

func TestCreditCardProcessor_ProcessPayment_LargeAmount_CalculatesCorrectFee(t *testing.T) {
	// Arrange: Test large amount processing
	processor := NewCreditCardProcessor()
	amount := 1000.0

	// Act: Process payment
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify fee calculation (1000 + 2.9% = 1029.00)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if !strings.Contains(result, "1029.00") {
		t.Errorf("Expected result to contain '1029.00', got '%s'", result)
	}
}

func TestCreditCardProcessor_ProcessPayment_ZeroAmount_ProcessesWithoutFee(t *testing.T) {
	// Arrange: Test zero amount
	processor := NewCreditCardProcessor()
	amount := 0.0

	// Act: Process payment
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify zero amount processing
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if !strings.Contains(result, "0.00") {
		t.Errorf("Expected result to contain '0.00', got '%s'", result)
	}
}

func TestCreditCardProcessor_ProcessPayment_NegativeAmount_ProcessesNegativeFee(t *testing.T) {
	// Arrange: Test negative amount (edge case)
	processor := NewCreditCardProcessor()
	amount := -50.0

	// Act: Process payment
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify negative processing
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if result == "" {
		t.Error("Expected non-empty result")
	}
	if !strings.Contains(result, "Credit Card") {
		t.Errorf("Expected result to contain 'Credit Card', got '%s'", result)
	}
}

func TestCreditCardProcessor_ProcessPayment_VariousAmounts_CalculatesCorrectTotals(t *testing.T) {
	processor := NewCreditCardProcessor()

	testCases := []struct {
		amount        float64
		expectedTotal string
	}{
		{100.0, "102.90"},
		{50.0, "51.45"},
		{200.0, "205.80"},
		{1.0, "1.03"},
	}

	for _, tc := range testCases {
		t.Run("Amount_"+strings.ReplaceAll(tc.expectedTotal, ".", "_"), func(t *testing.T) {
			// Act: Process through all the abstraction layers
			result, err := processor.ProcessPayment(tc.amount)

			// Assert: Verify correct total calculation
			if err != nil {
				t.Errorf("Expected no error, got %v", err)
			}
			if !strings.Contains(result, tc.expectedTotal) {
				t.Errorf("Expected result to contain '%s', got '%s'", tc.expectedTotal, result)
			}
		})
	}
}

func TestCreditCardProcessor_ProcessPayment_MultipleCalls_AllSucceed(t *testing.T) {
	// Arrange: Test multiple calls to same processor
	processor := NewCreditCardProcessor()

	// Act: Process multiple payments
	result1, err1 := processor.ProcessPayment(10.0)
	result2, err2 := processor.ProcessPayment(20.0)
	result3, err3 := processor.ProcessPayment(30.0)

	// Assert: Verify all calls succeed
	if err1 != nil || err2 != nil || err3 != nil {
		t.Error("Expected no errors for multiple calls")
	}
	if !strings.Contains(result1, "10.29") {
		t.Errorf("Expected result1 to contain '10.29', got '%s'", result1)
	}
	if !strings.Contains(result2, "20.58") {
		t.Errorf("Expected result2 to contain '20.58', got '%s'", result2)
	}
	if !strings.Contains(result3, "30.87") {
		t.Errorf("Expected result3 to contain '30.87', got '%s'", result3)
	}
}

func TestCreditCardProcessor_ProcessPayment_ContainsExpectedElements(t *testing.T) {
	// Arrange: Test result format
	processor := NewCreditCardProcessor()
	amount := 75.0

	// Act: Process payment
	result, err := processor.ProcessPayment(amount)

	// Assert: Verify result contains all expected elements
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if !strings.Contains(result, "Credit Card") {
		t.Errorf("Expected result to contain 'Credit Card', got '%s'", result)
	}
	if !strings.Contains(result, "fee:") {
		t.Errorf("Expected result to contain 'fee:', got '%s'", result)
	}
	if !strings.Contains(result, "77.17") { // 75 + 2.9% = 77.175 ≈ 77.17
		t.Errorf("Expected result to contain '77.17', got '%s'", result)
	}
}