package application

// =============================================================================
// DISCOUNT SERVICE
// =============================================================================

type DiscountService struct{}

func NewDiscountService() DiscountServiceInterface {
	return &DiscountService{}
}

func (d *DiscountService) CalculateDiscount(amount float64, customerType string) (float64, error) {
	return d.performDiscountCalculation(amount, customerType)
}

func (d *DiscountService) performDiscountCalculation(amount float64, customerType string) (float64, error) {
	discountPercent := d.getDiscountPercentage(customerType)
	return d.applyDiscountPercentage(amount, discountPercent), nil
}

func (d *DiscountService) getDiscountPercentage(customerType string) float64 {
	return d.determineDiscountRate(customerType)
}

func (d *DiscountService) determineDiscountRate(customerType string) float64 {
	switch customerType {
	case "premium":
		return d.getPremiumDiscount()
	case "regular":
		return d.getRegularDiscount()
	default:
		return d.getDefaultDiscount()
	}
}

func (d *DiscountService) getPremiumDiscount() float64 {
	return 0.15 // 15%
}

func (d *DiscountService) getRegularDiscount() float64 {
	return 0.05 // 5%
}

func (d *DiscountService) getDefaultDiscount() float64 {
	return 0.0 // 0%
}

func (d *DiscountService) applyDiscountPercentage(amount float64, percentage float64) float64 {
	return d.calculateDiscountedAmount(amount, percentage)
}

func (d *DiscountService) calculateDiscountedAmount(amount float64, percentage float64) float64 {
	discount := d.computeDiscountValue(amount, percentage)
	return d.subtractDiscount(amount, discount)
}

func (d *DiscountService) computeDiscountValue(amount float64, percentage float64) float64 {
	return amount * percentage
}

func (d *DiscountService) subtractDiscount(amount float64, discount float64) float64 {
	return amount - discount
}