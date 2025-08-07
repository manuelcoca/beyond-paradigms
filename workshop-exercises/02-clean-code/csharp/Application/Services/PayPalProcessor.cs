using Workshop.Application.Interfaces;

namespace Workshop.Application.Services
{
    public class PayPalProcessor : IPaymentProcessor
    {
        private readonly double _feePercent = 3.49;

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
            WaitForProcessing(150);
        }

        private void WaitForProcessing(int milliseconds)
        {
            Thread.Sleep(milliseconds);
        }

        private string FormatPaymentResult(double total, double fee)
        {
            return $"PayPal: ${total:F2} (fee: ${fee:F2})";
        }
    }
}