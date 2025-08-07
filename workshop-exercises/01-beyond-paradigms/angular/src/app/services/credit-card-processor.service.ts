import { Injectable } from "@angular/core";
import { PaymentProcessor } from "../interfaces/payment-processor.interface";

// =============================================================================
// ABSTRACTION - Implements PaymentProcessor interface
// ENCAPSULATION - Hides implementation details (private data/methods)
// =============================================================================

@Injectable({
  providedIn: "root",
})
export class CreditCardProcessorService implements PaymentProcessor {
  readonly processorType = "creditCard";

  // ENCAPSULATION - Private fields
  private readonly apiKey = "cc_secret_key_12345";
  private readonly feePercent = 2.9;

  async processPayment(amount: number): Promise<string> {
    // ...
    return "";
  }

  calculateFee(amount: number): number {
    // ...
    return 0;
  }
}
