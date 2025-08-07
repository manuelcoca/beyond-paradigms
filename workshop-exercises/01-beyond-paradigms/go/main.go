package main

import "fmt"

// =============================================================================
// DEMONSTRATION: Four Pillars of OOP in Go (Procedural Paradigm)
// =============================================================================

// 1. ABSTRACTION - Hiding implementation details behind interfaces
type PaymentProcessor interface {
	ProcessPayment(amount float64) string
}

// 2. ENCAPSULATION - Bundling data with methods, controlling access
type CreditCardProcessor struct {
	apiKey string  // private field (lowercase)
	feePercent float64
}

type PayPalProcessor struct {
	clientID string  // private field (lowercase)
	feePercent float64
}

// 3. POLYMORPHISM - Different types implementing same interface
func (c CreditCardProcessor) ProcessPayment(amount float64) string {
	fee := amount * c.feePercent
	return fmt.Sprintf("CreditCard: Processed $%.2f, Fee: $%.2f", amount, fee)
}

func (p PayPalProcessor) ProcessPayment(amount float64) string {
	fee := amount * p.feePercent
	return fmt.Sprintf("PayPal: Processed $%.2f, Fee: $%.2f", amount, fee)
}

// 4. COMPOSITION - Building complex objects from simpler ones
type OrderService struct {
	processor PaymentProcessor  // composition through interface
	orderCount int             // private state
}

// Factory functions (encapsulation)
func NewCreditCardProcessor() PaymentProcessor {
	return CreditCardProcessor{
		apiKey: "sk_secret_123",
		feePercent: 0.029, // 2.9%
	}
}

func NewPayPalProcessor() PaymentProcessor {
	return PayPalProcessor{
		clientID: "paypal_client_456", 
		feePercent: 0.034, // 3.4%
	}
}

func NewOrderService(processor PaymentProcessor) *OrderService {
	return &OrderService{
		processor: processor,
		orderCount: 0,
	}
}

// Business logic using composition
func (os *OrderService) ProcessOrder(amount float64) string {
	os.orderCount++ // modify private state
	result := os.processor.ProcessPayment(amount) // polymorphism in action
	return fmt.Sprintf("Order #%d: %s", os.orderCount, result)
}

func (os *OrderService) GetOrderCount() int {
	return os.orderCount // controlled access to private state
}

func main() {
	fmt.Println("=== Go: OOP Principles in Procedural Paradigm ===")
	fmt.Println()
	
	// Demonstration of all four pillars working together
	
	// Create different processors (polymorphism)
	creditCard := NewCreditCardProcessor()
	paypal := NewPayPalProcessor()
	
	// Create services with different processors (composition)
	service1 := NewOrderService(creditCard)
	service2 := NewOrderService(paypal)
	
	// Same interface, different behavior (polymorphism)
	fmt.Println(service1.ProcessOrder(100.0))
	fmt.Println(service2.ProcessOrder(100.0))
	
	// Access controlled state (encapsulation)
	fmt.Printf("Service1 processed %d orders\n", service1.GetOrderCount())
	fmt.Printf("Service2 processed %d orders\n", service2.GetOrderCount())
	
	fmt.Println()
	fmt.Println("Key Insight: Go achieves OOP principles without classes!")
	fmt.Println("- Abstraction: interfaces")
	fmt.Println("- Encapsulation: private fields + methods")  
	fmt.Println("- Polymorphism: interface implementation")
	fmt.Println("- Composition: struct fields")
}