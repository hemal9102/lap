# NextTop Laptop Store - Comprehensive README

This document outlines the complete structure, function mappings, and imports of the NextTop Laptop Store project.

## 🔗 Project Connections & Flow

The project is divided into `backend` and `frontend`. 
The frontend communicates with the backend via REST API calls over HTTP.

### Backend (`H:\laptop\backend\`)
The backend is an Express application powered by Prisma ORM.

#### Core Dependencies & Tools:
- `express`, `cors`, `dotenv`
- `multer` (File upload management)
- `zod` (Request schema validation)
- `@prisma/client`, `prisma` (ORM mapped to local SQLite)

#### Data Structure (Prisma Schema):
- **Models:** `User`, `Category`, `Brand`, `Laptop`, `Lead`, `Page`, `Setting`, `Service`.
- **Database:** Local SQLite (`dev.db`).
- **Dynamic Specifications:** Handled via JSON strings in the `Laptop` model for complete flexibility.
- **Images:** Handled natively via `multer` storing physical files in `backend/uploads/` directory, while only lightweight URL paths are stored in the database to guarantee high performance and scalability.

#### API Endpoints:
- `GET /api/laptops`: Fetches all published laptops.
- `GET /api/laptops/:id`: Fetches a specific laptop.
- `GET /api/services`: Fetches all IT services.
- `GET /api/services/:slug`: Fetches a specific service.
- `GET /api/leads`: Fetches all incoming contact leads.
- `POST /api/leads`: Submits a new contact lead.

#### Admin API Endpoints (Protected by `x-admin-api-key` header):
- `GET /api/admin/stats`: Retrieves overall store statistics.
- `POST /api/admin/laptops`: Adds a new laptop to the database.
- `PUT /api/admin/laptops/:id`: Edits an existing laptop.
- `DELETE /api/admin/laptops/:id`: Deletes a laptop.
- `GET /api/admin/categories`: Fetches all categories with their associated laptop counts.
- `POST /api/admin/categories`: Adds a new category.
- `DELETE /api/admin/categories/:id`: Deletes a category.

---

### Frontend (`H:\laptop\frontend\`)
The frontend is a Next.js 16 application (App Router) styled with Tailwind CSS v4, Framer Motion, and a custom robust inline-style Glassmorphism UI.

#### Core Dependencies:
- `next`, `react`, `react-dom`, `tailwindcss`, `lucide-react`, `framer-motion`

#### Directory & Import Mapping:
**1. `src/app/` (Routing & Pages):**
- `layout.js`: Root structure. Imports `globals.css` (which configures Tailwind v4 and global theme variables).
- `page.js`: Now refactored as a Server Component for optimal SEO and performance, injecting JSON-LD schema for LocalBusiness. Includes the new Services section.
- `laptops/[id]/page.js`: Dynamic product page, fetches live data directly from the Express API (Server Component).
- `services/[slug]/page.js`: Dynamic service page, fetches live data directly from the Express API (Server Component).
- `/laptops`, `/admin`, `/contact`, `/about`, `/faq`: Sub-pages inheriting the main layout.
- `not-found.js`: A custom, ultra-premium glowing 404 page for non-existent routes.

**2. `src/components/` (UI):**
- `Header.jsx`, `Footer.jsx`: Thematic navigation elements utilizing glassmorphism, custom gradients, and fully WCAG AA compliant contrast ratios.
- `HomeClient.jsx`: The ultra-premium animated landing page using Framer Motion and inline styles.
- `LaptopsClient.jsx` & `LaptopCard.jsx`: Interactive client-side product catalog properly rendering fetched database joins.
- `AdminClient.jsx`: Complete Single-Page Application (SPA) dashboard containing Dashboard, Catalog, Leads, Categories, and Settings tabs. It natively handles image-to-Base64 conversions for local laptop photo uploads.

**3. `src/lib/` (Utilities):**
- `theme.js`: Contains central color palettes and global stylistic constants for the app.
