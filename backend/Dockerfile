# Base image (runtime only)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8000
EXPOSE 8001

# Build image (includes SDK for compiling the app)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy everything and restore dependencies
COPY backend/. ./backend
WORKDIR /src/backend
RUN dotnet restore

# Build the app (instead of publish)
RUN dotnet build -c Release -o /app/build

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy built files instead of published files
COPY --from=build /app/build . 

# Ensure the secret file is linked before running the app
CMD ["/bin/sh", "-c", "[ ! -e /app/firebase-key.json ] && ln -s /etc/secrets/firebase-key.json /app/firebase-key.json; dotnet backend.dll"]

# Set environment variable for Production
ENV ASPNETCORE_ENVIRONMENT=Production
