# Design Guidelines: Dairy & Condiments E-Commerce Platform

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Shopify and modern food e-commerce platforms while incorporating the requested dark and yellow brand identity. The design will emphasize product photography, trust-building elements, and seamless shopping experience.

## Color Theme
Following user specification: Dark background with yellow accent system for CTAs, highlights, and brand elements.

## Typography System

**Font Stack**: 
- Primary: Inter or DM Sans (Google Fonts) - modern, clean sans-serif for body text
- Headings: Poppins or Outfit - bold, attention-grabbing for product names and CTAs

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold
- Section Headers: text-3xl to text-4xl, font-semibold
- Product Titles: text-xl to text-2xl, font-medium
- Body Text: text-base, regular weight
- Captions/Labels: text-sm, font-medium

## Layout & Spacing

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20 (p-4, gap-8, py-12, etc.)

**Container Strategy**:
- Full-width hero: w-full
- Content sections: max-w-7xl mx-auto
- Product grids: max-w-6xl
- Forms/checkout: max-w-2xl

**Grid Systems**:
- Product catalog: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Category cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard metrics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

## Customer-Facing Website

### Header/Navigation
- Sticky header with logo, navigation (Shop, Categories, About, Contact), search bar, cart icon with item count
- Two-tier navigation: main nav + category pills (Dairy, Oils, Spreads)
- Mobile: hamburger menu with full-screen overlay

### Hero Section
Large impactful hero image showcasing fresh dairy products in rustic, appetizing setting. Hero includes:
- Full-width background image (h-[600px] on desktop)
- Centered content overlay with headline, tagline, and primary CTA
- Transparent backdrop blur for text readability (backdrop-blur-md with semi-transparent background)
- Secondary CTA for "Shop Categories"

### Product Catalog
- Grid layout with product cards featuring large product images
- Card structure: Image (aspect-square), product name, price, quick add-to-cart button
- Hover states: subtle scale and shadow enhancement
- Category filtering tabs above grid
- Product detail view: large image gallery, description, quantity selector, specifications, add-to-cart CTA

### Features Section (Below Hero)
Three-column grid highlighting:
- "Farm Fresh Quality" with icon
- "100% Natural" with icon  
- "Fast Delivery" with icon

### Category Showcase
Two-column asymmetric layout:
- Left: "Dairy Products" card with image collage
- Right: "Premium Condiments" card with image collage

### Trust & Social Proof
- Customer testimonials: 2-column card grid with customer photos, quotes, names
- Quality certifications/badges in single row
- "Our Process" section with 3-4 step timeline

### Footer
Comprehensive footer with:
- Newsletter signup form
- Quick links (Shop, About, FAQs, Contact)
- Contact information with icons
- Social media links
- Payment method badges

## Admin Dashboard

### Dashboard Layout
Sidebar navigation (fixed, w-64) + main content area:

**Sidebar Components**:
- Logo/brand at top
- Navigation items: Dashboard, Orders, Products, Customers, Analytics
- User profile section at bottom with logout

**Main Dashboard Area**:
- Metrics cards row: Total Sales, Orders Today, Total Products, Active Customers (4 columns)
- Recent orders table with sorting/filtering
- Sales chart (line or bar chart showing weekly/monthly trends)
- Low stock alerts section
- Quick actions panel

### Data Tables
- Clean table design with alternating row backgrounds
- Column headers with sort indicators
- Row actions (View, Edit, Delete) as icon buttons
- Pagination controls at bottom
- Search and filter controls above table

### Forms (Add/Edit Products)
- Two-column form layout on desktop, single column on mobile
- Field grouping: Product Details, Pricing, Inventory, Images
- Image upload with preview thumbnails
- Rich text editor for descriptions
- Save/Cancel actions sticky at bottom

## Component Library

**Buttons**:
- Primary: Bold, yellow accent, rounded-lg, px-6 py-3
- Secondary: Outlined with border, rounded-lg
- Icon buttons: Square, p-2, rounded-md
- All with appropriate hover/active states

**Cards**:
- Rounded corners (rounded-xl)
- Subtle shadow (shadow-lg)
- Padding: p-6
- Gap between elements: gap-4

**Form Inputs**:
- Consistent height: h-12
- Rounded: rounded-lg
- Padding: px-4
- Labels above inputs with gap-2
- Error states with red accent and helper text

**Icons**: Heroicons via CDN for consistent iconography throughout

## Images

**Product Photography**:
- High-quality images of dairy products in clean, appetizing presentation
- Mustard oil in glass bottles, peanut butter jars with spread samples
- Lifestyle shots showing products in kitchen settings

**Hero Image**: Wide shot of dairy farm or artisanal production with warm, natural lighting - conveys freshness and authenticity

**Category Images**: Close-up product shots emphasizing texture and quality

**Trust Section**: Farm/production facility images, certification badges

## Accessibility & Responsiveness

- Mobile-first approach with breakpoints at md (768px), lg (1024px), xl (1280px)
- Touch-friendly tap targets (min 44px)
- Proper heading hierarchy (h1-h6)
- Alt text for all product images
- Keyboard navigation support for forms and interactive elements
- Form validation with clear error messaging

## Animation Guidelines
Minimal, purposeful animations:
- Smooth page transitions (fade-in on load)
- Hover effects on cards (scale-105, shadow enhancement)
- Cart icon bounce on add-to-cart
- Loading spinners for async operations
- NO heavy scroll animations or parallax effects