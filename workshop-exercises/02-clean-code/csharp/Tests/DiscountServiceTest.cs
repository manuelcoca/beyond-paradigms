using Workshop.Application.Interfaces;
using Workshop.Application.Services;
using Xunit;

namespace Workshop.Tests
{
    // =============================================================================
    // DISCOUNT SERVICE TESTS
    // Testing: Application/Services/DiscountService.cs
    // =============================================================================
    
    public class DiscountServiceTest
    {
        [Fact]
        public void CalculateDiscount_PremiumCustomer_Returns15PercentDiscount()
        {
            // Arrange: Test the over-abstracted DiscountService
            var discountService = new DiscountService();
            double amount = 100.0;
            string customerType = "premium";

            // Act: Call the method that goes through multiple abstraction layers
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify the discount calculation
            // Expected: 100 * (1 - 0.15) = 85.0
            Assert.Equal(85.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_RegularCustomer_Returns5PercentDiscount()
        {
            // Arrange: Test regular customer discount
            var discountService = new DiscountService();
            double amount = 200.0;
            string customerType = "regular";

            // Act: Call the over-abstracted method chain
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify the discount calculation
            // Expected: 200 * (1 - 0.05) = 190.0
            Assert.Equal(190.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_UnknownCustomer_ReturnsNoDiscount()
        {
            // Arrange: Test unknown customer type
            var discountService = new DiscountService();
            double amount = 150.0;
            string customerType = "unknown";

            // Act: Call the method
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify no discount applied
            // Expected: 150 * (1 - 0.0) = 150.0
            Assert.Equal(150.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_NullCustomerType_ReturnsNoDiscount()
        {
            // Arrange: Test null customer type
            var discountService = new DiscountService();
            double amount = 100.0;
            string customerType = null;

            // Act: Call the method
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify no discount applied
            Assert.Equal(100.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_EmptyCustomerType_ReturnsNoDiscount()
        {
            // Arrange: Test empty customer type
            var discountService = new DiscountService();
            double amount = 75.0;
            string customerType = "";

            // Act: Call the method
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify no discount applied
            Assert.Equal(75.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_ZeroAmount_ReturnsZero()
        {
            // Arrange: Test zero amount
            var discountService = new DiscountService();
            double amount = 0.0;
            string customerType = "premium";

            // Act: Call the method
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify zero result
            Assert.Equal(0.0, result, 2);
        }

        [Fact]
        public void CalculateDiscount_NegativeAmount_ReturnsNegativeResult()
        {
            // Arrange: Test negative amount (edge case)
            var discountService = new DiscountService();
            double amount = -50.0;
            string customerType = "premium";

            // Act: Call the method
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify calculation still works
            // Expected: -50 * (1 - 0.15) = -42.5
            Assert.Equal(-42.5, result, 2);
        }

        [Theory]
        [InlineData(100.0, "premium", 85.0)]
        [InlineData(100.0, "regular", 95.0)]
        [InlineData(100.0, "unknown", 100.0)]
        [InlineData(50.0, "premium", 42.5)]
        [InlineData(200.0, "regular", 190.0)]
        public void CalculateDiscount_VariousInputs_ReturnsCorrectResults(
            double amount, string customerType, double expected)
        {
            // Arrange: Parameterized test for multiple scenarios
            var discountService = new DiscountService();

            // Act: Test the over-abstracted calculation
            var result = discountService.CalculateDiscount(amount, customerType);

            // Assert: Verify all scenarios work correctly
            Assert.Equal(expected, result, 2);
        }
    }
}