# Frosteva 🥛 - Premium Dairy & Condiments E-Commerce Platform

A modern, full-featured e-commerce platform for purchasing premium dairy products and artisanal condiments. Built with React, Express, and Tailwind CSS.

## 🚀 Live Preview

**▶️ Visit Frosteva Now:** https://b5685270-b7e8-4c55-8db5-c3afcfbef87a-00-37ax1u5un51cm.picard.replit.dev/

**Website URL:** https://frosteva-dairy.replit.dev

**Admin Dashboard:** https://b5685270-b7e8-4c55-8db5-c3afcfbef87a-00-37ax1u5un51cm.picard.replit.dev/admin
- Login: `admin` / `admin123`

---

## 🌟 Features

### Customer Features
- **Product Catalog** - Browse 7 premium dairy products with authentic bilingual packaging and nutritional information
  - Premium Ghee: 250g (₹450) | 500g (₹900) | 1kg (₹1800)
  - Fresh Curd: 400g (₹50) | 800g (₹100) | 1kg (₹125)
  - Farm Fresh Milk: 500ml (₹30) | 1L (₹60) | 1.5L (₹90)
  - Cold-Pressed Mustard Oil: 500ml (₹145) | 1L (₹290) | 2L (₹550)
  - Crunchy Peanut Butter: 250g (₹160) | 500g (₹320) | 1kg (₹640)
  - Smooth Peanut Butter: 250g (₹160) | 500g (₹320) | 1kg (₹640)
  - Chocolate Peanut Butter: 250g (₹180) | 500g (₹360) | 1kg (₹720)

- **Size Variants** - Choose from multiple sizes for every product
- **Shopping Cart** - Add items, adjust quantities, remove products
- **Checkout System** - Professional checkout form with customer information collection
- **Product Details** - Rich product pages with images, descriptions, and stock information
- **Customer Reviews** - See testimonials from satisfied customers
- **Responsive Design** - Fully responsive on mobile, tablet, and desktop devices
- **Dark Theme** - Beautiful dark interface with yellow accent colors

### Admin Dashboard
- **Sales Dashboard** - Real-time sales metrics and revenue tracking
- **Sales Charts** - Visual representation of sales trends (7-day overview)
- **Order Management** - View all orders, update order status
- **Product Management** - Create, edit, and delete products
- **Admin Authentication** - Secure login system for admin access

## 🎨 Design Highlights

- **Dark & Yellow Theme** - Professional color scheme optimized for food products
- **Hero Section** - Eye-catching landing page with call-to-action buttons
- **Authentic Frosteva Branded Products** - Bilingual packaging (English & Hindi) with nutritional information
- **Product Cards** - Clean, modern card design with size variant selectors
- **Customer Reviews Section** - 4 verified customer testimonials with ratings
- **Indian Pricing (₹ Rupees)** - Competitive market-based pricing for Indian consumers
- **Admin Sidebar** - Intuitive navigation for admin functions
- **Loading States** - Skeleton loaders for smooth user experience
- **Responsive Layout** - Mobile-first responsive design

## 📱 Screenshots

### Home Page
![Home Page](./docs/screenshots/home.png)
- Hero section with farm fresh imagery
- Feature highlights (Farm Fresh, 100% Pure, Express Delivery)
- Product catalog with category filtering
- Customer reviews section

### Product Catalog
![Product Catalog](./docs/screenshots/catalog.png)
- Beautiful product grid with Frosteva branding
- Size variant selectors (500ml, 1L, 1.5L, etc.)
- Bilingual packaging with nutritional information
- Real-time price updates based on selected size

### Shopping Cart
![Shopping Cart](./docs/screenshots/cart.png)
- View all cart items with selected sizes
- Adjust quantities easily
- Order summary in Indian Rupees
- Proceed to checkout

### Checkout
![Checkout](./docs/screenshots/checkout.png)
- Professional checkout form
- Customer information fields
- Order summary in rupees
- Real-time order placement

### Customer Reviews
![Reviews](./docs/screenshots/reviews.png)
- Authentic customer testimonials
- Star ratings (5-star reviews)
- Customer names and roles
- Helpful feedback about Frosteva products

### Admin Dashboard
![Admin Dashboard](./docs/screenshots/admin-dashboard.png)
- Sales metrics (Total Sales, Orders, Daily Orders, Avg Value)
- 7-day sales chart
- Recent orders list

### Orders Management
![Orders Management](./docs/screenshots/admin-orders.png)
- Complete orders table
- Order details and status
- Status update dropdown
- Order history

### Product Management
![Product Management](./docs/screenshots/admin-products.png)
- Product inventory table
- Add new products dialog
- Edit product functionality
- Delete products option

## 🛠 Technology Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Wouter (routing)
- TanStack Query (data fetching)
- Recharts (charts & analytics)
- Framer Motion (animations)

**Backend:**
- Express.js
- Node.js
- In-Memory Storage (ready for PostgreSQL)
- Zod (validation)
- Drizzle ORM (database ready)

**Design & Assets:**
- Dark theme with yellow accents
- Responsive mobile-first design
- Authentic product photography with Frosteva branding
- Bilingual packaging (English & Hindi)
- Complete nutritional information labels

## 🎯 Use Cases

Perfect for:
- Regional dairy businesses expanding online
- Farm-to-table product companies
- Artisanal food producers
- Health-conscious food retailers in India
- Subscription-based organic product sales

## 📋 Project Structure

```
.
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities & hooks
│   │   └── App.tsx        # Main app component
│   ├── public/images/     # Frosteva product images
│   ├── index.html         # HTML entry point
│   └── vite.config.ts     # Vite configuration
├── server/                # Backend (Express)
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── app.ts             # Express app setup
├── shared/                # Shared code
│   └── schema.ts          # Data schemas & types
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/frosteva-dairy.git
   cd frosteva-dairy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Customer site: http://localhost:5000
   - Admin dashboard: http://localhost:5000/admin
   - Admin credentials: `admin` / `admin123`

## 📖 Usage Guide

### For Customers

1. **Browse Products**
   - Visit the home page
   - Use category filters to find products
   - Click on products to view details
   - Select your preferred size variant

2. **Add to Cart**
   - Click "Add to Cart" button
   - Size variant is automatically selected
   - Continue shopping or go to cart

3. **Checkout**
   - Click cart icon (top right)
   - Review order summary in rupees
   - Click "Proceed to Checkout"
   - Fill in shipping information
   - Click "Place Order"

4. **View Reviews**
   - Scroll to customer reviews section
   - See ratings and testimonials from verified buyers

### For Admins

1. **Login**
   - Visit http://localhost:5000/admin
   - Enter credentials: `admin` / `admin123`

2. **Dashboard**
   - View sales metrics in rupees
   - Check 7-day sales chart
   - See recent orders

3. **Manage Orders**
   - Navigate to "Orders" section
   - View all customer orders
   - Update order status (Pending, Processing, Shipped, Completed, Cancelled)

4. **Manage Products**
   - Navigate to "Products" section
   - Add new products with size variants
   - Edit existing products
   - Delete products as needed

## 🔐 Security Features

- Secure admin login system
- Password-based authentication
- Order validation
- Input sanitization
- CORS protection ready

## 📊 Data Management

Currently uses in-memory storage. Ready to integrate with:
- PostgreSQL (schema defined with Drizzle ORM)
- Cloud databases
- Multi-region deployments

## 🎨 Customization

### Colors
Edit `client/src/index.css` to change theme colors:
- Primary (Yellow): `--primary: 45 95% 32%`
- Background (Dark): `--background: 0 0% 8%`

### Products
Add new products through the admin dashboard or edit `server/storage.ts` for initial seed data.

### Content
Update company name, descriptions, and contact info in components:
- Header: `client/src/components/header.tsx`
- Footer: `client/src/components/footer.tsx`
- Home page: `client/src/pages/home.tsx`
- Reviews: `client/src/components/reviews.tsx`

## 🚀 Deployment

### Deploy to Replit
1. Push code to GitHub (your repository)
2. Click "Publish" button in Replit
3. Get your live `.replit.app` domain

### Deploy to Production
The app is ready to deploy to:
- Vercel
- Netlify
- Heroku
- AWS
- DigitalOcean

## 📈 Future Enhancements

Roadmap for next phase:
- ✅ PostgreSQL database integration
- ✅ Stripe payment processing
- ✅ Customer accounts with order history
- ✅ Advanced sales analytics
- ✅ Email notifications
- ✅ Subscription products
- ✅ Inventory alerts
- ✅ Multi-currency support

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For support and questions:
- Email: hello@frosteva.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/frosteva-dairy/issues)

## 👨‍💼 About Frosteva

Frosteva is dedicated to bringing premium quality dairy products and artisanal condiments directly to your door. All our products feature authentic Frosteva branding with bilingual packaging (English & Hindi) and complete nutritional information. Our offerings include:
- 100% pure with no artificial additives
- Sourced from trusted local farms
- Quality assured through rigorous testing
- Delivered fresh to maintain maximum nutrition
- Crafted with care and tradition
- Authentic product photography with Frosteva branding
- Competitive Indian rupee pricing
- Complete nutritional transparency (calories, protein, fat, carbs, sodium)

Every spoonful represents our commitment to excellence, purity, and your family's health.

---

**Built with ❤️ for quality and sustainability**

Last Updated: November 2025
