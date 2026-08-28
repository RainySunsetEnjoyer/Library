# ===============================
# 1. Build frontend
# ===============================
FROM node:22-alpine AS frontend
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/. ./
RUN npm run build \
    && test -f dist/library-app/browser/index.html

# ===============================
# 2. Build backend
# ===============================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
WORKDIR /backend

COPY backend/*.csproj ./
RUN dotnet restore

COPY backend/. ./
RUN dotnet publish -c Release -o /app

# ===============================
# 3 Runtime image
# ===============================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=frontend /frontend/dist/library-app/browser ./wwwroot
COPY --from=backend /app ./

EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]