# Workshop Exercise 1: Beyond Paradigms

## 🎯 Objective

Understand that the four pillars of OOP (abstraction, polymorphism, encapsulation, composition) are **proven concepts for good software design available in almost every language today** that can be implemented across paradigms and technologies.

### 💡 C Polymorphism Example

Polymorphism has existed in C since the 1970s. When you call `printf()`, the same function behaves differently based on the output device:

```c
printf("Hello");  // Could write to console, file, or network
// Internally uses function pointers in device driver tables
```

> _"The UNIX system call interface has been polymorphic from the very beginning. When you call `open`, `close`, `read`, or `write`, you are using polymorphic functions. The device drivers are selected at runtime based on the device type."_ — Robert C. Martin

## 📚 The Four Pillars Demonstrated

### 1. **Abstraction**

_Hiding implementation details behind interfaces_

- **Go**: `PaymentProcessor` and `NotificationSender` interfaces
- **C#**: Abstract classes and interfaces
- **React**: Component props and custom hooks
- **Angular**: Services and dependency injection

### 2. **Encapsulation**

_Bundling data with methods, controlling access_

- **Go**: Private struct fields (lowercase) + public methods
- **C#**: Private fields + public properties/methods
- **React**: Private component state + public props
- **Angular**: Private class members + public methods

### 3. **Polymorphism**

_Different types implementing the same interface_

- **Go**: `CreditCardProcessor` and `PayPalProcessor` both implement `PaymentProcessor`
- **C#**: Multiple classes implementing same interface
- **React**: Different components with same props interface
- **Angular**: Multiple services implementing same interface

### 4. **Composition**

_Building complex objects from simpler ones_

- **Go**: `OrderService` composed of `PaymentProcessor` + `NotificationSender`
- **C#**: Classes containing instances of other classes
- **React**: Components using other components
- **Angular**: Services injecting other services

## 🛠️ Workshop Tasks

### Task 1: Code Reading & Analysis (25 minutes)

**Individual Work**: Read and understand all four implementations:

1. **Go Backend** (`go/main.go`) - Interfaces + structs + methods
2. **C# Backend** (`csharp/Program.cs`) - Classes + interfaces + dependency injection
3. **React Frontend** (`react/src/App.tsx`) - Components + TypeScript interfaces
4. **Angular Frontend** (`angular/src/app/`) - Services + dependency injection + TypeScript

**Focus**: Compare how each paradigm implements the same business logic and OOP principles.

### Task 2: Cross-Paradigm Comparison (20 minutes)

**Group Discussion**:

Point out some differences between all 4 implementations.

1. What are the advantages and disadvantages of each approach? What you like more?
2. What are the trade-offs between explicit interfaces (TypeScript) vs. implicit interfaces (Go)?
3. How does dependency injection differ between Angular services and Go factory functions?
4. Which implementation feels most natural for the business domain? Why?

## 🔧 Running the Examples

### Go Backend (Procedural Paradigm):

```bash
cd go
go run main.go
```

### C# Backend (Object-Oriented Paradigm):

```bash
cd csharp
dotnet run
```

### React + TypeScript Frontend (Component-Based Paradigm):

```bash
cd react
npm install
npm start
```

### Angular + TypeScript Frontend (Service-Based Paradigm):

```bash
cd angular
npm install
npm start
```

## 💡 Key Insights

### The Universal Truth:

> **"Every paradigm is just a tool. They only differ in how state and functions are organized - but the fundamental design principles remain the same!"**

### What You Should Discover:

1. **Same Problems**: All paradigms need to organize state and behavior
2. **Same Solutions**: Abstraction, encapsulation, polymorphism, composition work everywhere
3. **Different Syntax**: The concepts are universal, the implementation varies
4. **Language Aesthetics Matter**: How easy it is to create abstractions and how readable the code is makes the real difference
5. **Root Problem**: Managing complexity through proper separation of concerns
