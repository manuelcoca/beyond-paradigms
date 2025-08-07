package application

import (
	"fmt"
	"time"
)

// =============================================================================
// CREDIT CARD PROCESSOR
// =============================================================================

type CreditCardProcessor struct {
	feePercent float64
}

func NewCreditCardProcessor() PaymentProcessorInterface {
	return &CreditCardProcessor{
		feePercent: 2.9,
	}
}

func (c *CreditCardProcessor) ProcessPayment(amount float64) (string, error) {
	return c.executePaymentProcessing(amount)
}

func (c *CreditCardProcessor) executePaymentProcessing(amount float64) (string, error) {
	fee := c.calculateProcessingFee(amount)
	total := c.calculateTotalAmount(amount, fee)
	c.simulateProcessingDelay()
	return c.formatPaymentResult(total, fee), nil
}

func (c *CreditCardProcessor) calculateProcessingFee(amount float64) float64 {
	return c.computeFeeFromAmount(amount)
}

func (c *CreditCardProcessor) computeFeeFromAmount(amount float64) float64 {
	return amount * c.feePercent / 100
}

func (c *CreditCardProcessor) calculateTotalAmount(amount float64, fee float64) float64 {
	return c.addFeeToAmount(amount, fee)
}

func (c *CreditCardProcessor) addFeeToAmount(amount float64, fee float64) float64 {
	return amount + fee
}

func (c *CreditCardProcessor) simulateProcessingDelay() {
	c.waitForProcessing(100 * time.Millisecond)
}

func (c *CreditCardProcessor) waitForProcessing(duration time.Duration) {
	time.Sleep(duration)
}

func (c *CreditCardProcessor) formatPaymentResult(total float64, fee float64) string {
	return fmt.Sprintf("Credit Card: $%.2f (fee: $%.2f)", total, fee)
}