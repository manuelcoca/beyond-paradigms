# Workshop Exercise 3: Nature of Shared State Issue

## 🎯 Objective

Understand that OOP does not solve the most fundamental problem: **shared mutable state**. The only reliable way to avoid shared state issues is to eliminate shared state entirely, as demonstrated through pure functional programming in Go.

> **"non-determinism = parallel processing + mutable state"**  
> — Martin Odersky

## 📚 Workshop Tasks

### Task 1: Identify the Problems (15 minutes)

**Individual Work**: Run both implementations and observe the contrasting approaches:

1. **Go Version** (`go/main.go`) - **Pure Functional Approach**:

   ```bash
   cd go
   go run main.go
   ```

   - Run the program multiple times
   - What do you notice?

2. **C# Version** (`csharp/Program.cs`) - **OOP with Shared State**:
   ```bash
   cd csharp
   dotnet run
   ```
   - Run the program multiple times
   - What do you notice?

### Task 2: Code Analysis (10 minutes)

**Code Analysis** - Compare the two approaches:

**Go (Pure Functional)**:

1. **Find the "state"**: How is state handled without sharing?
2. **Trace the data flow**: How do functions pass state between each other?

**C# (Shared State)**:

1. **Find the shared state**: Where is the `SystemState` object referenced?
2. **Count the sharers**: How many objects access the same state?
3. **Trace the mutations**: Which methods modify shared collections/counters?
4. **Identify the race conditions**: Where do conflicts occur?

### Task 3: Compare Solutions (20 minutes)

**Group Discussion**: Compare the two paradigm approaches:

1. **Go's Approach**: Pure functions + Immutable state

   - What are the benefits of this approach?
   - What are the trade-offs or challenges?
   - Is this scalable for larger systems?

2. **C#'s Problem**: OOP + Shared mutable state

   - Why doesn't OOP encapsulation solve the problem?
   - How many different ways can objects interfere with each other?
   - What would be needed to fix the C# version?

3. **Universal Patterns**: What works regardless of paradigm?

## 🔧 Running the Examples

### Go Backend (Pure Functional - No Shared State):

```bash
cd go
go run main.go
```

**Expected Output**:

- ✅ Consistent results every time
- ✅ Predictable behavior
- ✅ No race conditions
- ✅ Clean, composable functions

### C# Backend (OOP with Shared State Problems):

```bash
cd csharp
dotnet run
```

**Expected Output**:

- ❌ Inconsistent counts and results
- ❌ Race condition warnings
- ❌ "INCONSISTENT STATE DETECTED!" messages
- ❌ Different behavior on each run

## 💡 Key Learning Points

### Common Symptoms:

1. **Inconsistent results** when running the same code
2. **Race conditions** that only appear under load
3. **State corruption** when multiple parts modify data
4. **Debugging nightmares** - bugs that disappear when you add logging
5. **Cascade failures** - one component's state affects unrelated components

### Solutions That Work Everywhere:

1. **Immutability**: Don't modify, create new
2. **Isolation**: Keep state local to components
3. **Single Source of Truth**: One place owns each piece of state
4. **Message Passing**: Communicate through events, not shared memory
5. **Pure Functions**: Same input = same output, no side effects

### Where You'll See This:

- **Web Applications**: Multiple components updating the same data
- **Databases**: Concurrent transactions modifying the same records
- **Microservices**: Services sharing data through APIs
- **Mobile Apps**: UI state synchronization

## The Bottom Line

> **"Make sure feature A does not affect feature B."**
