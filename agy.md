# Laptop Informational Website & Admin Dashboard Project Skeleton

## 1. Project Overview & Tech Stack
- **Frontend**: Next.js (React) for fast rendering and SEO.
- **Backend**: Node.js (Express or NestJS) for robust API handling.
- **Styling & Animations**: Vanilla CSS / CSS Modules (prioritizing rich aesthetics, modern typography, glassmorphism, and smooth micro-animations).
- **Performance Targets**: 
  - Largest Contentful Paint (LCP): **< 2.0 seconds**
  - Server Load Time: **< 250 ms**
  - API Syncing / Response Time: **< 250 ms**

## 2. Common UI Components
- **Header**: Responsive navigation with dynamic styling.
- **Footer**: Comprehensive site links, social media integration, and branding.
- **Hero / Main Image Description**: High-quality imagery with engaging, dynamic descriptions.
- **Details Section**: Reusable components for laptop specifications and features.
- **404 Page**: Custom, branded, and animated error page.

## 3. Public Website Structure (5-7 Pages)
1. **Home (`/`)**: Hero section (Main image description), featured laptops, dynamic UI.
2. **Catalog / Laptops (`/laptops`)**: Grid view of all laptops with smooth filtering.
3. **Laptop Details (`/laptops/[id]`)**: In-depth details, specs, main image gallery, and descriptions.
4. **About Us (`/about`)**: Company story, mission, and premium design presentation.
5. **Contact / Support (`/contact`)**: Support forms and contact details.
6. **FAQ (`/faq`)**: Common questions.
7. **Terms & Privacy (`/legal`)**: Informational legal pages.

## 4. Admin Dashboard Structure (5 Pages)
1. **Dashboard Home (`/admin`)**: Analytics, recent activity, and quick stats.
2. **Push / Add Laptop (`/admin/laptops/new`)**: Interface to upload main images, descriptions, and spec details.
3. **Manage Laptops (`/admin/laptops`)**: Data table to view, edit, and delete existing inventory.
4. **Media / Assets (`/admin/media`)**: Manage main images and other visual assets.
5. **Settings (`/admin/settings`)**: Admin profile and site configuration.

## 5. Backend Architecture (Node.js)
- **RESTful API**: Fast, optimized endpoints.
  - `GET /api/laptops` (with Redis caching for < 250ms response)
  - `GET /api/laptops/:id`
  - `POST /api/laptops` (Admin push)
  - `PUT /api/laptops/:id` (Admin update)
  - `DELETE /api/laptops/:id` (Admin delete)
- **Database**: PostgreSQL or MongoDB (indexed appropriately for fast reads).
- **Optimization**: Use connection pooling and caching layers to guarantee sub-250ms server load and API sync.

## 6. Implementation Plan & Next Steps
1. **Phase 1: Setup**: Initialize Next.js and Node.js repositories. Establish global CSS design tokens (colors, typography, smooth transitions).
2. **Phase 2: Backend**: Build the database schema and fast API endpoints.
3. **Phase 3: Frontend Foundations**: Build the Header, Footer, and core UI components.
4. **Phase 4: Public Pages**: Implement the 5-7 informational pages with premium aesthetics.
5. **Phase 5: Admin Dashboard**: Build the 5 admin pages, ensuring the "push laptop" functionality works flawlessly.
6. **Phase 6: Polish & Performance**: Audit LCP, animate transitions, and load test the API to ensure 250ms targets are met.
