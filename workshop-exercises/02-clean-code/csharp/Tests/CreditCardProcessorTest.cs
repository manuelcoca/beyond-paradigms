using Workshop.Application.Interfaces;
using Workshop.Application.Services;
using Xunit;

namespace Workshop.Tests
{
    // =============================================================================
    // CREDIT CARD PROCESSOR TESTS
    // Testing: Application/Services/CreditCardProcessor.cs
    // =============================================================================
    
    public class CreditCardProcessorTest
    {
        [Fact]
        public void ProcessPayment_ValidAmount_ReturnsSuccessMessage()
        {
            // Arrange: Test the over-abstracted CreditCardProcessor
            var processor = new CreditCardProcessor();
            double amount = 100.0;

            // Act: Call the method that goes through multiple abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify payment processing
            Assert.NotNull(result);
            Assert.Contains("Credit Card", result);
            Assert.Contains("102.90", result); // Amount + 2.9% fee
            Assert.Contains("fee:", result);
        }

        [Fact]
        public void ProcessPayment_SmallAmount_CalculatesCorrectFee()
        {
            // Arrange: Test small amount processing
            var processor = new CreditCardProcessor();
            double amount = 10.0;

            // Act: Process through the abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify fee calculation (10 + 2.9% = 10.29)
            Assert.Contains("10.29", result);
        }

        [Fact]
        public void ProcessPayment_LargeAmount_CalculatesCorrectFee()
        {
            // Arrange: Test large amount processing
            var processor = new CreditCardProcessor();
            double amount = 1000.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify fee calculation (1000 + 2.9% = 1029.00)
            Assert.Contains("1029.00", result);
        }

        [Fact]
        public void ProcessPayment_ZeroAmount_ProcessesWithoutFee()
        {
            // Arrange: Test zero amount
            var processor = new CreditCardProcessor();
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
            var processor = new CreditCardProcessor();
            double amount = -50.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify negative processing
            Assert.NotNull(result);
            Assert.Contains("Credit Card", result);
        }

        [Theory]
        [InlineData(100.0, "102.90")]
        [InlineData(50.0, "51.45")]
        [InlineData(200.0, "205.80")]
        [InlineData(1.0, "1.03")]
        public void ProcessPayment_VariousAmounts_CalculatesCorrectTotals(
            double amount, string expectedTotal)
        {
            // Arrange: Parameterized test for fee calculations
            var processor = new CreditCardProcessor();

            // Act: Process through all the abstraction layers
            var result = processor.ProcessPayment(amount);

            // Assert: Verify correct total calculation
            Assert.Contains(expectedTotal, result);
        }

        [Fact]
        public void ProcessPayment_MultipleCalls_AllSucceed()
        {
            // Arrange: Test multiple calls to same processor
            var processor = new CreditCardProcessor();

            // Act: Process multiple payments
            var result1 = processor.ProcessPayment(10.0);
            var result2 = processor.ProcessPayment(20.0);
            var result3 = processor.ProcessPayment(30.0);

            // Assert: Verify all calls succeed
            Assert.Contains("10.29", result1);
            Assert.Contains("20.58", result2);
            Assert.Contains("30.87", result3);
        }

        [Fact]
        public void ProcessPayment_ContainsExpectedElements()
        {
            // Arrange: Test result format
            var processor = new CreditCardProcessor();
            double amount = 75.0;

            // Act: Process payment
            var result = processor.ProcessPayment(amount);

            // Assert: Verify result contains all expected elements
            Assert.Contains("Credit Card", result);
            Assert.Contains("fee:", result);
            Assert.Contains("77.17", result); // 75 + 2.9% = 77.175 ≈ 77.17
        }
    }
}