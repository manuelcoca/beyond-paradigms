# Workshop Exercise 2: Clean Code & Abstraction Patterns

## Objective

Explore different approaches to code organization and abstraction. Compare highly structured, principle-driven code with more direct implementations to understand the trade-offs and form your own opinions about when each approach works best.

## What You'll Explore

### The Approach:

> "Every function should do one thing and do it well. Make functions as small as possible. Create clear abstractions for every responsibility."

### Your Mission:

Examine implementations that follow strict clean code principles and evaluate:

- **Code navigation**: How easy is it to follow the logic?
- **Testing requirements**: What's needed to test the functionality?
- **Maintenance considerations**: How would changes be implemented?
- **Team collaboration**: How would new developers understand this code?

## Workshop Tasks

### Task 1: Code Reading & Analysis

**Individual Work**: Navigate through both codebases and understand what they do:

1. **Go Backend** (`go/`): Find the main business logic
2. **C# Backend** (`csharp/`): Trace through the order processing flow
3. **Observe**: Note your experience navigating the code structure
4. **Document**: What did you notice about the organization?

### Task 2: Testing Experience

**Hands-On Challenge**:

Your goal: **Make the PayPal processor charge a 4.0% fee instead of 3.49%**

1. **Find the test** that verifies PayPal's fee calculation for a $100 order
   - Navigate through the test files to locate the specific test
   - The test should expect "$103.49" as the total
2. **Update the test** to expect the new total with 4.0% fee

   - Calculate: $100 + 4.0% fee = $104.00
   - Change the expected value from "103.49" to "104.00"

3. **Run the test** - it should fail (showing the mismatch)

4. **Find and fix the implementation**

   - Locate the PayPal processor implementation
   - Change the fee from 3.49% to 4.0%

5. **Run the test again** - it should now pass

### Task 3: Reflection & Discussion

**Group Discussion**:

- What was your experience navigating the code?
- Which parts felt helpful vs. confusing?
- How would you approach writing similar functionality?
- What trade-offs did you observe?

## Running the Examples

### Go Backend:

```bash
cd go
go mod tidy
go run main.go
```

### C# Backend:

```bash
cd csharp
dotnet restore
dotnet run
```

## Running the Tests

### Go Tests:

```bash
cd go
go test ./application -v
```

### C# Tests:

```bash
cd csharp
dotnet test
```

## Key Takeaway

> **"Make sure bugs are easy to find, reproduce and fix."**
