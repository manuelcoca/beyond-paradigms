# Beyond Paradigms - Hands-On Workshop

A practical workshop exploring universal software design principles through hands-on exercises across multiple programming paradigms and languages.

## Workshop Philosophy

This workshop should demonstrates that good software design principles transcend programming paradigms. Whether you're writing object-oriented C#, functional Go, or component-based React - the fundamental challenges of managing complexity, shared state, and dependencies remain the same.

## Workshop Structure

### Exercise 0: Paradigm Comparison

**Languages:** Go, C#  
**Focus:** Understanding how different paradigms approach the same problem  
Compare procedural vs. object-oriented and imperative vs. functional approaches to identical business logic.

### Exercise 1: Beyond Paradigms

**Languages:** Go, C#, React, Angular  
**Focus:** The four pillars of OOP work everywhere  
Explore how abstraction, encapsulation, polymorphism, and composition are implemented across different paradigms and technologies.

### Exercise 2: Clean Code & Abstraction Patterns

**Languages:** Go, C#  
**Focus:** When abstraction helps vs. hurts  
Examine highly structured, principle-driven code and evaluate trade-offs in code organization, testing complexity, and maintainability.

### Exercise 3: Shared State Issues

**Languages:** Go, C#  
**Focus:** Why OOP doesn't solve the fundamental problem  
Compare pure functional approaches with shared mutable state to understand why "non-determinism = parallel processing + mutable state".

### Exercise 4: Dependency Management

**Languages:** React, Angular  
**Focus:** Real-world component coupling problems  
Work with an e-commerce checkout system that demonstrates how shared components evolve into dependency nightmares.

### Exercise 5: Error Handling

**Languages:** Go, C#  
**Focus:** 90% of software failures come from bad error handling  
Fix a crashing API by implementing proper error handling patterns that work across paradigms.

## Quick Start

### GitHub Codespaces (Recommended)

1. Click "Code" → "Create codespace on main"
2. Navigate to `workshop-exercises/` and choose an exercise
3. Follow each exercise's README for specific instructions

### Local Development

**Requirements:** Node.js 18+, .NET 8.0, Go 1.21+

```bash
git clone <repository-url>
cd beyond-paradigms/workshop-exercises
# Choose an exercise (00-paradigm-comparison, 01-beyond-paradigms, etc.)
# Follow the README in each exercise directory
```

## Learning Outcomes

By completing this workshop, you'll understand:

- **Universal Design Principles**: Why good design transcends programming paradigms
- **Shared State Problems**: The root cause of most software complexity
- **Dependency Management**: How feature coupling destroys maintainability
- **Error Handling**: Why proper error handling is critical across all languages
- **Abstraction Trade-offs**: When clean code principles help vs. hurt
- **Cross-Paradigm Patterns**: How the same solutions work in different contexts

## 💡 Key Takeaways

- **Same Problems Everywhere**: Every paradigm struggles with complexity, state, and dependencies
- **Same Solutions Work**: Separation of concerns, immutability, and proper error handling work universally
- **Context Matters**: Choose tools based on problem requirements, not paradigm marketing
- **Simplicity Wins**: "As simple as possible, but no simpler" applies to all code

---

_This workshop is designed for developers who want to move beyond paradigm wars and focus on what actually makes software maintainable, regardless of the language or framework used._
