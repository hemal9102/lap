# Backend Architecture (MVC)

The NextTop backend is built with Node.js, Express, and Prisma ORM using a strict MVC pattern.

## Directory Structure
```
backend/
├── controllers/          # Business logic (Controllers)
│   ├── adminController.js
│   ├── laptopController.js
│   └── leadController.js
├── routes/               # Express routing (Routes)
│   ├── adminRoutes.js
│   ├── laptopRoutes.js
│   └── leadRoutes.js
├── prisma/               # Database Models (Models)
│   ├── schema.prisma     # Defines Laptop, Lead, Brand, Category
│   └── database.sqlite
└── server.js             # App entry point (Only wiring up routes)
```

## API Flow
1. **Request** hits `server.js` (e.g., `GET /api/laptops`)
2. `server.js` routes to `routes/laptopRoutes.js`
3. `laptopRoutes.js` calls `laptopController.getLaptops()`
4. `laptopController.js` queries SQLite via Prisma Client (`prisma.laptop.findMany()`)
5. The JSON response is sent back to the client.
