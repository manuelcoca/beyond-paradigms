using Workshop.Application.Interfaces;
using Workshop.Application.Models;

namespace Workshop.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IPaymentProcessor _paymentProcessor;
        private readonly IDiscountService _discountService;

        public OrderService(IPaymentProcessor paymentProcessor, IDiscountService discountService)
        {
            _paymentProcessor = paymentProcessor;
            _discountService = discountService;
        }

        public string ProcessOrder(OrderData order)
        {
            return ExecuteOrderProcessing(order);
        }

        private string ExecuteOrderProcessing(OrderData order)
        {
            ValidateOrder(order);
            var discountedAmount = CalculateDiscountedAmount(order);
            var paymentResult = ProcessPayment(discountedAmount);
            var orderId = GenerateOrderId();
            return FormatSuccessResult(orderId, paymentResult, discountedAmount);
        }

        private void ValidateOrder(OrderData order)
        {
            PerformOrderValidation(order);
        }

        private void PerformOrderValidation(OrderData order)
        {
            ValidateAmount(order.Amount);
            ValidateCustomer(order.Customer);
        }

        private void ValidateAmount(double amount)
        {
            CheckAmountIsPositive(amount);
        }

        private void CheckAmountIsPositive(double amount)
        {
            if (amount <= 0)
                throw CreateAmountException();
        }

        private ArgumentException CreateAmountException()
        {
            return new ArgumentException("amount must be positive");
        }

        private void ValidateCustomer(string customer)
        {
            CheckCustomerIsNotEmpty(customer);
        }

        private void CheckCustomerIsNotEmpty(string customer)
        {
            if (string.IsNullOrEmpty(customer))
                throw CreateCustomerException();
        }

        private ArgumentException CreateCustomerException()
        {
            return new ArgumentException("customer cannot be empty");
        }

        private double CalculateDiscountedAmount(OrderData order)
        {
            return ExecuteDiscountCalculation(order.Amount, order.CustomerType);
        }

        private double ExecuteDiscountCalculation(double amount, string customerType)
        {
            var discountedAmount = _discountService.CalculateDiscount(amount, customerType);
            return discountedAmount;
        }

        private string ProcessPayment(double amount)
        {
            return ExecutePaymentProcessing(amount);
        }

        private string ExecutePaymentProcessing(double amount)
        {
            var result = _paymentProcessor.ProcessPayment(amount);
            return result;
        }

        private string GenerateOrderId()
        {
            return CreateOrderIdentifier();
        }

        private string CreateOrderIdentifier()
        {
            return FormatOrderId(GetCurrentTimestamp());
        }

        private long GetCurrentTimestamp()
        {
            return DateTimeOffset.Now.ToUnixTimeSeconds();
        }

        private string FormatOrderId(long timestamp)
        {
            return $"order_{timestamp}";
        }

        private string FormatSuccessResult(string orderId, string paymentResult, double amount)
        {
            return CreateSuccessMessage(orderId, paymentResult, amount);
        }

        private string CreateSuccessMessage(string orderId, string paymentResult, double amount)
        {
            return $"Order {orderId} completed: {paymentResult} (Final: ${amount:F2})";
        }
    }
}