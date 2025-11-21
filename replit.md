# Pure Harvest - Dairy & Condiments E-Commerce Platform

## Overview

Pure Harvest is a modern e-commerce platform specializing in premium dairy products (ghee, curd, milk) and artisanal condiments (mustard oil, peanut butter). The application features a customer-facing storefront for browsing and purchasing products, along with an administrative dashboard for managing inventory and orders. Built with a full-stack TypeScript architecture, the platform emphasizes a dark theme with yellow accent colors to create a distinctive brand identity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server. The application implements client-side routing via Wouter for lightweight navigation without full page reloads.

**UI Component System**: Built on shadcn/ui (New York variant) with Radix UI primitives, providing accessible and customizable components. The design system uses Tailwind CSS for styling with a custom theme configuration emphasizing dark backgrounds and yellow primary colors.

**State Management**: React Query (@tanstack/react-query) handles server state, API data fetching, caching, and synchronization. Local state uses React hooks, with cart data persisted to localStorage for session continuity.

**Form Handling**: React Hook Form with Zod schema validation ensures type-safe form inputs and error handling.

**Design Philosophy**: Following modern e-commerce patterns inspired by Shopify, with emphasis on product photography, clear CTAs, and intuitive navigation. Typography uses Inter for body text and Poppins for headings.

### Backend Architecture

**Runtime**: Node.js with Express.js framework providing RESTful API endpoints.

**Development vs Production**: Separate entry points (index-dev.ts and index-prod.ts) handle different build configurations. Development mode integrates Vite middleware for hot module replacement, while production serves pre-built static assets.

**API Design**: RESTful endpoints under `/api/*` namespace for products and orders with standard CRUD operations. JSON request/response format with proper HTTP status codes and error handling.

**Storage Abstraction**: IStorage interface pattern allows switching between in-memory storage (current implementation with MemStorage class) and database implementations without changing application logic. Currently seeded with sample product data.

### Data Storage Solutions

**Database ORM**: Drizzle ORM configured for PostgreSQL dialect, providing type-safe database operations and migrations.

**Schema Design**: 
- Products table: id, name, description, price (text), category, imageUrl, stock (text)
- Orders table: id, customer details (name, email, phone, address), items (JSON text), total, status, createdAt
- Admins table: id, username, password for authentication

**Migration Strategy**: Drizzle Kit manages schema migrations with migrations stored in `/migrations` directory.

**Current Implementation**: Application uses in-memory storage during development with plans to integrate PostgreSQL via Neon serverless database (@neondatabase/serverless).

### Authentication & Authorization

**Admin Access**: Simple authentication using localStorage flag (`adminLoggedIn`) for admin panel access. Production implementation would require server-side session management with proper password hashing.

**Session Management**: Infrastructure exists for connect-pg-simple session store (PostgreSQL-backed sessions), ready for production authentication implementation.

### External Dependencies

**Database Provider**: Neon Serverless PostgreSQL (@neondatabase/serverless) configured for serverless PostgreSQL hosting with connection pooling.

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent iconography
- Embla Carousel for product image galleries
- CMDK for command palette interfaces

**Styling & Theming**:
- Tailwind CSS with custom configuration for dark/light theme support
- CSS variables for dynamic theming
- Google Fonts: Inter and Poppins font families

**Development Tools**:
- Replit-specific plugins for enhanced development experience (cartographer, dev banner, runtime error overlay)
- TypeScript for type safety across the stack
- ESBuild for production bundling

**Image Assets**: Static images served from `/attached_assets/generated_images/` directory for product photography and hero sections.