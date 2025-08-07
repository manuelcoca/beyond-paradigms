package application

import (
	"fmt"
	"time"
)

// =============================================================================
// ORDER SERVICE
// Main orchestrator
// =============================================================================

type OrderService struct {
	paymentProcessor PaymentProcessorInterface
	discountService  DiscountServiceInterface
}

func NewOrderService(paymentProcessor PaymentProcessorInterface, discountService DiscountServiceInterface) OrderServiceInterface {
	return &OrderService{
		paymentProcessor: paymentProcessor,
		discountService:  discountService,
	}
}

func (s *OrderService) ProcessOrder(order OrderData) (string, error) {
	return s.executeOrderProcessing(order)
}

func (s *OrderService) executeOrderProcessing(order OrderData) (string, error) {
	if err := s.validateOrder(order); err != nil {
		return "", s.handleValidationError(err)
	}

	discountedAmount, err := s.calculateDiscountedAmount(order)
	if err != nil {
		return "", s.handleDiscountError(err)
	}

	paymentResult, err := s.processPayment(discountedAmount)
	if err != nil {
		return "", s.handlePaymentError(err)
	}

	orderID := s.generateOrderId()
	return s.formatSuccessResult(orderID, paymentResult, discountedAmount), nil
}

func (s *OrderService) validateOrder(order OrderData) error {
	return s.performOrderValidation(order)
}

func (s *OrderService) performOrderValidation(order OrderData) error {
	if err := s.validateAmount(order.Amount); err != nil {
		return err
	}
	return s.validateCustomer(order.Customer)
}

func (s *OrderService) validateAmount(amount float64) error {
	return s.checkAmountIsPositive(amount)
}

func (s *OrderService) checkAmountIsPositive(amount float64) error {
	if amount <= 0 {
		return s.createAmountError()
	}
	return nil
}

func (s *OrderService) createAmountError() error {
	return fmt.Errorf("amount must be positive")
}

func (s *OrderService) validateCustomer(customer string) error {
	return s.checkCustomerIsNotEmpty(customer)
}

func (s *OrderService) checkCustomerIsNotEmpty(customer string) error {
	if customer == "" {
		return s.createCustomerError()
	}
	return nil
}

func (s *OrderService) createCustomerError() error {
	return fmt.Errorf("customer cannot be empty")
}

func (s *OrderService) calculateDiscountedAmount(order OrderData) (float64, error) {
	return s.executeDiscountCalculation(order.Amount, order.CustomerType)
}

func (s *OrderService) executeDiscountCalculation(amount float64, customerType string) (float64, error) {
	discountedAmount, err := s.discountService.CalculateDiscount(amount, customerType)
	if err != nil {
		return 0, s.wrapDiscountError(err)
	}
	return discountedAmount, nil
}

func (s *OrderService) wrapDiscountError(err error) error {
	return fmt.Errorf("discount calculation failed: %w", err)
}

func (s *OrderService) processPayment(amount float64) (string, error) {
	return s.executePaymentProcessing(amount)
}

func (s *OrderService) executePaymentProcessing(amount float64) (string, error) {
	result, err := s.paymentProcessor.ProcessPayment(amount)
	if err != nil {
		return "", s.wrapPaymentError(err)
	}
	return result, nil
}

func (s *OrderService) wrapPaymentError(err error) error {
	return fmt.Errorf("payment processing failed: %w", err)
}

func (s *OrderService) generateOrderId() string {
	return s.createOrderIdentifier()
}

func (s *OrderService) createOrderIdentifier() string {
	return s.formatOrderId(s.getCurrentTimestamp())
}

func (s *OrderService) getCurrentTimestamp() int64 {
	return time.Now().Unix()
}

func (s *OrderService) formatOrderId(timestamp int64) string {
	return fmt.Sprintf("order_%d", timestamp)
}

func (s *OrderService) handleValidationError(err error) error {
	return s.wrapValidationError(err)
}

func (s *OrderService) wrapValidationError(err error) error {
	return err
}

func (s *OrderService) handleDiscountError(err error) error {
	return s.wrapDiscountCalculationError(err)
}

func (s *OrderService) wrapDiscountCalculationError(err error) error {
	return err
}

func (s *OrderService) handlePaymentError(err error) error {
	return s.wrapPaymentFailureError(err)
}

func (s *OrderService) wrapPaymentFailureError(err error) error {
	return err
}

func (s *OrderService) formatSuccessResult(orderID string, paymentResult string, amount float64) string {
	return s.createSuccessMessage(orderID, paymentResult, amount)
}

func (s *OrderService) createSuccessMessage(orderID string, paymentResult string, amount float64) string {
	return fmt.Sprintf("Order %s completed: %s (Final: $%.2f)", orderID, paymentResult, amount)
}