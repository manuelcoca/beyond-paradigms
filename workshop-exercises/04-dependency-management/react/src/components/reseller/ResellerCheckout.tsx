import React, { useState } from "react";
import { CheckoutData, CheckoutType, CustomerInfo } from "../../types/checkout";
import { CheckoutForm } from "../shared/CheckoutForm";

// =============================================================================
// RESELLER CHECKOUT FEATURE
// =============================================================================

export const ResellerCheckout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer: {
      name: "",
      email: "",
      company: "",
      discountCode: "",
    },
    products: [
      { productId: "PROD-001", quantity: 2, price: 29.99 },
      { productId: "PROD-002", quantity: 1, price: 49.99 },
    ],
    total: 0,
  });

  const handleStep1Submit = (customerInfo: CustomerInfo) => {
    // Calculate total with reseller pricing
    let total = checkoutData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    // Apply reseller discount if provided
    if (customerInfo.discountCode) {
      switch (customerInfo.discountCode) {
        case "SAVE10":
          total *= 0.9; // 10% off
          break;
        case "WELCOME":
          total *= 0.95; // 5% off
          break;
        case "RETURN":
          total *= 0.85; // 15% off for returning customers
          break;
      }
    }

    setCheckoutData((prev) => ({
      ...prev,
      customer: customerInfo,
      total: total,
    }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleFinalSubmit = () => {
    alert(
      `Reseller order submitted for ${
        checkoutData.customer.name
      }! Total: $${checkoutData.total.toFixed(2)}`
    );
    // Reset to step 1
    setStep(1);
  };

  if (step === 1) {
    return (
      <div>
        <h1>🏪 Reseller Checkout</h1>

        <CheckoutForm
          checkoutType={CheckoutType.RESELLER}
          onSubmit={handleStep1Submit}
          onNext={handleNextStep}
        />

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
          }}
        >
          <h4>📦 Your Products:</h4>
          {checkoutData.products.map((product) => (
            <div key={product.productId} style={{ marginBottom: "5px" }}>
              {product.productId}: {product.quantity} × ${product.price} = $
              {(product.quantity * product.price).toFixed(2)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>🏪 Reseller Checkout - Step 2</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Order Summary</h3>
        <p>
          <strong>Customer:</strong> {checkoutData.customer.name}
        </p>
        <p>
          <strong>Email:</strong> {checkoutData.customer.email}
        </p>
        {checkoutData.customer.company && (
          <p>
            <strong>Company:</strong> {checkoutData.customer.company}
          </p>
        )}
        {checkoutData.customer.discountCode && (
          <p>
            <strong>Discount Applied:</strong>{" "}
            {checkoutData.customer.discountCode}
          </p>
        )}

        <h4>Products:</h4>
        {checkoutData.products.map((product) => (
          <div key={product.productId}>
            {product.productId}: {product.quantity} × ${product.price}
          </div>
        ))}

        <h3 style={{ color: "#007bff" }}>
          Total: ${checkoutData.total.toFixed(2)}
        </h3>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handlePreviousStep}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <button
          onClick={handleFinalSubmit}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};
