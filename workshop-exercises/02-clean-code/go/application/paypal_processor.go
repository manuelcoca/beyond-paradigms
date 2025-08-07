package application

import (
	"fmt"
	"time"
)

// =============================================================================
// PAYPAL PROCESSOR
// =============================================================================

type PayPalProcessor struct {
	feePercent float64
}

func NewPayPalProcessor() PaymentProcessorInterface {
	return &PayPalProcessor{
		feePercent: 3.49,
	}
}

func (p *PayPalProcessor) ProcessPayment(amount float64) (string, error) {
	return p.executePaymentProcessing(amount)
}

func (p *PayPalProcessor) executePaymentProcessing(amount float64) (string, error) {
	fee := p.calculateProcessingFee(amount)
	total := p.calculateTotalAmount(amount, fee)
	p.simulateProcessingDelay()
	return p.formatPaymentResult(total, fee), nil
}

func (p *PayPalProcessor) calculateProcessingFee(amount float64) float64 {
	return p.computeFeeFromAmount(amount)
}

func (p *PayPalProcessor) computeFeeFromAmount(amount float64) float64 {
	return amount * p.feePercent / 100
}

func (p *PayPalProcessor) calculateTotalAmount(amount float64, fee float64) float64 {
	return p.addFeeToAmount(amount, fee)
}

func (p *PayPalProcessor) addFeeToAmount(amount float64, fee float64) float64 {
	return amount + fee
}

func (p *PayPalProcessor) simulateProcessingDelay() {
	p.waitForProcessing(150 * time.Millisecond)
}

func (p *PayPalProcessor) waitForProcessing(duration time.Duration) {
	time.Sleep(duration)
}

func (p *PayPalProcessor) formatPaymentResult(total float64, fee float64) string {
	return fmt.Sprintf("PayPal: $%.2f (fee: $%.2f)", total, fee)
}