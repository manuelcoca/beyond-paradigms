using Workshop.Application.Interfaces;
using Workshop.Application.Services;
using Xunit;

namespace Workshop.Tests
{
    // =============================================================================
    // PAYPAL PROCESSOR TESTS
    // Testing: Application/Services/PayPalProcessor.cs
    // =============================================================================
    
    public class PayPalProcessorTest
    {
        [Fact]
        public void ProcessPayment_ValidAmount_ReturnsSuccessMessage()
        {
            // Arrange
            var processor = new PayPalProcessor();
            double amount = 100.0;

            // Act: Call the method that goes through multiple abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify payment processing
            Assert.NotNull(result);
            Assert.Contains("PayPal", result);
            Assert.Contains("103.49", result); // Amount + 3.49% fee
            Assert.Contains("fee:", result);
        }

        [Fact]
        public void ProcessPayment_SmallAmount_CalculatesCorrectFee()
        {
            // Arrange: Test small amount processing
            var processor = new PayPalProcessor();
            double amount = 10.0;

            // Act: Process through the abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify fee calculation (10 + 3.49% = 10.349 ≈ 10.35)
            Assert.Contains("10.35", result);
        }

        [Fact]
        public void ProcessPayment_LargeAmount_CalculatesCorrectFee()
        {
            // Arrange: Test large amount processing
            var processor = new PayPalProcessor();
            double amount = 1000.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify fee calculation (1000 + 3.49% = 1034.90)
            Assert.Contains("1034.90", result);
        }

        [Fact]
        public void ProcessPayment_ZeroAmount_ProcessesWithoutFee()
        {
            // Arrange: Test zero amount
            var processor = new PayPalProcessor();
            double amount = 0.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify zero amount processing
            Assert.Contains("0.00", result);
        }

        [Fact]
        public void ProcessPayment_NegativeAmount_ProcessesNegativeFee()
        {
            // Arrange: Test negative amount (edge case)
            var processor = new PayPalProcessor();
            double amount = -50.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify negative processing
            Assert.NotNull(result);
            Assert.Contains("PayPal", result);
        }

        [Theory]
        [InlineData(100.0, "103.49")]
        [InlineData(50.0, "51.74")]
        [InlineData(200.0, "206.98")]
        [InlineData(1.0, "1.03")]
        public void ProcessPayment_VariousAmounts_CalculatesCorrectTotals(
            double amount, string expectedTotal)
        {
            // Arrange: Parameterized test for fee calculations
            var processor = new PayPalProcessor();

            // Act: Process through all the abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify correct total calculation
            Assert.Contains(expectedTotal, result);
        }

        [Fact]
        public void ProcessPayment_MultipleCalls_AllSucceed()
        {
            // Arrange: Test multiple calls to same processor
            var processor = new PayPalProcessor();

            // Act: Process multiple payments
            var result1 = processor.ProcessPayment(10.0);
            var result2 = processor.ProcessPayment(20.0);
            var result3 = processor.ProcessPayment(30.0);

            // Assert: Verify all calls succeed
            Assert.Contains("10.35", result1);
            Assert.Contains("20.70", result2);
            Assert.Contains("31.05", result3);
        }

        [Fact]
        public void ProcessPayment_ContainsExpectedElements()
        {
            // Arrange: Test result format
            var processor = new PayPalProcessor();
            double amount = 75.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify result contains all expected elements
            Assert.Contains("PayPal", result);
            Assert.Contains("fee:", result);
            Assert.Contains("77.62", result); // 75 + 3.49% = 77.6175 ≈ 77.62
        }

        [Fact]
        public void ProcessPayment_CompareWithCreditCard_HasHigherFee()
        {
            // Arrange: Compare PayPal vs Credit Card fees
            var paypalProcessor = new PayPalProcessor();
            var creditCardProcessor = new CreditCardProcessor();
            double amount = 100.0;

            // Act: Process same amount with both processors
            var paypalResult = paypalProcessor.ProcessPayment(amount);
            var creditCardResult = creditCardProcessor.ProcessPayment(amount);

            // Assert: PayPal should have higher total (3.49% vs 2.9%)
            Assert.Contains("103.49", paypalResult); // PayPal: higher fee
            Assert.Contains("102.90", creditCardResult); // Credit Card: lower fee
        }
    }
}