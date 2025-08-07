import React, { useState } from "react";
import { CheckoutData, CheckoutType, CustomerInfo } from "../../types/checkout";
import { CheckoutForm } from "../shared/CheckoutForm";

// =============================================================================
// DISTRIBUTOR CHECKOUT FEATURE
// =============================================================================

export const DistributorCheckout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer: {
      name: "",
      email: "",
      company: "",
      discountCode: "",
    },
    products: [
      { productId: "BULK-001", quantity: 100, price: 15.99 },
      { productId: "BULK-002", quantity: 50, price: 25.99 },
      { productId: "BULK-003", quantity: 200, price: 8.99 },
    ],
    total: 0,
  });

  const handleStep1Submit = (customerInfo: CustomerInfo) => {
    // Calculate total with distributor wholesale pricing
    let total = checkoutData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    // Apply distributor wholesale discounts (much higher than reseller)
    if (customerInfo.discountCode) {
      switch (customerInfo.discountCode) {
        case "DIST2024":
          total *= 0.6; // 40% off - big wholesale discount
          break;
        case "WHOLESALE":
          total *= 0.65; // 35% off
          break;
        case "PARTNER":
          total *= 0.5; // 50% off for key partners
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
      `Distributor order submitted for ${
        checkoutData.customer.company
      }! Total: $${checkoutData.total.toFixed(2)}`
    );
    // Reset to step 1
    setStep(1);
  };

  if (step === 1) {
    return (
      <div>
        <h1>🏭 Distributor Checkout</h1>

        <CheckoutForm
          checkoutType={CheckoutType.DISTRIBUTOR}
          onSubmit={handleStep1Submit}
          onNext={handleNextStep}
        />

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e8f5e8",
            borderRadius: "4px",
          }}
        >
          <h4>📦 Bulk Products:</h4>
          {checkoutData.products.map((product) => (
            <div key={product.productId} style={{ marginBottom: "5px" }}>
              {product.productId}: {product.quantity} units × ${product.price} =
              ${(product.quantity * product.price).toFixed(2)}
            </div>
          ))}
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            * Wholesale pricing with bulk discounts
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>🏭 Distributor Checkout - Step 2</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
        }}
      >
        <h3>Wholesale Order Summary</h3>
        <p>
          <strong>Company:</strong> {checkoutData.customer.company}
        </p>
        <p>
          <strong>Contact:</strong> {checkoutData.customer.name}
        </p>
        <p>
          <strong>Email:</strong> {checkoutData.customer.email}
        </p>
        <p>
          <strong>Distributor Code:</strong>{" "}
          {checkoutData.customer.discountCode}
        </p>

        <h4>Bulk Products:</h4>
        {checkoutData.products.map((product) => (
          <div key={product.productId}>
            {product.productId}: {product.quantity} units × ${product.price}
          </div>
        ))}

        <h3 style={{ color: "#28a745" }}>
          Wholesale Total: ${checkoutData.total.toFixed(2)}
        </h3>
        <div style={{ fontSize: "12px", color: "#666" }}>
          (Includes distributor discount)
        </div>
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
          Submit Wholesale Order
        </button>
      </div>
    </div>
  );
};
