# Workshop Exercise 4: Dependency Management Problems

## Objective

Learn about **dependency management** in frontend applications by working with a real-world checkout system that serves multiple customer types.

## The Scenario: E-Commerce Checkout Platform

- **Reseller Checkout** - Simple retail customer flow (originally clean and simple)
- **Distributor Checkout** - Wholesale business customer flow (has grown complex over time)
- **Shared CheckoutForm** - One component serving both flows

### The Evolution Problem:

This codebase demonstrates what happens over time when a shared component serves multiple features. Initially both flows were simple, but the **Distributor checkout** has received many feature requests:

- Partners need special company name validation
- Wholesale accounts need minimum company name length
- Business distributors must use corporate email addresses

Each request seemed like "just a small change" to the shared component. But now the component has grown complex and hard to maintain.

## Workshop Tasks

### Task 1: Test the Current System (5 minutes)

Choose either between React or Angular.

**Run the React Application:**

```bash
cd react
npm install
npm start
```

or

```bash
cd angular
npm install
ng serve
```

**Try Different Scenarios**:

- Test Reseller Checkout
- Test Distributor Checkout:
  - Use discount code "PARTNER" with company "ABC Corp" - what happens?
  - Use discount code "WHOLESALE" with company "XYZ" - what error appears?
  - Try a gmail address with "PARTNER" code - what validation fires?

### Task 2: Analyze the Current Implementation

**Your Task**: Examine the current codebase and identify potential problems:

1. Study the Shared Component `src/components/shared/CheckoutForm.tsx`

2. Analyze the Dependencies and Business Logic

**Key Questions to Consider:**

- How would adding a new customer type (e.g., "Enterprise") affect the codebase?
- Are there any signs of tight coupling between features?

### Task 3: Discover the Complexity Problem

**Examine the Shared Component's Evolution:**

1. **Look at CheckoutForm.tsx**:

   - Notice the complex validation rules for distributors
   - See how distributor-specific business logic has accumulated

### Task 4: Design Better Solutions

Discuss in the Team:

- How could you structure this differently?
- How would you handle shared UI patterns without tight coupling?

## The Bottom Line

> **"Make sure feature A does not affect feature B."**

> **"Make sure bugs are easy to find, reproduce and fix."**
