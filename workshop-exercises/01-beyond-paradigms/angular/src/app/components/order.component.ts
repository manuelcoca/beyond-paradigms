import { Component } from "@angular/core";
import { PaymentProcessorComponent } from "./payment-processor.component";

// =============================================================================
// COMPOSITION - Building complex components from simpler ones
// =============================================================================

@Component({
  selector: "app-order",
  standalone: true,
  imports: [PaymentProcessorComponent],
  template: `
    <div>
      <!-- COMPOSITION - OrderComponent renders PaymentProcessorComponent -->
      <app-payment-processor
        [type]="selectedProcessor"
        [amount]="0"
        (result)="handlePaymentResult($event)"
      ></app-payment-processor>
    </div>
  `,
})
export class OrderComponent {
  // ENCAPSULATION - Private state within component
  selectedProcessor = "creditCard";

  handlePaymentResult(result: string): void {
    // ...
  }
}
