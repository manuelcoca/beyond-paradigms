package application

import (
	"errors"
	"testing"
)

// =============================================================================
// MOCK SERVICES
// =============================================================================

type MockPaymentProcessor struct {
	shouldFail    bool
	expectedAmount float64
	result        string
}

func NewMockPaymentProcessor(shouldFail bool, result string) *MockPaymentProcessor {
	return &MockPaymentProcessor{
		shouldFail: shouldFail,
		result:     result,
	}
}

func (m *MockPaymentProcessor) ProcessPayment(amount float64) (string, error) {
	m.expectedAmount = amount
	if m.shouldFail {
		return "", errors.New("payment failed")
	}
	return m.result, nil
}

type MockDiscountService struct {
	shouldFail      bool
	expectedAmount  float64
	expectedType    string
	discountedAmount float64
}

func NewMockDiscountService(shouldFail bool, discountedAmount float64) *MockDiscountService {
	return &MockDiscountService{
		shouldFail:       shouldFail,
		discountedAmount: discountedAmount,
	}
}

func (m *MockDiscountService) CalculateDiscount(amount float64, customerType string) (float64, error) {
	m.expectedAmount = amount
	m.expectedType = customerType
	if m.shouldFail {
		return 0, errors.New("discount calculation failed")
	}
	return m.discountedAmount, nil
}

// =============================================================================
// ORDER SERVICE TESTS
// Testing: order_service.go
// Dependencies: PaymentProcessorInterface, DiscountServiceInterface (in separate files)
// =============================================================================

func TestOrderService_ProcessOrder_ValidOrder_ReturnsSuccess(t *testing.T) {
	// Arrange: Setup mock services (notice the complexity!)
	// Need to mock PaymentProcessorInterface (could be CreditCardProcessor or PayPalProcessor)
	mockProcessor := NewMockPaymentProcessor(false, "Payment successful")

	// Need to mock DiscountServiceInterface (implemented in discount_service.go)
	mockDiscount := NewMockDiscountService(false, 85.0) // 15% discount for premium

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       100.0,
		Customer:     "test@example.com",
		CustomerType: "premium",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Verify results
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
	if result == "" {
		t.Error("Expected non-empty result")
	}
	if mockProcessor.expectedAmount != 85.0 {
		t.Errorf("Expected ProcessPayment to be called with 85.0, got %v", mockProcessor.expectedAmount)
	}
	if mockDiscount.expectedAmount != 100.0 {
		t.Errorf("Expected CalculateDiscount to be called with 100.0, got %v", mockDiscount.expectedAmount)
	}
}

func TestOrderService_ProcessOrder_InvalidAmount_ReturnsError(t *testing.T) {
	// Arrange: Setup mock services (won't be called due to validation in order_service.go)
	mockProcessor := NewMockPaymentProcessor(false, "")
	mockDiscount := NewMockDiscountService(false, 0)

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       -10.0, // Invalid amount
		Customer:     "test@example.com",
		CustomerType: "regular",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Should fail validation
	if err == nil {
		t.Error("Expected error for invalid amount")
	}
	if err.Error() != "amount must be positive" {
		t.Errorf("Expected 'amount must be positive', got '%v'", err.Error())
	}
	if result != "" {
		t.Error("Expected empty result on error")
	}
}

func TestOrderService_ProcessOrder_EmptyCustomer_ReturnsError(t *testing.T) {
	// Arrange: Setup mock services
	mockProcessor := NewMockPaymentProcessor(false, "")
	mockDiscount := NewMockDiscountService(false, 0)

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       100.0,
		Customer:     "", // Empty customer
		CustomerType: "regular",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Should fail validation
	if err == nil {
		t.Error("Expected error for empty customer")
	}
	if err.Error() != "customer cannot be empty" {
		t.Errorf("Expected 'customer cannot be empty', got '%v'", err.Error())
	}
	if result != "" {
		t.Error("Expected empty result on error")
	}
}

func TestOrderService_ProcessOrder_PaymentProcessorFails_ReturnsError(t *testing.T) {
	// Arrange: Setup mock services - payment processor fails
	mockProcessor := NewMockPaymentProcessor(true, "")

	mockDiscount := NewMockDiscountService(false, 95.0)

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       100.0,
		Customer:     "test@example.com",
		CustomerType: "regular",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Should propagate payment error
	if err == nil {
		t.Error("Expected error from payment processor")
	}
	if result != "" {
		t.Error("Expected empty result on error")
	}
}

func TestOrderService_ProcessOrder_DiscountServiceFails_ReturnsError(t *testing.T) {
	// Arrange: Setup mock services - discount service fails
	mockProcessor := NewMockPaymentProcessor(false, "")
	mockDiscount := NewMockDiscountService(true, 0)

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       100.0,
		Customer:     "test@example.com",
		CustomerType: "regular",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Should propagate discount error
	if err == nil {
		t.Error("Expected error from discount service")
	}
	if result != "" {
		t.Error("Expected empty result on error")
	}
}

func TestOrderService_ProcessOrder_ZeroAmount_ReturnsError(t *testing.T) {
	// Arrange: Setup mock services
	mockProcessor := NewMockPaymentProcessor(false, "")
	mockDiscount := NewMockDiscountService(false, 0)

	orderService := NewOrderService(mockProcessor, mockDiscount)

	order := OrderData{
		Amount:       0.0, // Zero amount
		Customer:     "test@example.com",
		CustomerType: "regular",
	}

	// Act: Process the order
	result, err := orderService.ProcessOrder(order)

	// Assert: Should fail validation
	if err == nil {
		t.Error("Expected error for zero amount")
	}
	if err.Error() != "amount must be positive" {
		t.Errorf("Expected 'amount must be positive', got '%v'", err.Error())
	}
	if result != "" {
		t.Error("Expected empty result on error")
	}
}