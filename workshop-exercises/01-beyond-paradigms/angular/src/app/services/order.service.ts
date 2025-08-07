import { Injectable } from "@angular/core";
import { PaymentProcessor } from "../interfaces/payment-processor.interface";
import { CreditCardProcessorService } from "./credit-card-processor.service";
import { PayPalProcessorService } from "./paypal-processor.service";

// =============================================================================
// COMPOSITION - OrderService composed of different payment processors
// DEPENDENCY INJECTION - Automatically provides processor services
// =============================================================================

@Injectable({
  providedIn: "root",
})
export class OrderService {
  // DEPENDENCY INJECTION - Payment processors injected automatically
  constructor(
    private creditCardProcessor: CreditCardProcessorService,
    private paypalProcessor: PayPalProcessorService
  ) {}

  async processOrder(amount: number, processorType: string): Promise<string> {
    // POLYMORPHISM - Select processor at runtime based on type
    const processor = this.getProcessor(processorType);
    const result = await processor.processPayment(amount);
    return result;
  }

  // Private method for polymorphic processor selection
  private getProcessor(type: string): PaymentProcessor {
    switch (type) {
      case "creditCard":
        return this.creditCardProcessor;
      case "paypal":
        return this.paypalProcessor;
      default:
        throw new Error(`Unknown processor type: ${type}`);
    }
  }
}
