# Pure Harvest 🌾 - Premium Dairy & Condiments E-Commerce Platform

A modern, full-featured e-commerce platform for purchasing premium dairy products and artisanal condiments. Built with React, Express, and Tailwind CSS.

## 🌟 Features

### Customer Features
- **Product Catalog** - Browse 7 premium dairy products and condiments with detailed descriptions and pricing
  - Fresh Ghee
  - Fresh Curd
  - Farm Fresh Milk
  - Cold-Pressed Mustard Oil
  - Crunchy Peanut Butter
  - Smooth Peanut Butter
  - Chocolate Peanut Butter

- **Shopping Cart** - Add items, adjust quantities, remove products
- **Checkout System** - Professional checkout form with customer information collection
- **Product Details** - Rich product pages with images, descriptions, and stock information
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
- **Product Cards** - Clean, modern card design with hover effects
- **Admin Sidebar** - Intuitive navigation for admin functions
- **Loading States** - Skeleton loaders for smooth user experience
- **Responsive Layout** - Mobile-first responsive design

## 🚀 Live Preview

**Website URL:** https://pure-harvest.replit.dev (or your deployed Replit domain)

**Admin Dashboard:** https://pure-harvest.replit.dev/admin
- Login: `admin` / `admin123`

## 📱 Screenshots

### Home Page
![Home Page](./docs/screenshots/home.png)
- Hero section with farm fresh imagery
- Feature highlights (100% Natural, Quality Assured, Fast Delivery)
- Product catalog with category filtering

### Product Catalog
![Product Catalog](./docs/screenshots/catalog.png)
- Beautiful product grid with images
- Category filtering (Dairy, Oils, Spreads)
- Price and stock information

### Product Details
![Product Details](./docs/screenshots/product-detail.png)
- High-quality product images
- Detailed product descriptions
- Quantity selector
- Add to cart functionality

### Shopping Cart
![Shopping Cart](./docs/screenshots/cart.png)
- View all cart items
- Adjust quantities
- Order summary with total
- Proceed to checkout

### Checkout
![Checkout](./docs/screenshots/checkout.png)
- Professional checkout form
- Customer information fields
- Order summary
- Real-time order placement

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
- Professional product photography
- Hero image with dark wash overlay

## 🎯 Use Cases

Perfect for:
- Regional dairy businesses expanding online
- Farm-to-table product companies
- Artisanal food producers
- Health-conscious food retailers
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
   git clone https://github.com/jakhar434/DairyDash.git
   cd DairyDash
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

2. **Add to Cart**
   - Click "Add to Cart" button
   - Adjust quantity if needed
   - Continue shopping or go to cart

3. **Checkout**
   - Click cart icon (top right)
   - Review order summary
   - Click "Proceed to Checkout"
   - Fill in shipping information
   - Click "Place Order"

### For Admins

1. **Login**
   - Visit http://localhost:5000/admin
   - Enter credentials: `admin` / `admin123`

2. **Dashboard**
   - View sales metrics
   - Check 7-day sales chart
   - See recent orders

3. **Manage Orders**
   - Navigate to "Orders" section
   - View all customer orders
   - Update order status (Pending, Processing, Shipped, Completed, Cancelled)

4. **Manage Products**
   - Navigate to "Products" section
   - Add new products with "Add Product" button
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

## 🚀 Deployment

### Deploy to Replit
1. Push code to GitHub (DairyDash repository)
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
- Email: hello@pureharvest.com
- GitHub Issues: [Create an issue](https://github.com/jakhar434/DairyDash/issues)

## 👨‍💼 About Pure Harvest

Pure Harvest is dedicated to bringing premium quality dairy products and artisanal condiments directly to your door. All our products are:
- 100% natural with no artificial additives
- Sourced from local farms
- Quality assured through rigorous testing
- Delivered fresh to maintain maximum nutrition

---

**Built with ❤️ for quality and sustainability**

Last Updated: November 2025
