// =============================================================================
// ABSTRACTION - Interface defines contract, hides implementation details
// =============================================================================

export interface PaymentProcessor {
  readonly processorType: string;
  processPayment(amount: number): Promise<string>;
  calculateFee(amount: number): number;
}
