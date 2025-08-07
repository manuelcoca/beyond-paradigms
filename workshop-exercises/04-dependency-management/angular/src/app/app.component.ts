import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { DistributorCheckoutComponent } from "./components/distributor/distributor-checkout.component";
import { ResellerCheckoutComponent } from "./components/reseller/reseller-checkout.component";

// =============================================================================
// CHECKOUT SYSTEM DEMO APP
// =============================================================================

type ViewType = "home" | "reseller" | "distributor";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    ResellerCheckoutComponent,
    DistributorCheckoutComponent,
  ],
  template: `
    <div>
      <div
        *ngIf="currentView !== 'home'"
        style="padding: 10px; background-color: #343a40;"
      >
        <button
          (click)="setCurrentView('home')"
          [style.background-color]="'#6c757d'"
          [style.color]="'white'"
          [style.padding]="'8px 16px'"
          [style.border]="'none'"
          [style.border-radius]="'4px'"
          [style.cursor]="'pointer'"
        >
          ← Back to Home
        </button>
      </div>

      <!-- Home View -->
      <div
        *ngIf="currentView === 'home'"
        style="padding: 40px; text-align: center;"
      >
        <h1>🛒 E-Commerce Checkout System</h1>
        <h2>Multi-Customer Platform</h2>

        <div
          style="
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        "
        >
          <h3>🏪 Two Customer Types</h3>
          <p>
            Our platform serves both <strong>Resellers</strong> (retail
            customers) and <strong>Distributors</strong> (wholesale business
            customers) with different checkout processes.
          </p>

          <h4>Current Features:</h4>
          <ul>
            <li>
              <strong>Reseller Checkout:</strong> Simple retail customer flow
            </li>
            <li>
              <strong>Distributor Checkout:</strong> Wholesale business flow
            </li>
            <li>Both use shared form components for consistency</li>
          </ul>
        </div>

        <div
          style="
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        "
        >
          <button
            (click)="setCurrentView('reseller')"
            [style.background-color]="'#007bff'"
            [style.color]="'white'"
            [style.padding]="'15px 30px'"
            [style.border]="'none'"
            [style.border-radius]="'8px'"
            [style.cursor]="'pointer'"
            [style.font-size]="'16px'"
          >
            🏪 Reseller Checkout
            <div style="font-size: 12px; margin-top: 5px;">
              Retail customers
            </div>
          </button>

          <button
            (click)="setCurrentView('distributor')"
            [style.background-color]="'#28a745'"
            [style.color]="'white'"
            [style.padding]="'15px 30px'"
            [style.border]="'none'"
            [style.border-radius]="'8px'"
            [style.cursor]="'pointer'"
            [style.font-size]="'16px'"
          >
            🏭 Distributor Checkout
            <div style="font-size: 12px; margin-top: 5px;">
              Wholesale businesses
            </div>
          </button>
        </div>
      </div>

      <!-- Reseller View -->
      <app-reseller-checkout
        *ngIf="currentView === 'reseller'"
      ></app-reseller-checkout>

      <!-- Distributor View -->
      <app-distributor-checkout
        *ngIf="currentView === 'distributor'"
      ></app-distributor-checkout>
    </div>
  `,
})
export class AppComponent {
  currentView: ViewType = "home";

  setCurrentView(view: ViewType): void {
    this.currentView = view;
  }
}
