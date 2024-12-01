using System;
using Microsoft.EntityFrameworkCore;
using PizzaServerApi.Models;

namespace PizzaServerApi.Db;

public class PizzaDb : DbContext
{
    public PizzaDb(DbContextOptions<PizzaDb> options) : base(options) {}
    public DbSet<Pizza> Pizzas { get; set; } = null!;
}
