using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Simple user data
var users = new Dictionary<int, string>
{
    { 1, "Alice" },
    { 2, "Bob" },
    { 3, "Charlie" }
};

app.MapGet("/user", (HttpContext context) =>
{
    var idStr = context.Request.Query["id"].ToString();
    var id = int.Parse(idStr);
    
    if (id < 0)
    {
        throw new Exception("Negative IDs not allowed!");
    }
    
    if (id > 1000)
    {
        throw new Exception("ID too large!");
    }
    
    var name = users.ContainsKey(id) ? users[id] : "";
    return $"{{\"id\": {id}, \"name\": \"{name}\"}}";
});

Console.WriteLine("Server starting on :5000");
app.Run("http://localhost:5000");
