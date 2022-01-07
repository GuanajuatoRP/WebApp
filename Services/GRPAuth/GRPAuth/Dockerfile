#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["GRPAuth/GRPAuth.csproj", "GRPAuth/"]
RUN dotnet restore "GRPAuth/GRPAuth.csproj"
COPY . .
WORKDIR "/src/GRPAuth"
RUN dotnet build "GRPAuth.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GRPAuth.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GRPAuth.dll"]