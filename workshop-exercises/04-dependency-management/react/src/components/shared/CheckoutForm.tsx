import React, { useState } from "react";
import { CheckoutType, CustomerInfo, FormErrors } from "../../types/checkout";

// =============================================================================
// SHARED CHECKOUT FORM COMPONENT
// =============================================================================

interface CheckoutFormProps {
  checkoutType: CheckoutType;
  onSubmit: (customerInfo: CustomerInfo) => void;
  onNext: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  checkoutType,
  onSubmit,
  onNext,
}) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    company: "",
    discountCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic validation
    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Email is invalid";
    }

    // Reseller validation (original simple logic)
    if (checkoutType === CheckoutType.RESELLER) {
      if (customerInfo.discountCode && customerInfo.discountCode.trim()) {
        const validResellerCodes = ["SAVE10", "WELCOME", "RETURN"];
        if (!validResellerCodes.includes(customerInfo.discountCode)) {
          newErrors.discountCode = "Invalid reseller discount code";
        }
      }
    }

    // Distributor validation (has grown complex over time with many feature requests)
    if (checkoutType === CheckoutType.DISTRIBUTOR) {
      // Company is required for distributors
      if (!customerInfo.company?.trim()) {
        newErrors.company = "Company name is required for wholesale accounts";
      }

      // Discount code is mandatory for distributors
      if (!customerInfo.discountCode?.trim()) {
        newErrors.discountCode = "Distributor discount code is required";
      } else {
        const validDistributorCodes = ["DIST2024", "WHOLESALE", "PARTNER"];
        if (!validDistributorCodes.includes(customerInfo.discountCode)) {
          newErrors.discountCode = "Invalid distributor code";
        }

        // FEATURE REQUEST 1: Partners need special company name validation
        if (customerInfo.discountCode === "PARTNER") {
          if (!customerInfo.company?.toLowerCase().includes("partner")) {
            newErrors.company =
              "Partner discount requires 'Partner' in company name";
          }
        }

        // FEATURE REQUEST 2: Wholesale accounts need minimum company name length
        if (customerInfo.discountCode === "WHOLESALE") {
          if (customerInfo.company && customerInfo.company.length < 5) {
            newErrors.company =
              "Wholesale accounts require full company name (min 5 characters)";
          }
        }
      }

      // FEATURE REQUEST 3: Distributors with certain codes need email domain validation
      if (
        customerInfo.discountCode === "PARTNER" ||
        customerInfo.discountCode === "WHOLESALE"
      ) {
        if (
          customerInfo.email.includes("@gmail.com") ||
          customerInfo.email.includes("@yahoo.com")
        ) {
          newErrors.email =
            "Business distributors must use corporate email addresses";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(customerInfo);
      onNext();
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>
        {checkoutType === CheckoutType.RESELLER ? "Reseller" : "Distributor"}{" "}
        Checkout - Step 1
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={customerInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.name ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.email ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.email && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="company">
            Company {checkoutType === CheckoutType.DISTRIBUTOR ? "*" : ""}
          </label>
          <input
            id="company"
            type="text"
            value={customerInfo.company || ""}
            onChange={(e) => handleInputChange("company", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.company ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.company && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.company}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="discountCode">
            Discount Code {checkoutType === CheckoutType.DISTRIBUTOR ? "*" : ""}
          </label>
          <input
            id="discountCode"
            type="text"
            value={customerInfo.discountCode || ""}
            onChange={(e) => handleInputChange("discountCode", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.discountCode ? "2px solid red" : "1px solid #ccc",
            }}
          />
          {errors.discountCode && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.discountCode}
            </div>
          )}

          {checkoutType === CheckoutType.DISTRIBUTOR && (
            <div style={{ fontSize: "12px", color: "#666" }}>
              Required. Valid codes: DIST2024, WHOLESALE, PARTNER
            </div>
          )}

          {checkoutType === CheckoutType.RESELLER && (
            <div style={{ fontSize: "12px", color: "#666" }}>
              Optional. Valid codes: SAVE10, WELCOME, RETURN
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Next Step
        </button>
      </form>
    </div>
  );
};
