using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SharedStateExample
{
    public class SystemState
    {
        public List<Order> Orders { get; set; } = new();
        public int TotalOrders { get; set; } = 0;
        public int TotalPayments { get; set; } = 0;
    }

    public class Order
    {
        public string Id { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = "pending";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class OrderService
    {
        private readonly SystemState _sharedState;

        public OrderService(SystemState sharedState)
        {
            _sharedState = sharedState;
        }

        public void CreateOrder(string orderId, decimal amount)
        {
            var order = new Order
            {
                Id = orderId,
                Amount = amount,
                Status = "created"
            };

            _sharedState.Orders.Add(order);
            _sharedState.TotalOrders++;

            Thread.Sleep(Random.Shared.Next(10, 50));
            Console.WriteLine($"[OrderService] Created order {orderId} for ${amount}");
        }

        public void UpdateOrderStatus(string orderId, string newStatus)
        {
            var order = _sharedState.Orders.Find(o => o.Id == orderId);
            if (order != null)
            {
                Thread.Sleep(Random.Shared.Next(5, 25));
                order.Status = newStatus;
                Console.WriteLine($"[OrderService] Updated order {orderId} status to {newStatus}");
            }
        }
    }

    public class PaymentService
    {
        private readonly SystemState _sharedState;

        public PaymentService(SystemState sharedState)
        {
            _sharedState = sharedState;
        }

        public void ProcessPayment(string orderId)
        {
            var order = _sharedState.Orders.Find(o => o.Id == orderId);
            if (order != null)
            {
                Thread.Sleep(Random.Shared.Next(15, 40));
                
                _sharedState.TotalPayments++;
                Console.WriteLine($"[PaymentService] Processed payment for order {orderId}");
            }
        }
    }

    public class ReportingService
    {
        private readonly SystemState _sharedState;

        public ReportingService(SystemState sharedState)
        {
            _sharedState = sharedState;
        }

        public void GenerateReport()
        {
            Thread.Sleep(Random.Shared.Next(5, 15));

            var orderCount = _sharedState.Orders.Count;
            var totalOrders = _sharedState.TotalOrders;
            var totalPayments = _sharedState.TotalPayments;

            Console.WriteLine($"[ReportingService] REPORT - Orders: {orderCount}, Total Orders: {totalOrders}, Payments: {totalPayments}");

            if (orderCount != totalOrders || totalOrders != totalPayments)
            {
                Console.WriteLine("INCONSISTENT STATE DETECTED! Counts don't match!");
            }
        }
    }

    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("=== OBJECT-ORIENTED APPROACH WITH SHARED STATE (C#) ===");
            Console.WriteLine("Demonstrates shared state problems in OOP");
            Console.WriteLine();

            var sharedState = new SystemState();

            var orderService = new OrderService(sharedState);
            var paymentService = new PaymentService(sharedState);
            var reportingService = new ReportingService(sharedState);

            Console.WriteLine("Processing multiple orders concurrently...");
            Console.WriteLine();

            var tasks = new List<Task>();

            for (int i = 1; i <= 5; i++)
            {
                var orderId = $"ORDER_{i:D3}";
                var amount = 100m + (i * 10);

                tasks.Add(Task.Run(async () =>
                {
                    await ProcessOrderWorkflow(orderId, amount, orderService, paymentService);
                }));

                if (i % 2 == 0)
                {
                    tasks.Add(Task.Run(() => reportingService.GenerateReport()));
                }
            }

            await Task.WhenAll(tasks);

            Console.WriteLine();
            Console.WriteLine("=== FINAL STATE ANALYSIS ===");
            reportingService.GenerateReport();
        }

        private static async Task ProcessOrderWorkflow(string orderId, decimal amount,
            OrderService orderService, PaymentService paymentService)
        {
            orderService.CreateOrder(orderId, amount);
            
            await Task.Delay(Random.Shared.Next(10, 30));
            
            orderService.UpdateOrderStatus(orderId, "processing");
            
            await Task.Delay(Random.Shared.Next(10, 30));
            
            paymentService.ProcessPayment(orderId);
            
            await Task.Delay(Random.Shared.Next(10, 30));
            
            orderService.UpdateOrderStatus(orderId, "paid");
        }
    }
}