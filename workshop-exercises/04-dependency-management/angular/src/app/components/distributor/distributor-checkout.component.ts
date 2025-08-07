import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { CheckoutData, CheckoutType, CustomerInfo } from "../../types/checkout";
import { CheckoutFormComponent } from "../shared/checkout-form.component";

// =============================================================================
// DISTRIBUTOR CHECKOUT FEATURE
// =============================================================================

@Component({
  selector: "app-distributor-checkout",
  standalone: true,
  imports: [CommonModule, CheckoutFormComponent],
  template: `
    <div style="padding: 20px;">
      <div *ngIf="step === 1">
        <app-checkout-form
          [checkoutType]="CheckoutType.DISTRIBUTOR"
          (submitForm)="handleStep1Submit($event)"
          (nextStep)="nextStep()"
        ></app-checkout-form>
      </div>

      <div *ngIf="step === 2">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2>🏭 Distributor Wholesale Order Summary</h2>

          <div
            style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;"
          >
            <h3>Business Customer Information</h3>
            <p>
              <strong>Contact Name:</strong> {{ checkoutData.customer.name }}
            </p>
            <p>
              <strong>Business Email:</strong> {{ checkoutData.customer.email }}
            </p>
            <p><strong>Company:</strong> {{ checkoutData.customer.company }}</p>
            <p>
              <strong>Distributor Code:</strong>
              {{ checkoutData.customer.discountCode }}
            </p>
          </div>

          <div
            style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;"
          >
            <h3>Wholesale Order Details</h3>
            <div
              *ngFor="let product of checkoutData.products"
              style="display: flex; justify-content: space-between; margin-bottom: 10px;"
            >
              <span>{{ product.productId }} (x{{ product.quantity }})</span>
              <span>\${{ (product.price * product.quantity).toFixed(2) }}</span>
            </div>
            <hr />
            <div
              style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #28a745;"
            >
              <span>Wholesale Total:</span>
              <span>\${{ checkoutData.total.toFixed(2) }}</span>
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
              *Distributor pricing includes volume discounts
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
              Complete Wholesale Order
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="step === 3">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <h2>✅ Distributor Order Complete!</h2>
          <div
            style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0;"
          >
            <h3>Thank you, {{ checkoutData.customer.company }}!</h3>
            <p>
              Your wholesale distributor order has been processed successfully.
            </p>
            <p>
              <strong
                >Wholesale Total: \${{ checkoutData.total.toFixed(2) }}</strong
              >
            </p>
            <p>
              Business confirmation will be sent to
              {{ checkoutData.customer.email }}
            </p>
            <p>
              <strong>Distributor Account:</strong>
              {{ checkoutData.customer.discountCode }}
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
            Start New Wholesale Order
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DistributorCheckoutComponent {
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
      { productId: "BULK-001", quantity: 100, price: 15.99 },
      { productId: "BULK-002", quantity: 50, price: 25.99 },
      { productId: "BULK-003", quantity: 200, price: 8.99 },
    ],
    total: 0,
  };

  handleStep1Submit(customerInfo: CustomerInfo): void {
    // Calculate total with distributor wholesale pricing
    let total = this.checkoutData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    // Apply distributor wholesale discounts (much higher than reseller)
    if (customerInfo.discountCode) {
      switch (customerInfo.discountCode) {
        case "DIST2024":
          total *= 0.6; // 40% off - big wholesale discount
          break;
        case "WHOLESALE":
          total *= 0.65; // 35% off
          break;
        case "PARTNER":
          total *= 0.5; // 50% off for key partners
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
        { productId: "BULK-001", quantity: 100, price: 15.99 },
        { productId: "BULK-002", quantity: 50, price: 25.99 },
        { productId: "BULK-003", quantity: 200, price: 8.99 },
      ],
      total: 0,
    };
  }
}
