import { Injectable } from "@angular/core";
import { PaymentProcessor } from "../interfaces/payment-processor.interface";

// =============================================================================
// ABSTRACTION - Implements PaymentProcessor interface
// ENCAPSULATION - Hides implementation details (private data/methods)
// POLYMORPHISM - Same interface, different implementation than CreditCard
// =============================================================================

@Injectable({
  providedIn: "root",
})
export class PayPalProcessorService implements PaymentProcessor {
  readonly processorType = "paypal";

  // ENCAPSULATION - Private fields
  private readonly clientId = "paypal_client_abc123";
  private readonly feePercent = 3.49;

  async processPayment(amount: number): Promise<string> {
    // ...
    return "";
  }

  calculateFee(amount: number): number {
    // ...
    return 0;
  }
}
