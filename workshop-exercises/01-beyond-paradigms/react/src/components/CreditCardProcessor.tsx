import React, { useEffect } from "react";
import { PaymentProcessorProps } from "../types/PaymentProcessor";

// =============================================================================
// ABSTRACTION - Implements PaymentProcessor interface through function
// POLYMORPHISM - Same interface, different implementation
// =============================================================================

export const CreditCardProcessor: React.FC<PaymentProcessorProps> = ({
  amount,
  onResult,
}) => {
  const processPayment = async (amount: number): Promise<string> => {
    // ...
    return "";
  };

  useEffect(() => {
    const handlePayment = async () => {
      const result = await processPayment(amount);
      onResult(result);
    };

    handlePayment();
  }, [amount, onResult]);

  return <div>🏦 Credit Card Processor</div>;
};
