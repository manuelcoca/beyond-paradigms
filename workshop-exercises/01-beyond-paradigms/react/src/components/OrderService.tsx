import React, { useState } from "react";
import { PaymentProcessorType } from "../types/PaymentProcessor";
import { PaymentProcessor } from "./PaymentProcessor";

// =============================================================================
// COMPOSITION - Building complex components from simpler ones
// =============================================================================

export const OrderService: React.FC = () => {
  // ENCAPSULATION - Private state within component
  const [selectedProcessor, setSelectedProcessor] =
    useState<PaymentProcessorType>(PaymentProcessorType.CREDIT_CARD);

  const handlePaymentResult = (result: string): void => {
    // ...
  };

  return (
    <div>
      {/* COMPOSITION - OrderService renders PaymentProcessor component */}
      <PaymentProcessor
        type={selectedProcessor}
        amount={0}
        onResult={handlePaymentResult}
      />
    </div>
  );
};
