using Workshop.Application.Interfaces;

namespace Workshop.Application.Services
{
    public class CreditCardProcessor : IPaymentProcessor
    {
        private readonly double _feePercent = 2.9;

        public string ProcessPayment(double amount)
        {
            return ExecutePaymentProcessing(amount);
        }

        private string ExecutePaymentProcessing(double amount)
        {
            var fee = CalculateProcessingFee(amount);
            var total = CalculateTotalAmount(amount, fee);
            SimulateProcessingDelay();
            return FormatPaymentResult(total, fee);
        }

        private double CalculateProcessingFee(double amount)
        {
            return ComputeFeeFromAmount(amount);
        }

        private double ComputeFeeFromAmount(double amount)
        {
            return amount * _feePercent / 100;
        }

        private double CalculateTotalAmount(double amount, double fee)
        {
            return AddFeeToAmount(amount, fee);
        }

        private double AddFeeToAmount(double amount, double fee)
        {
            return amount + fee;
        }

        private void SimulateProcessingDelay()
        {
            WaitForProcessing(100);
        }

        private void WaitForProcessing(int milliseconds)
        {
            Thread.Sleep(milliseconds);
        }

        private string FormatPaymentResult(double total, double fee)
        {
            return $"Credit Card: ${total:F2} (fee: ${fee:F2})";
        }
    }
}