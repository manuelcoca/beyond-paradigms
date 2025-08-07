using Workshop.Application.Interfaces;
using Workshop.Application.Services;
using Workshop.Application.Models;
using Moq;
using Xunit;

namespace Workshop.Tests
{
    // =============================================================================
    // ORDER SERVICE TESTS
    // Testing: Application/Services/OrderService.cs
    // Dependencies: IPaymentProcessor, IDiscountService (in separate files)
    // =============================================================================
    
    public class OrderServiceTest
    {
        [Fact]
        public void ProcessOrder_ValidOrder_ReturnsSuccess()
        {
            // Arrange: Setup mock services 
            // Need to mock IPaymentProcessor (could be CreditCardProcessor or PayPalProcessor)
            var mockProcessor = new Mock<IPaymentProcessor>();
            mockProcessor.Setup(p => p.ProcessPayment(85.0))
                        .Returns("Payment successful");
            
            // Need to mock IDiscountService (implemented in DiscountService.cs)
            var mockDiscount = new Mock<IDiscountService>();
            mockDiscount.Setup(d => d.CalculateDiscount(100.0, "premium"))
                       .Returns(85.0); // 15% discount
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 100.0,
                Customer = "test@example.com",
                CustomerType = "premium"
            };

            // Act: Process the order
            var result = orderService.ProcessOrder(order);

            // Assert: Verify results
            Assert.NotNull(result);
            Assert.Contains("completed", result);
            
            // Verify mocks were called with correct parameters
            // This requires understanding the interaction between:
            // - OrderService.cs (main orchestrator)
            // - DiscountService.cs (for discount calculation)
            // - Payment processor (CreditCardProcessor.cs or PayPalProcessor.cs)
            mockDiscount.Verify(d => d.CalculateDiscount(100.0, "premium"), Times.Once);
            mockProcessor.Verify(p => p.ProcessPayment(85.0), Times.Once);
        }

        [Fact]
        public void ProcessOrder_InvalidAmount_ThrowsException()
        {
            // Arrange: Setup mock services (won't be called due to validation in OrderService.cs)
            var mockProcessor = new Mock<IPaymentProcessor>();
            var mockDiscount = new Mock<IDiscountService>();
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = -10.0, // Invalid amount
                Customer = "test@example.com",
                CustomerType = "regular"
            };

            // Act & Assert: Should fail validation
            var exception = Assert.Throws<ArgumentException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("amount must be positive", exception.Message);
            
            // Verify services were never called
            mockDiscount.Verify(d => d.CalculateDiscount(It.IsAny<double>(), It.IsAny<string>()), Times.Never);
            mockProcessor.Verify(p => p.ProcessPayment(It.IsAny<double>()), Times.Never);
        }

        [Fact]
        public void ProcessOrder_EmptyCustomer_ThrowsException()
        {
            // Arrange: Setup mock services
            var mockProcessor = new Mock<IPaymentProcessor>();
            var mockDiscount = new Mock<IDiscountService>();
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 100.0,
                Customer = "", // Empty customer
                CustomerType = "regular"
            };

            // Act & Assert: Should fail validation
            var exception = Assert.Throws<ArgumentException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("customer cannot be empty", exception.Message);
            
            // Verify services were never called
            mockDiscount.Verify(d => d.CalculateDiscount(It.IsAny<double>(), It.IsAny<string>()), Times.Never);
            mockProcessor.Verify(p => p.ProcessPayment(It.IsAny<double>()), Times.Never);
        }

        [Fact]
        public void ProcessOrder_PaymentProcessorThrows_PropagatesException()
        {
            // Arrange: Setup mock services - payment processor fails
            var mockProcessor = new Mock<IPaymentProcessor>();
            mockProcessor.Setup(p => p.ProcessPayment(It.IsAny<double>()))
                        .Throws(new InvalidOperationException("Payment service unavailable"));
            
            var mockDiscount = new Mock<IDiscountService>();
            mockDiscount.Setup(d => d.CalculateDiscount(100.0, "regular"))
                       .Returns(95.0);
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 100.0,
                Customer = "test@example.com",
                CustomerType = "regular"
            };

            // Act & Assert: Should propagate payment exception
            var exception = Assert.Throws<InvalidOperationException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("Payment service unavailable", exception.Message);
        }

        [Fact]
        public void ProcessOrder_DiscountServiceThrows_PropagatesException()
        {
            // Arrange: Setup mock services - discount service fails
            var mockProcessor = new Mock<IPaymentProcessor>();
            var mockDiscount = new Mock<IDiscountService>();
            mockDiscount.Setup(d => d.CalculateDiscount(It.IsAny<double>(), It.IsAny<string>()))
                       .Throws(new InvalidOperationException("Discount service unavailable"));
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 100.0,
                Customer = "test@example.com",
                CustomerType = "regular"
            };

            // Act & Assert: Should propagate discount exception
            var exception = Assert.Throws<InvalidOperationException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("Discount service unavailable", exception.Message);
        }

        [Fact]
        public void ProcessOrder_NullCustomer_ThrowsException()
        {
            // Arrange: Setup mock services
            var mockProcessor = new Mock<IPaymentProcessor>();
            var mockDiscount = new Mock<IDiscountService>();
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 100.0,
                Customer = null, // Null customer
                CustomerType = "regular"
            };

            // Act & Assert: Should fail validation
            var exception = Assert.Throws<ArgumentException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("customer cannot be empty", exception.Message);
        }

        [Fact]
        public void ProcessOrder_ZeroAmount_ThrowsException()
        {
            // Arrange: Setup mock services
            var mockProcessor = new Mock<IPaymentProcessor>();
            var mockDiscount = new Mock<IDiscountService>();
            
            var orderService = new OrderService(mockProcessor.Object, mockDiscount.Object);
            
            var order = new OrderData
            {
                Amount = 0.0, // Zero amount
                Customer = "test@example.com",
                CustomerType = "regular"
            };

            // Act & Assert: Should fail validation
            var exception = Assert.Throws<ArgumentException>(() => 
                orderService.ProcessOrder(order));
            
            Assert.Equal("amount must be positive", exception.Message);
        }
    }
}