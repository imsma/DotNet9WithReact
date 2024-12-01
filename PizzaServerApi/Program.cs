using Microsoft.OpenApi.Models;
using PizzaServerApi.Db;
using PizzaServerApi.Web.Rest;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PizzaDb") ?? "Data Source=pizza.db";
builder.Services.AddSqlite<PizzaDb>(connectionString);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup => {
    setup.SwaggerDoc("v1", new OpenApiInfo{
        Title = "Pizza API",
        Version = "v1",
        Description = "A simple API to manage pizzas"
    });
});

string AllowedOriginsPolicy = "AllowedOriginsPolicy";
builder.Services.AddCors(options => {
    options.AddPolicy(name: AllowedOriginsPolicy,
        builder => {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(setup => {
        setup.SwaggerEndpoint("/swagger/v1/swagger.json", "Pizza API v1");
    });
}

app.UseCors(AllowedOriginsPolicy);

app.MapGet("/", () => "Pizza Server v1");
app.MapPizzaCRUDEndpoints();

app.Run();
