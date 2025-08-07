using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using Xunit;

namespace ErrorHandlingDemo.Tests;

public class ProgramTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ProgramTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task GetUser_ValidID()
    {
        var response = await _client.GetAsync("/user?id=1");
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("{\"id\": 1, \"name\": \"Alice\"}", content);
    }

    [Fact]
    public async Task GetUser_InvalidID_ShouldNotThrow()
    {
        var response = await _client.GetAsync("/user?id=invalid");
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetUser_NegativeID_ShouldNotThrow()
    {
        var response = await _client.GetAsync("/user?id=-1");
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetUser_LargeID_ShouldNotThrow()
    {
        var response = await _client.GetAsync("/user?id=9999");
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetUser_NotFound_ShouldReturn404()
    {
        var response = await _client.GetAsync("/user?id=999");
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetUser_MissingID_ShouldReturn400()
    {
        var response = await _client.GetAsync("/user");
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
