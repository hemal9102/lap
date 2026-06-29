# Backend Architecture (MVC)

The NextTop backend is built with Node.js, Express, and Prisma ORM using a strict MVC pattern.

## Directory Structure
```
├── middlewares/
│   ├── upload.js         # Multer configuration for image uploads
│   └── validate.js       # Zod validation schemas
├── controllers/          # Business logic (Controllers)
│   ├── adminController.js
│   ├── laptopController.js
│   ├── leadController.js
│   └── serviceController.js
├── routes/               # Express routing (Routes)
│   ├── adminRoutes.js
│   ├── laptopRoutes.js
│   ├── leadRoutes.js
│   └── serviceRoutes.js
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

## Security & Reliability
- **Validation**: Incoming requests (`POST /api/admin/*`) are heavily validated using `Zod` schemas in `validate.js` to prevent NoSQL/SQL injections and memory bloat.
- **File Uploads**: Admin images are handled via `multer` (multipart/form-data) in `upload.js`. Images are saved securely to `/uploads` on the disk, and only the URL is stored in SQLite. This prevents Base64 database bloat.
- **Authentication**: `GET` routes (`/api/laptops`, `/api/services`, `/api/leads`) are public.
- `adminRoutes` (e.g., `POST /api/admin/laptops`) are protected in `server.js` using a custom `adminAuth` middleware that checks for the `x-admin-api-key` header against the `ADMIN_API_KEY` environment variable.
