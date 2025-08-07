import { Component } from "@angular/core";
import { OrderComponent } from "./components/order.component";

// =============================================================================
// DEMONSTRATION: Four Pillars of OOP in Angular (Service-Based + Component Paradigm)
// =============================================================================

@Component({
  selector: "app-root",
  standalone: true,
  imports: [OrderComponent],
  template: `
    <div>
      <h1>Angular + TypeScript OOP Demo</h1>
      <app-order></app-order>
    </div>
  `,
})
export class AppComponent {
  title = "Angular OOP Demo";
}
