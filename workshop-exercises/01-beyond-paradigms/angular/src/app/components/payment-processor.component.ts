import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CreditCardProcessorComponent } from "./credit-card-processor.component";
import { PayPalProcessorComponent } from "./paypal-processor.component";

// =============================================================================
// POLYMORPHISM - Different processors implement same interface
// COMPOSITION - PaymentProcessor renders specific processor components
// =============================================================================

@Component({
  selector: "app-payment-processor",
  standalone: true,
  imports: [
    CommonModule,
    CreditCardProcessorComponent,
    PayPalProcessorComponent,
  ],
  template: `
    <div>
      <!-- POLYMORPHISM - Select different component implementations at runtime -->
      <app-credit-card-processor
        *ngIf="type === 'creditCard'"
        [amount]="amount"
        (result)="result.emit($event)"
      ></app-credit-card-processor>

      <app-paypal-processor
        *ngIf="type === 'paypal'"
        [amount]="amount"
        (result)="result.emit($event)"
      ></app-paypal-processor>

      <div *ngIf="type !== 'creditCard' && type !== 'paypal'">
        Unknown processor
      </div>
    </div>
  `,
})
export class PaymentProcessorComponent {
  @Input() type!: string;
  @Input() amount!: number;
  @Output() result = new EventEmitter<string>();
}
