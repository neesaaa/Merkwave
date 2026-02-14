FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy all project files for restore
COPY backend/backend.csproj backend/
COPY BusinessLogiclayer/BusinessLogiclayer.csproj BusinessLogiclayer/
COPY Infrastructure/Infrastructure.csproj Infrastructure/

# Restore
RUN dotnet restore "backend/backend.csproj"

# Copy everything and build
COPY . .
WORKDIR "/src/backend"
RUN dotnet build "backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Create wwwroot for file uploads
RUN mkdir -p /app/wwwroot

ENTRYPOINT ["dotnet", "backend.dll"]