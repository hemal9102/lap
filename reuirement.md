# NextTop Laptop Store CMS - Full Scope & Requirements

## 🎯 Project Vision
A premium, sellable Laptop Store CMS targeted at local electronics clients (₹15k–50k value). The design and features are inspired by top platforms like Dell, HP, Lenovo, Asus, Apple, Croma, Reliance Digital, and Vijay Sales.

## 🛠️ Tech Stack
### Frontend
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Shadcn/UI

### Backend
- **Environment:** Node.js
- **Framework:** Express.js

### Database & Storage
- **Database:** PostgreSQL (Relational DB for structured CMS data)
- **Storage:** Cloudinary / S3 / Local (for product images & media)

### Authentication & Deployment
- **Auth:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend), Render / VPS (Backend)

---

## 🏗️ Website Architecture
### Public Website (Client-Facing)
- **Home (Landing)**
- **All Laptops**
- **Categories:** Gaming, Business, Student, Workstation
- **Laptop Details Page**
- **Brands**
- **Accessories**
- **Offers**
- **CMS Pages:** About, Services, Contact
- **404 Page**

### Admin Architecture (CMS Backend)
- **Admin Login**
- **Dashboard**
- **Laptop Management**
- **Category Management**
- **Brand Management**
- **Offer Management**
- **Pages (CMS Editor)**
- **Media Gallery**
- **SEO Panel**
- **Analytics / Leads**
- **Global Settings**

---

## 💻 Detailed Page Features

### Home Page
- Hero Banner
- Featured Brands (Slider)
- Featured Laptops (Grid/Carousel)
- Shop by Category
- Offers & Deals
- Latest Arrivals
- Why Choose Us
- Testimonials
- FAQ
- Global Footer

### Laptop Details Page
- Product Images Gallery
- Price & Offer Price
- Short Description
- Specifications (Tab/Table)
- Features
- Warranty & EMI Available info
- Accessories & Related Products
- **CTAs:** Enquiry Button, WhatsApp Integration, Share

---

## 🔐 Admin Dashboard Features

### Overview Dashboard
- Stats: Total Laptops, Categories, Brands, Visitors, Leads
- Quick Views: Popular Products, Recent Updates

### Laptop CRUD
- **Fields:** Name, Slug, Brand, Category, Price, Offer Price, Stock, Featured, Images, Description, Publish Status.
- **Dynamic Specification Builder:** Instead of raw HTML, the admin fills out a dynamic key-value form (Processor, RAM, Storage, GPU, Display, Battery, Weight, OS, Warranty).
- **Dedicated SEO Panel:** (per laptop) SEO Title, Meta Description, Keywords, Canonical, OG Image, Schema, Slug.

### Media & Image Upload
- Drag & Drop interface
- Auto Compress & WebP conversion
- Thumbnail generation
- Unified Gallery Store

### CMS Pages Editor
- Editable pages for: About, Services, Privacy, Terms, Contact, Return Policy

### Contact Leads
- Table capturing: Name, Phone, Email, Message, Interested Laptop, Date, Status (e.g., Open, Addressed).

### Settings
- General: Logo, Favicon.
- Contact Details: Phone, Email, WhatsApp, Business Hours, Google Maps, Social Media links.

---

## 🚀 Performance Targets
- **LCP (Largest Contentful Paint):** < 2 sec
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms
- **TTFB (Time to First Byte):** < 250ms

---

## 🔌 API Endpoints Needed
- Authentication
- Laptop CRUD
- Category CRUD
- Brand CRUD
- Lead CRUD
- Media Upload
- SEO updates
- Settings updates

---

## 🗄️ Database Tables (PostgreSQL)
1. `Users` (Admin/Staff)
2. `Brands`
3. `Categories`
4. `Laptops`
5. `Images` (Media references)
6. `Leads` (Contact inquiries)
7. `Pages` (Dynamic CMS content)
8. `Settings` (Global config)
9. `Testimonials`
10. `FAQs`
