package main

import (
	"fmt"
	"log"

	"github.com/workshop/application"
)

func main() {
	startApplication()
}

func startApplication() {
	orderService := buildOrderService()
	runDemo(orderService)
}

func buildOrderService() application.OrderServiceInterface {
	paymentProcessor := buildPaymentProcessor()
	discountService := buildDiscountService()
	
	return application.NewOrderService(paymentProcessor, discountService)
}

func buildPaymentProcessor() application.PaymentProcessorInterface {
	return createPaymentProcessor()
}

func createPaymentProcessor() application.PaymentProcessorInterface {
	return application.NewCreditCardProcessor()
	// Alternative: return application.NewPayPalProcessor()
}

func buildDiscountService() application.DiscountServiceInterface {
	return createDiscountService()
}

func createDiscountService() application.DiscountServiceInterface {
	return application.NewDiscountService()
}

func runDemo(orderService application.OrderServiceInterface) {
	fmt.Println("=== Clean Code Demo ===")
	
	// Demo order
	order := application.OrderData{
		Amount:       100.50,
		Customer:     "john.doe@example.com",
		CustomerType: "premium",
	}
	
	fmt.Printf("Processing order for %s (%s): $%.2f\n", 
		order.Customer, order.CustomerType, order.Amount)
	
	result, err := orderService.ProcessOrder(order)
	if err != nil {
		log.Printf("Order failed: %v", err)
		return
	}
	
	fmt.Printf("Success: %s\n", result)
}