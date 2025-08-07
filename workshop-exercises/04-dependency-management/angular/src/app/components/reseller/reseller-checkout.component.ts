import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CheckoutData, CheckoutType, CustomerInfo } from "../../types/checkout";
import { CheckoutFormComponent } from "../shared/checkout-form.component";

// =============================================================================
// RESELLER CHECKOUT FEATURE
// =============================================================================

@Component({
  selector: "app-reseller-checkout",
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent],
  template: `
    <div style="padding: 20px;">
      <div *ngIf="step === 1">
        <app-checkout-form
          [checkoutType]="CheckoutType.RESELLER"
          (submitForm)="handleStep1Submit($event)"
          (nextStep)="nextStep()"
        ></app-checkout-form>
      </div>

      <div *ngIf="step === 2">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2>🏪 Reseller Order Summary</h2>

          <div
            style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;"
          >
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {{ checkoutData.customer.name }}</p>
            <p><strong>Email:</strong> {{ checkoutData.customer.email }}</p>
            <p *ngIf="checkoutData.customer.company">
              <strong>Company:</strong> {{ checkoutData.customer.company }}
            </p>
            <p *ngIf="checkoutData.customer.discountCode">
              <strong>Discount Code:</strong>
              {{ checkoutData.customer.discountCode }}
            </p>
          </div>

          <div
            style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;"
          >
            <h3>Order Details</h3>
            <div
              *ngFor="let product of checkoutData.products"
              style="display: flex; justify-content: space-between; margin-bottom: 10px;"
            >
              <span>{{ product.productId }} (x{{ product.quantity }})</span>
              <span>\${{ (product.price * product.quantity).toFixed(2) }}</span>
            </div>
            <hr />
            <div
              style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;"
            >
              <span>Total:</span>
              <span>\${{ checkoutData.total.toFixed(2) }}</span>
            </div>
          </div>

          <div style="display: flex; gap: 20px;">
            <button
              (click)="goBack()"
              [style.background-color]="'#6c757d'"
              [style.color]="'white'"
              [style.padding]="'12px 24px'"
              [style.border]="'none'"
              [style.border-radius]="'4px'"
              [style.cursor]="'pointer'"
            >
              ← Back to Form
            </button>

            <button
              (click)="completeOrder()"
              [style.background-color]="'#28a745'"
              [style.color]="'white'"
              [style.padding]="'12px 24px'"
              [style.border]="'none'"
              [style.border-radius]="'4px'"
              [style.cursor]="'pointer'"
            >
              Complete Reseller Order
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="step === 3">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <h2>✅ Reseller Order Complete!</h2>
          <div
            style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0;"
          >
            <h3>Thank you, {{ checkoutData.customer.name }}!</h3>
            <p>Your reseller order has been processed successfully.</p>
            <p>
              <strong
                >Order Total: \${{ checkoutData.total.toFixed(2) }}</strong
              >
            </p>
            <p>
              You will receive a confirmation email at
              {{ checkoutData.customer.email }}
            </p>
          </div>

          <button
            (click)="startNewOrder()"
            [style.background-color]="'#007bff'"
            [style.color]="'white'"
            [style.padding]="'12px 24px'"
            [style.border]="'none'"
            [style.border-radius]="'4px'"
            [style.cursor]="'pointer'"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ResellerCheckoutComponent {
  CheckoutType = CheckoutType; // Make enum available in template

  step = 1;
  checkoutData: CheckoutData = {
    customer: {
      name: "",
      email: "",
      company: "",
      discountCode: "",
    },
    products: [
      { productId: "PROD-001", quantity: 2, price: 29.99 },
      { productId: "PROD-002", quantity: 1, price: 49.99 },
    ],
    total: 0,
  };

  handleStep1Submit(customerInfo: CustomerInfo): void {
    // Calculate total with reseller pricing
    let total = this.checkoutData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    // Apply reseller discount if provided
    if (customerInfo.discountCode) {
      switch (customerInfo.discountCode) {
        case "SAVE10":
          total *= 0.9; // 10% off
          break;
        case "WELCOME":
          total *= 0.95; // 5% off
          break;
        case "RETURN":
          total *= 0.85; // 15% off for returning customers
          break;
      }
    }

    this.checkoutData = {
      ...this.checkoutData,
      customer: customerInfo,
      total: total,
    };
  }

  nextStep(): void {
    this.step = 2;
  }

  goBack(): void {
    this.step = 1;
  }

  completeOrder(): void {
    this.step = 3;
  }

  startNewOrder(): void {
    this.step = 1;
    this.checkoutData = {
      customer: {
        name: "",
        email: "",
        company: "",
        discountCode: "",
      },
      products: [
        { productId: "PROD-001", quantity: 2, price: 29.99 },
        { productId: "PROD-002", quantity: 1, price: 49.99 },
      ],
      total: 0,
    };
  }
}
