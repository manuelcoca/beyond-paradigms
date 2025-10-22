# Workshop Exercise 5: Error Handling

## Objective

Learn about **proper error handling** by fixing a simple API endpoint that crashes with certain inputs.

> **"90% of all software failures come from bad error handling"**

## The Problem

You have a simple Go API with **bad error handling** that:

- **Panics and crashes** with invalid input
- **Returns confusing responses** for missing users
- **Gives no proper error messages** to help users

## The API

**Single endpoint**: `GET /user?id=X`

**Available in both Go and C#** - choose your preferred language!

**Current behavior:**

- `GET /user?id=1` → ✅ Works: `{"id": 1, "name": "Alice"}`
- `GET /user?id=invalid` → 💥 **CRASHES THE SERVER**
- `GET /user?id=-1` → 💥 **CRASHES THE SERVER**
- `GET /user?id=9999` → 💥 **CRASHES THE SERVER**
- `GET /user?id=999` → ⚠️ Confusing: `{"id": 999, "name": ""}`

## Workshop Tasks

### Task 1: Test the API

**Choose your language:**

**Go:**

```bash
cd go
go run main.go
```

**C#:**

```bash
cd csharp
dotnet run
```

**Test different scenarios:**

**Go (port 8080):**

```bash
curl "http://localhost:8080/user?id=1"
curl "http://localhost:8080/user?id=invalid"
curl "http://localhost:8080/user?id=-1"
curl "http://localhost:8080/user?id=9999"
curl "http://localhost:8080/user?id=999"
curl "http://localhost:8080/user"
```

**C# (port 5000):**

```bash
curl "http://localhost:5000/user?id=1"
curl "http://localhost:5000/user?id=invalid"
curl "http://localhost:5000/user?id=-1"
curl "http://localhost:5000/user?id=9999"
curl "http://localhost:5000/user?id=999"
curl "http://localhost:5000/user"
```

**Questions:**

- Which requests work as expected?
- Which requests cause problems?

### Task 2: Run the Tests

**Go:**

```bash
cd go
go test
```

**C#:**

```bash
cd csharp
dotnet test
```

**Questions:**

- What do the failing tests expect?
- What HTTP status codes should be returned?

### Task 3: Fix the Handler

**Your mission**: Modify the endpoint handler so that:

- All tests pass
- The API never crashes
- Proper HTTP status codes are returned
- Clear error messages are provided

### Task 4: Verify

**Run tests:**

**Go:**

```bash
cd go
go test
```

**C#:**

```bash
cd csharp
dotnet test
```

**Test the API again:**

**Go:**

```bash
curl "http://localhost:8080/user?id=1"
curl "http://localhost:8080/user?id=invalid"
curl "http://localhost:8080/user?id=-1"
curl "http://localhost:8080/user?id=9999"
curl "http://localhost:8080/user?id=999"
curl "http://localhost:8080/user"
```

**C#:**

```bash
curl "http://localhost:5000/user?id=1"
curl "http://localhost:5000/user?id=invalid"
curl "http://localhost:5000/user?id=-1"
curl "http://localhost:5000/user?id=9999"
curl "http://localhost:5000/user?id=999"
curl "http://localhost:5000/user"
```

## Quick Commands

**Go:**

```bash
# Start server
cd go && go run main.go

# Run tests
cd go && go test

# Test with curl
curl "http://localhost:8080/user?id=1"
```

**C#:**

```bash
# Start server
cd csharp && dotnet run

# Run tests
cd csharp && dotnet test

# Test with curl
curl "http://localhost:5000/user?id=1"
```

## Key Learning Points

Good error handling means:

1. **Never ignore errors** - Handle every `error` return value
2. **Validate input early** - Check parameters before processing
3. **Return proper status codes** - 400, 404, 500, etc.
4. **Provide clear messages** - Help users understand what went wrong
5. **Never panic in production** - Use `return` instead of `panic`

## The Bottom Line

> **"90% of all software failures come from bad error handling"**
