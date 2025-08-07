import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CreditCardProcessorService } from "../services/credit-card-processor.service";

// =============================================================================
// ABSTRACTION - Component uses service through dependency injection
// COMPOSITION - Component composed with service
// =============================================================================

@Component({
  selector: "app-credit-card-processor",
  standalone: true,
  template: `<div>🏦 Credit Card Processor</div>`,
})
export class CreditCardProcessorComponent implements OnInit {
  @Input() amount!: number;
  @Output() result = new EventEmitter<string>();

  // DEPENDENCY INJECTION - Service injected automatically
  constructor(private processorService: CreditCardProcessorService) {}

  ngOnInit(): void {
    const processPayment = async () => {
      const result = await this.processorService.processPayment(this.amount);
      this.result.emit(result);
    };

    processPayment();
  }
}
