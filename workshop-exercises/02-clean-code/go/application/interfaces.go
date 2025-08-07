package application

type OrderServiceInterface interface {
	ProcessOrder(order OrderData) (string, error)
}

type PaymentProcessorInterface interface {
	ProcessPayment(amount float64) (string, error)
}

type DiscountServiceInterface interface {
	CalculateDiscount(amount float64, customerType string) (float64, error)
}

type OrderData struct {
	Amount       float64
	Customer     string
	CustomerType string
}