import React from "react";
import { OrderService } from "./components/OrderService";

// =============================================================================
// DEMONSTRATION: Four Pillars of OOP in React + TypeScript
// =============================================================================

const App: React.FC = () => {
  return (
    <div>
      <h1>React + TypeScript OOP Demo</h1>
      <OrderService />
    </div>
  );
};

export default App;
