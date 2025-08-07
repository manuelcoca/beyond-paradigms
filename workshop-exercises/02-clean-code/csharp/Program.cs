using Workshop.Application.Interfaces;
using Workshop.Application.Services;
using Workshop.Application.Models;

namespace Workshop
{
    public class Program
    {
        public static void Main(string[] args)
        {
            StartApplication();
        }

        private static void StartApplication()
        {
            var orderService = BuildOrderService();
            RunDemo(orderService);
        }

        private static IOrderService BuildOrderService()
        {
            var paymentProcessor = CreatePaymentProcessor();
            var discountService = CreateDiscountService();
            
            return new OrderService(paymentProcessor, discountService);
        }

        private static IPaymentProcessor CreatePaymentProcessor()
        {
            return new CreditCardProcessor();
            // Alternative: return new PayPalProcessor();
        }

        private static IDiscountService CreateDiscountService()
        {
            return new DiscountService();
        }

        private static void RunDemo(IOrderService orderService)
        {
            Console.WriteLine("=== Clean Code Demo ===");
            
            // Demo order
            var order = new OrderData
            {
                Amount = 100.50,
                Customer = "john.doe@example.com",
                CustomerType = "premium"
            };
            
            Console.WriteLine($"Processing order for {order.Customer} ({order.CustomerType}): ${order.Amount:F2}");
            
            try
            {
                var result = orderService.ProcessOrder(order);
                Console.WriteLine($"Success: {result}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Order failed: {ex.Message}");
            }
        }
    }
}