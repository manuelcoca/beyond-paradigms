// =============================================================================
// 1. ABSTRACTION - TypeScript interfaces define contracts, hide implementation
// =============================================================================

export interface PaymentProcessor {
  readonly processorType: PaymentProcessorType;
  readonly feePercent: number;
  processPayment(amount: number): Promise<string>;
  calculateFee(amount: number): number;
}

export enum PaymentProcessorType {
  CREDIT_CARD = 'creditCard',
  PAYPAL = 'paypal'
}

export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  fee: number;
}

export interface PaymentProcessorProps {
  amount: number;
  onResult: (result: string) => void;
}

export interface OrderStatus {
  orderCount: number;
  lastResult: string;
  isProcessing: boolean;
}