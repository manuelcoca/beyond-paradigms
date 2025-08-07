using Workshop.Application.Models;

namespace Workshop.Application.Interfaces
{
    public interface IOrderService
    {
        string ProcessOrder(OrderData order);
    }

    public interface IPaymentProcessor
    {
        string ProcessPayment(double amount);
    }

    public interface IDiscountService
    {
        double CalculateDiscount(double amount, string customerType);
    }
}