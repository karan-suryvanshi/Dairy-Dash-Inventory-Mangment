# DairyDash AI

DairyDash AI is a full-stack dairy catalog, storefront, and operations dashboard. It combines a React/Vite frontend with a Spring Boot REST API and a MySQL database.

## Features

- Manage product categories, products, and suppliers.
- Browse the customer storefront, add products to a cart, and complete the checkout flow.
- Track stock quantities for catalog products.
- Create purchase orders and update their status. Receiving an order adds its quantity to inventory.
- Add and remove warehouse locations.
- Maintain a team directory with role labels. Roles are not yet connected to login or permission enforcement.
- View summary reports from live database records and export the summary to CSV.

## Requirements

- Java 17 or newer
- Node.js and npm
- MySQL 8

## Database setup

Create the database in MySQL:

```sql
CREATE DATABASE dairydash_ai;
```

Configure the backend with environment variables before starting it. For example, in PowerShell:

```powershell
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your-local-mysql-password"
```

Optional settings are `DB_URL` for the JDBC URL and `DB_USERNAME` for the database user. The application uses Hibernate schema updates for local development.

## Run the application

From this project directory, start the backend:

```powershell
cd backend
./mvnw.cmd spring-boot:run
```

In a second terminal, start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The backend listens on `http://localhost:8080`.

You can also run `start-project.bat` from this directory after setting the database environment variables in the same terminal session.

## Main API routes

- `/api/v1/categories`
- `/api/v1/products`
- `/api/v1/suppliers`
- `/api/v1/inventory`
- `/api/v1/purchase-orders`
- `/api/v1/warehouses`
- `/api/v1/team-members`
- `/api/v1/reports/summary`
- `/api/v1/health`
