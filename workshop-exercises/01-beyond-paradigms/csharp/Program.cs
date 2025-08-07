using System;

// =============================================================================
// DEMONSTRATION: Four Pillars of OOP in C# (Object-Oriented Paradigm)
// =============================================================================

// 1. ABSTRACTION - Hiding implementation details behind interfaces
public interface IPaymentProcessor
{
    string ProcessPayment(decimal amount);
}

// 2. ENCAPSULATION - Bundling data with methods, controlling access
public class CreditCardProcessor : IPaymentProcessor
{
    private readonly string _apiKey;        // Private field
    private readonly decimal _feePercent;   // Private field

    public CreditCardProcessor()
    {
        _apiKey = "sk_secret_123";
        _feePercent = 0.029m; // 2.9%
    }

    public string ProcessPayment(decimal amount)
    {
        decimal fee = amount * _feePercent;
        return $"CreditCard: Processed ${amount:F2}, Fee: ${fee:F2}";
    }
}

// 3. POLYMORPHISM - Different types implementing same interface
public class PayPalProcessor : IPaymentProcessor
{
    private readonly string _clientId;      // Private field
    private readonly decimal _feePercent;   // Private field

    public PayPalProcessor()
    {
        _clientId = "paypal_client_456";
        _feePercent = 0.034m; // 3.4%
    }

    public string ProcessPayment(decimal amount)
    {
        decimal fee = amount * _feePercent;
        return $"PayPal: Processed ${amount:F2}, Fee: ${fee:F2}";
    }
}

// 4. COMPOSITION - Building complex objects from simpler ones
public class OrderService
{
    private readonly IPaymentProcessor _processor;  // Composition through interface
    private int _orderCount;                        // Private state

    public OrderService(IPaymentProcessor processor)
    {
        _processor = processor;
        _orderCount = 0;
    }

    public string ProcessOrder(decimal amount)
    {
        _orderCount++; // Modify private state
        string result = _processor.ProcessPayment(amount); // Polymorphism in action
        return $"Order #{_orderCount}: {result}";
    }

    public int GetOrderCount()
    {
        return _orderCount; // Controlled access to private state
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== C#: OOP Principles in Object-Oriented Paradigm ===");
        Console.WriteLine();

        // Demonstration of all four pillars working together

        // Create different processors (polymorphism)
        IPaymentProcessor creditCard = new CreditCardProcessor();
        IPaymentProcessor paypal = new PayPalProcessor();

        // Create services with different processors (composition)
        OrderService service1 = new OrderService(creditCard);
        OrderService service2 = new OrderService(paypal);

        // Same interface, different behavior (polymorphism)
        Console.WriteLine(service1.ProcessOrder(100.0m));
        Console.WriteLine(service2.ProcessOrder(100.0m));

        // Access controlled state (encapsulation)
        Console.WriteLine($"Service1 processed {service1.GetOrderCount()} orders");
        Console.WriteLine($"Service2 processed {service2.GetOrderCount()} orders");

        Console.WriteLine();
        Console.WriteLine("Key Insight: C# achieves OOP principles with classes!");
        Console.WriteLine("- Abstraction: interfaces");
        Console.WriteLine("- Encapsulation: private fields + public methods");
        Console.WriteLine("- Polymorphism: interface implementation");
        Console.WriteLine("- Composition: class dependencies");
    }
}