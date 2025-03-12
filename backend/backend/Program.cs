using backend;
using backend.Initializer;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Repositories;
using backend.Services;
using DotNetEnv;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// enviorment
var enviorment = builder.Environment.EnvironmentName;

// connection
var connection = enviorment == Environments.Production
    ? Environment.GetEnvironmentVariable("DATABASE_URL")
    : builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connection));

if (FirebaseApp.DefaultInstance == null)
{
    FirebaseApp.Create(new AppOptions
    {
        Credential = GoogleCredential.FromFile("firebase-key.json")
    });
}

builder.Services.AddSingleton(FirebaseAuth.DefaultInstance);

// Firebase JWT token verification
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var firebaseProjectId = builder.Configuration["Authentication:Audience"];
        options.Authority = $"https://securetoken.google.com/{firebaseProjectId}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = $"https://securetoken.google.com/{firebaseProjectId}",
            ValidateAudience = true,
            ValidAudience = firebaseProjectId,
            ValidateLifetime = true,
        };
    });

// Add services to the container.
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ITripInterface, TripRepository>();
builder.Services.AddScoped<ITripService, TripService>();

builder.Services.AddScoped<FirebaseService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserInterface, UserRepository>();

builder.Services.AddScoped<IActivityInterface, ActivityRepository>();
builder.Services.AddScoped<IActivityService, ActivityService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Add a JWT-token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.WithOrigins("http://localhost:5173", "https://voyage-eight.vercel.app");
    //options.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();

    DbInitializer.Initialize(context);
}

app.Run();
