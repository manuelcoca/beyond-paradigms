namespace Workshop.Application.Models
{
    public class OrderData
    {
        public double Amount { get; set; }
        public string Customer { get; set; } = string.Empty;
        public string CustomerType { get; set; } = string.Empty;
    }
}