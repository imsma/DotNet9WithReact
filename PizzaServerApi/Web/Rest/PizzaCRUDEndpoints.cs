using System;
using Microsoft.EntityFrameworkCore;
using PizzaServerApi.Db;
using PizzaServerApi.Dto;
using PizzaServerApi.Models;

namespace PizzaServerApi.Web.Rest;

public static class PizzaCRUDEndpoints
{
    private static string _api_base_path => "api/v1/pizzas";

    public static void MapPizzaCRUDEndpoints(this IEndpointRouteBuilder endpoints ) {
        endpoints.MapGet($"{_api_base_path}", GetAllPizzas);
        endpoints.MapGet($"{_api_base_path}/{{id:int}}", GetPizzaById);
        endpoints.MapPost($"{_api_base_path}", CreatePizza);
        endpoints.MapPut($"{_api_base_path}/{{id:int}}", UpdatePizza);
        endpoints.MapDelete($"{_api_base_path}/{{id:int}}", DeletePizza);
    }    

    private static async Task<IResult> GetAllPizzas(PizzaDb db)
    {
        var pizzas = await db.Pizzas.ToListAsync();
        return Results.Ok(pizzas);
    }

    private static async Task<IResult> GetPizzaById(PizzaDb db, int id)
    {
        var pizza = await db.Pizzas.FindAsync(id);
        if (pizza == null) return Results.NotFound();
        return Results.Ok(pizza);
    }

    private static async Task<IResult> CreatePizza(PizzaDb db, PizzaDto pizzaDto)
    {
        var pizza = new Pizza {
            Name = pizzaDto.Name,
            Description = pizzaDto.Description
        };
        
        db.Pizzas.Add(pizza);
        await db.SaveChangesAsync();
        return Results.Created($"/{_api_base_path}/{pizza.Id}", pizza);
    }

    private static async Task<IResult> UpdatePizza(PizzaDb db, int id, Pizza pizza)
    {
        if (id != pizza.Id) return Results.BadRequest();
        db.Entry(pizza).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return Results.Ok(pizza);
    }

    private static async Task<IResult> DeletePizza(PizzaDb db, int id)
    {
        var pizza = await db.Pizzas.FindAsync(id);
        if (pizza == null) return Results.NotFound();
        db.Pizzas.Remove(pizza);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }    
}
