# NextTop Architecture (System-Wide)

## Overview
NextTop is a full-stack web application designed for a premium laptop store. It uses a modern decoupled architecture:
- **Frontend**: Next.js 16 (App Router, Tailwind v4, Framer Motion)
- **Backend**: Node.js (Express, Prisma, SQLite)

## Component Relationships
```mermaid
graph TD
    Client[Browser / User / Screen Reader] -->|HTTP Requests| NextJS[Next.js Frontend :3000]
    NextJS -->|REST API Calls| Express[Express Backend :5000]
    
    subgraph Express Backend (MVC)
        Express --> Routes
        Routes --> Controllers
        Controllers --> Prisma[Prisma ORM]
    end
    
    subgraph Database
        Prisma --> SQLite[(SQLite DB)]
        SQLite --> Models[User, Laptop, Category, Brand, Lead]
    end
```

## System-Wide Flow
1. **Public Site (`/`, `/laptops`, `/contact`)**: Served by Next.js. Data is fetched directly from the Express Backend via standard Fetch API (`GET /api/laptops`). Contact form submissions generate new leads via (`POST /api/leads`). Non-existent paths gracefully fallback to a stylized `not-found.js` page.
2. **Admin Panel (`/admin`)**: Built as a client-side Single Page Application (SPA) leveraging state-based tabs to bypass full page reloads.
   - It performs live fetches for Dashboard Statistics, Catalog modifications, Leads checking, and Category additions.
   - The UI natively supports converting local image uploads into Base64 formats to securely POST to the backend.
3. **Database**: Prisma handles all schema mappings dynamically. Due to SQLite's limitations with complex data structures, features like Laptop Images and Hardware Specifications are safely stringified into JSON and parsed recursively upon fetching to the frontend.
