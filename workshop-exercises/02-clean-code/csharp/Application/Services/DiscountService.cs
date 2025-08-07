using Workshop.Application.Interfaces;

namespace Workshop.Application.Services
{
    public class DiscountService : IDiscountService
    {
        public double CalculateDiscount(double amount, string customerType)
        {
            return PerformDiscountCalculation(amount, customerType);
        }

        private double PerformDiscountCalculation(double amount, string customerType)
        {
            var discountPercent = GetDiscountPercentage(customerType);
            return ApplyDiscountPercentage(amount, discountPercent);
        }

        private double GetDiscountPercentage(string customerType)
        {
            return DetermineDiscountRate(customerType);
        }

        private double DetermineDiscountRate(string customerType)
        {
            switch (customerType)
            {
                case "premium":
                    return GetPremiumDiscount();
                case "regular":
                    return GetRegularDiscount();
                default:
                    return GetDefaultDiscount();
            }
        }

        private double GetPremiumDiscount()
        {
            return 0.15; // 15%
        }

        private double GetRegularDiscount()
        {
            return 0.05; // 5%
        }

        private double GetDefaultDiscount()
        {
            return 0.0; // 0%
        }

        private double ApplyDiscountPercentage(double amount, double percentage)
        {
            return CalculateDiscountedAmount(amount, percentage);
        }

        private double CalculateDiscountedAmount(double amount, double percentage)
        {
            var discount = ComputeDiscountValue(amount, percentage);
            return SubtractDiscount(amount, discount);
        }

        private double ComputeDiscountValue(double amount, double percentage)
        {
            return amount * percentage;
        }

        private double SubtractDiscount(double amount, double discount)
        {
            return amount - discount;
        }
    }
}