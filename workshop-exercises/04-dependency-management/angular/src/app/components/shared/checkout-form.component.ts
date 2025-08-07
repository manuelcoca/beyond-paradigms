import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CheckoutType, CustomerInfo, FormErrors } from "../../types/checkout";

// =============================================================================
// SHARED CHECKOUT FORM COMPONENT
// =============================================================================

@Component({
  selector: "app-checkout-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; max-width: 500px;">
      <h2>
        {{
          checkoutType === CheckoutType.RESELLER ? "Reseller" : "Distributor"
        }}
        Checkout - Step 1
      </h2>

      <form (ngSubmit)="handleSubmit($event)">
        <div style="margin-bottom: 15px;">
          <label for="name">Name *</label>
          <input
            id="name"
            type="text"
            [(ngModel)]="customerInfo.name"
            name="name"
            (input)="clearError('name')"
            [style.width]="'100%'"
            [style.padding]="'8px'"
            [style.border]="errors.name ? '2px solid red' : '1px solid #ccc'"
          />
          <div *ngIf="errors.name" style="color: red; font-size: 12px;">
            {{ errors.name }}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="email">Email *</label>
          <input
            id="email"
            type="email"
            [(ngModel)]="customerInfo.email"
            name="email"
            (input)="clearError('email')"
            [style.width]="'100%'"
            [style.padding]="'8px'"
            [style.border]="errors.email ? '2px solid red' : '1px solid #ccc'"
          />
          <div *ngIf="errors.email" style="color: red; font-size: 12px;">
            {{ errors.email }}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="company">
            Company {{ checkoutType === CheckoutType.DISTRIBUTOR ? "*" : "" }}
          </label>
          <input
            id="company"
            type="text"
            [(ngModel)]="customerInfo.company"
            name="company"
            (input)="clearError('company')"
            [style.width]="'100%'"
            [style.padding]="'8px'"
            [style.border]="errors.company ? '2px solid red' : '1px solid #ccc'"
          />
          <div *ngIf="errors.company" style="color: red; font-size: 12px;">
            {{ errors.company }}
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <label for="discountCode">
            Discount Code
            {{ checkoutType === CheckoutType.DISTRIBUTOR ? "*" : "" }}
          </label>
          <input
            id="discountCode"
            type="text"
            [(ngModel)]="customerInfo.discountCode"
            name="discountCode"
            (input)="clearError('discountCode')"
            [style.width]="'100%'"
            [style.padding]="'8px'"
            [style.border]="
              errors.discountCode ? '2px solid red' : '1px solid #ccc'
            "
          />
          <div *ngIf="errors.discountCode" style="color: red; font-size: 12px;">
            {{ errors.discountCode }}
          </div>

          <div
            *ngIf="checkoutType === CheckoutType.DISTRIBUTOR"
            style="font-size: 12px; color: #666;"
          >
            Required. Valid codes: DIST2024, WHOLESALE, PARTNER
          </div>

          <div
            *ngIf="checkoutType === CheckoutType.RESELLER"
            style="font-size: 12px; color: #666;"
          >
            Optional. Valid codes: SAVE10, WELCOME, RETURN
          </div>
        </div>

        <button
          type="submit"
          [style.background-color]="'#007bff'"
          [style.color]="'white'"
          [style.padding]="'10px 20px'"
          [style.border]="'none'"
          [style.border-radius]="'4px'"
          [style.cursor]="'pointer'"
        >
          Next Step
        </button>
      </form>
    </div>
  `,
})
export class CheckoutFormComponent {
  @Input() checkoutType!: CheckoutType;
  @Output() submitForm = new EventEmitter<CustomerInfo>();
  @Output() nextStep = new EventEmitter<void>();

  CheckoutType = CheckoutType; // Make enum available in template

  customerInfo: CustomerInfo = {
    name: "",
    email: "",
    company: "",
    discountCode: "",
  };

  errors: FormErrors = {};

  validateForm(): boolean {
    const newErrors: FormErrors = {};

    // Basic validation
    if (!this.customerInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!this.customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.customerInfo.email)) {
      newErrors.email = "Email is invalid";
    }

    // Reseller validation (original simple logic)
    if (this.checkoutType === CheckoutType.RESELLER) {
      if (
        this.customerInfo.discountCode &&
        this.customerInfo.discountCode.trim()
      ) {
        const validResellerCodes = ["SAVE10", "WELCOME", "RETURN"];
        if (!validResellerCodes.includes(this.customerInfo.discountCode)) {
          newErrors.discountCode = "Invalid reseller discount code";
        }
      }
    }

    // Distributor validation (has grown complex over time with many feature requests)
    if (this.checkoutType === CheckoutType.DISTRIBUTOR) {
      // Company is required for distributors
      if (!this.customerInfo.company?.trim()) {
        newErrors.company = "Company name is required for wholesale accounts";
      }

      // Discount code is mandatory for distributors
      if (!this.customerInfo.discountCode?.trim()) {
        newErrors.discountCode = "Distributor discount code is required";
      } else {
        const validDistributorCodes = ["DIST2024", "WHOLESALE", "PARTNER"];
        if (!validDistributorCodes.includes(this.customerInfo.discountCode)) {
          newErrors.discountCode = "Invalid distributor code";
        }

        // FEATURE REQUEST 1: Partners need special company name validation
        if (this.customerInfo.discountCode === "PARTNER") {
          if (!this.customerInfo.company?.toLowerCase().includes("partner")) {
            newErrors.company =
              "Partner discount requires 'Partner' in company name";
          }
        }

        // FEATURE REQUEST 2: Wholesale accounts need minimum company name length
        if (this.customerInfo.discountCode === "WHOLESALE") {
          if (
            this.customerInfo.company &&
            this.customerInfo.company.length < 5
          ) {
            newErrors.company =
              "Wholesale accounts require full company name (min 5 characters)";
          }
        }
      }

      // FEATURE REQUEST 3: Distributors with certain codes need email domain validation
      if (
        this.customerInfo.discountCode === "PARTNER" ||
        this.customerInfo.discountCode === "WHOLESALE"
      ) {
        if (
          this.customerInfo.email.includes("@gmail.com") ||
          this.customerInfo.email.includes("@yahoo.com")
        ) {
          newErrors.email =
            "Business distributors must use corporate email addresses";
        }
      }
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();

    if (this.validateForm()) {
      this.submitForm.emit(this.customerInfo);
      this.nextStep.emit();
    }
  }

  clearError(field: keyof FormErrors): void {
    if (this.errors[field]) {
      this.errors = { ...this.errors, [field]: undefined };
    }
  }
}
