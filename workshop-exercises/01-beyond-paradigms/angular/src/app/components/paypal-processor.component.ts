import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PayPalProcessorService } from "../services/paypal-processor.service";

// =============================================================================
// ABSTRACTION - Component uses service through dependency injection
// COMPOSITION - Component composed with service
// =============================================================================

@Component({
  selector: "app-paypal-processor",
  standalone: true,
  template: `<div>💰 PayPal Processor</div>`,
})
export class PayPalProcessorComponent implements OnInit {
  @Input() amount!: number;
  @Output() result = new EventEmitter<string>();

  // DEPENDENCY INJECTION - Service injected automatically
  constructor(private processorService: PayPalProcessorService) {}

  ngOnInit(): void {
    const processPayment = async () => {
      const result = await this.processorService.processPayment(this.amount);
      this.result.emit(result);
    };

    processPayment();
  }
}
