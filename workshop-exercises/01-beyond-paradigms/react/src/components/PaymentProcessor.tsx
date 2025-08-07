import React from "react";
import { PaymentProcessorType } from "../types/PaymentProcessor";
import { CreditCardProcessor } from "./CreditCardProcessor";
import { PayPalProcessor } from "./PayPalProcessor";

// =============================================================================
// POLYMORPHISM - Different processors implement same interface
// COMPOSITION - PaymentProcessor renders specific processor components
// =============================================================================

interface PaymentProcessorProps {
  type: PaymentProcessorType;
  amount: number;
  onResult: (result: string) => void;
}

export const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  type,
  amount,
  onResult,
}) => {
  // POLYMORPHISM - Select different component implementations at runtime
  switch (type) {
    case PaymentProcessorType.CREDIT_CARD:
      return <CreditCardProcessor amount={amount} onResult={onResult} />;
    case PaymentProcessorType.PAYPAL:
      return <PayPalProcessor amount={amount} onResult={onResult} />;
    default:
      return <div>Unknown processor</div>;
  }
};
