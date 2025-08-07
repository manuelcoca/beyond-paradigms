import React, { useState } from "react";
import { DistributorCheckout } from "./components/distributor/DistributorCheckout";
import { ResellerCheckout } from "./components/reseller/ResellerCheckout";

// =============================================================================
// CHECKOUT SYSTEM DEMO APP
// =============================================================================

type ViewType = "home" | "reseller" | "distributor";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("home");

  const renderView = () => {
    switch (currentView) {
      case "reseller":
        return <ResellerCheckout />;
      case "distributor":
        return <DistributorCheckout />;
      default:
        return (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <h1>🛒 E-Commerce Checkout System</h1>
            <h2>Multi-Customer Platform</h2>

            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "left",
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "30px",
              }}
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
                  <strong>Reseller Checkout:</strong> Simple retail customer
                  flow
                </li>
                <li>
                  <strong>Distributor Checkout:</strong> Wholesale business flow
                </li>
                <li>Both use shared form components for consistency</li>
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setCurrentView("reseller")}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "15px 30px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🏪 Reseller Checkout
                <div style={{ fontSize: "12px", marginTop: "5px" }}>
                  Retail customers
                </div>
              </button>

              <button
                onClick={() => setCurrentView("distributor")}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "15px 30px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🏭 Distributor Checkout
                <div style={{ fontSize: "12px", marginTop: "5px" }}>
                  Wholesale businesses
                </div>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {currentView !== "home" && (
        <div style={{ padding: "10px", backgroundColor: "#343a40" }}>
          <button
            onClick={() => setCurrentView("home")}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>
        </div>
      )}

      {renderView()}
    </div>
  );
};

export default App;
