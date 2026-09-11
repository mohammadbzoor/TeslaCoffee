# ☕ Tesla Coffee — Enterprise Digital Menu, POS Cashier & Restaurant Management System

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.14.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.6.2-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.19.1-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/mohammadbzoor/TeslaCoffee)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> A full-scale, cloud-native restaurant operations suite featuring a **Customer-Facing Digital Storefront**, a dedicated **Touch-Friendly POS Cashier Terminal**, an **Inventory & Category CMS**, **Printable Invoices**, and **Real-Time Financial Analytics with Excel Export**. Built on **React 19** and **Google Firebase**.

---

## 📌 Table of Contents
- [System Overview](#-system-overview)
- [Architecture & Data Pipeline](#-architecture--data-pipeline)
- [Core Functional Modules](#-core-functional-modules)
  - [1. Touch-Optimized POS Cashier System](#1-touch-optimized-pos-cashier-system)
  - [2. Comprehensive Product & Category CMS](#2-comprehensive-product--category-cms)
  - [3. Order Lifecycle & Table Management](#3-order-lifecycle--table-management)
  - [4. Financial Intelligence, Daily Summaries & Excel Export](#4-financial-intelligence-daily-summaries--excel-export)
  - [5. Customer Digital Storefront & WhatsApp Checkout](#5-customer-digital-storefront--whatsapp-checkout)
- [Data Models & Schema](#-data-models--schema)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [License & Author](#-license--author)

---

## 📖 System Overview

**Tesla Coffee** is an integrated SaaS-like management ecosystem built to streamline end-to-end cafe and restaurant operations. Rather than just a static digital menu, the platform combines customer self-ordering with a full suite of administrative and point-of-sale tools:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             TESLA COFFEE PLATFORM                           │
├──────────────────────────────────────┬──────────────────────────────────────┤
│          CUSTOMER STOREFRONT         │       ADMIN & OPERATIONS SUITE       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Real-time Interactive Menu         │ • High-Speed POS Cashier System      │
│ • Live Multi-Category Filtering      │ • Real-Time Order Management (Live)  │
│ • Persistent Cart (Per-User Storage) │ • Product & Category CMS + Cropping  │
│ • WhatsApp Direct Order Protocol     │ • Printable Invoices & Kitchen Slips │
│ • Promotional Deals & Discounts      │ • Daily Sales Stats & Excel Export   │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 🏗 Architecture & Data Pipeline

The application leverages a reactive **Serverless Cloud Architecture** powered by Google Cloud Firebase:

```
[ Customer / Staff Device ]
  │
  ├── React 19 Frontend (SPA + Context API + Framer Motion)
  │     ├── Storefront Engine (Navbar, Cards, Cart, WhatsApp Dispatch)
  │     └── Operations Engine (POS Cashier, CMS, Orders Table, Daily Analytics)
  │
  └── Google Firebase SDK (v12)
        ├── [Authentication]       --> Role-Based Access Control (Admin / Staff / Customer)
        ├── [Cloud Firestore]      --> Real-Time Bi-Directional WebSocket Sync (`onSnapshot`)
        ├── [Cloud Storage]        --> Image Asset Blobs & Cropped Product Media
        └── [Firebase Hosting]     --> Global Edge CDN Distribution
```

---

## 🚀 Core Functional Modules

### 1. Touch-Optimized POS Cashier System
Located at `/admin-dashboard` under the **الكاشير (Cashier)** view:
- **Rapid-Fire Order Entry:** Designed for counter staff and baristas with large, touch-friendly product tiles and real-time category switches.
- **Table Assignment & Custom Notes:** Seamless dine-in order attribution (table number) and kitchen preparation notes (e.g., "extra oat milk", "less sugar").
- **Live Cart Calculations:** Instant subtotal, discounts, and grand total computations with zero latency.
- **Direct Order Injection:** Generates Firestore order records instantly with server timestamps, setting the status to `pending` or `active`.
- **Printable POS Invoices:** Built-in invoice rendering engine (`InvoicePrintView.js`) generating formatted receipts ready for thermal POS printers or paper printouts.

### 2. Comprehensive Product & Category CMS
- **Live Inventory CRUD:** Create, read, update, and delete menu items with real-time propagation to all connected customers without page refreshes.
- **Client-Side Image Cropping Pipeline:** Integrated `react-easy-crop` canvas transformation pipeline allowing managers to crop, zoom, and frame product photos to standard aspect ratios directly in browser memory before pushing to **Firebase Cloud Storage**.
- **Dynamic Category Management:** Add, edit, or reorganize menu categories on the fly (`CategoryManager.js`).
- **Promotional Pricing Engine:** Configure dual-price fields (`price` vs `newPrice`) with automatic discount badges and savings percentages displayed across the client storefront.

### 3. Order Lifecycle & Table Management
- **Real-Time Kanban/Table Views:** Live streaming of all inbound orders via Firestore listeners (`useOrders.js`).
- **Granular Order Operations:**
  - Status toggle (`Pending` ➔ `In Progress` ➔ `Completed`).
  - Line-item adjustments (delete single items from an order, recalculating totals on the fly).
  - Add or update operational notes on existing tickets.
  - Single-order, day-level, or bulk order purge utilities.

### 4. Financial Intelligence, Daily Summaries & Excel Export
- **Live Operational KPIs:** Real-time summary cards displaying:
  - Total Accumulated Revenue (JOD).
  - Completed vs Pending Orders count.
  - Active Dine-In Tables.
- **Daily Performance Aggregations:** Intelligent grouping algorithm (`groupOrdersByDate` in `adminStats.js`) aggregating sales volumes, order frequencies, and revenue day-by-day.
- **One-Click Excel Spreadsheet Export:** Built-in spreadsheet compilation utility (`exportOrdersToExcel.js`) converting live order databases into `.xlsx` spreadsheets for bookkeeping, auditing, and financial reporting.

### 5. Customer Digital Storefront & WhatsApp Checkout
- **Luxury Dark Theme UI:** Warm roasted tones (`#df8b46`, `#b45b35`) on dark backgrounds with smooth Framer Motion entrance dynamics.
- **Debounced Instant Search:** Real-time search across product names and descriptions.
- **Persistent Cart Engine:** Automatic multi-item cart saved to `localStorage` keyed by user ID or anonymous session.
- **WhatsApp Order Dispatch Protocol:** Encodes cart items, quantities, customer delivery instructions, and table info into clean WhatsApp payloads directed to the establishment's business line.

---

## 🗄️ Data Models & Schema

### Menu Item Model (`menuItems` collection)
```typescript
interface MenuItem {
  id: string;              // Auto-generated Firestore document ID
  title: string;           // Product display name
  price: number;           // Standard unit price (JOD)
  newPrice?: number;       // Discounted offer price
  category: string;        // Assigned category (Hot, Cold, Desserts, etc.)
  section?: string;        // Classification ('offers' | 'regular')
  imgUrl: string;          // Cloud Storage public CDN URL
  description?: string;    // Product composition & tasting notes
  createdAt: Timestamp;    // Creation timestamp
  updatedAt: Timestamp;    // Last modification timestamp
}
```

### Order Entity (`orders` collection)
```typescript
interface Order {
  id: string;              // Firestore document ID
  tableNumber?: string;    // Dine-in table identifier
  notes?: string;          // Special preparation instructions
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;           // Calculated bill total
  status: "pending" | "in-progress" | "completed";
  createdAt: Timestamp;    // Order placement timestamp
}
```

---

## 🛠️ Technology Stack

| Layer | Technologies | Role & Highlights |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 19.1.0` | High-performance concurrent rendering & hooks |
| **Routing & Navigation**| `React Router DOM v7.6` | Client-side routing with `ProtectedRoute` guards |
| **Database & Realtime** | `Google Cloud Firestore 12.14` | Reactive NoSQL database with live client synchronization |
| **Authentication** | `Firebase Auth` | Email/password session tokens & RBAC verification |
| **File Storage** | `Firebase Cloud Storage` | Cloud CDN storage for cropped product imagery |
| **Styling & UI Kit** | `Bootstrap 5.3` & `React-Bootstrap` | Responsive grid, accessible modals, forms, and alerts |
| **Motion Physics** | `Framer Motion 12.19` | Gesture controls, micro-interactions, page transitions |
| **Image Processing** | `react-easy-crop 5.4` | In-browser canvas image cropping & aspect ratio control |
| **Spreadsheet Engine** | `xlsx` / `exportOrdersToExcel` | Client-side Excel `.xlsx` workbook generation |
| **Icons** | `React Icons 5.6` & `FontAwesome 6.7` | High-resolution scalable SVG vector icons |

---

## 📂 Project Structure

```text
TeslaCoffee/
├── .gitignore                      # Git exclusion rules (node_modules, builds, secrets)
├── README.md                       # Comprehensive repository documentation
└── coffee/                         # Core React 19 web application
    ├── .firebaserc                 # Firebase CLI project binding
    ├── firebase.json               # Firebase Hosting & CDN configuration
    ├── package.json                # Dependencies, scripts & package manifest
    ├── public/                     # Static assets, favicon, HTML root
    └── src/
        ├── App.js                  # Master application router & provider layout
        ├── index.js                # React DOM root entry
        ├── index.css               # Design tokens, themes & luxury coffee styling
        ├── components/
        │   ├── HeroSection.js      # Interactive animated hero banner
        │   ├── Navbar/             # Responsive header with live cart count
        │   ├── CardList/           # Menu item grid with category tab controls
        │   ├── Animation/          # Framer Motion entrance wrappers
        │   ├── about/              # Brand narrative and venue showcase
        │   ├── auth/               # Login, registration, and route guards
        │   ├── admin/              # Comprehensive Management & POS Modules
        │   │   ├── cashier/        # POS Terminal Components
        │   │   │   ├── CashierView.js           # Main POS terminal dashboard
        │   │   │   ├── CashierCart.js           # Live POS bill & item tally
        │   │   │   ├── CashierProductGrid.js    # Quick-select product catalog
        │   │   │   └── CashierCategoryFilter.js # One-touch category selector
        │   │   ├── ProductManagement.js         # Inventory CRUD & image cropper
        │   │   ├── CategoryManager.js           # Dynamic category orchestrator
        │   │   ├── OrdersTable.js               # Real-time order tracking & status
        │   │   ├── DailySummaryTable.js         # Daily sales aggregation reports
        │   │   ├── StatsCards.js                # Real-time KPI summary widgets
        │   │   └── InvoicePrintView.js          # Printable POS receipt generator
        │   └── footer/             # Venue info, social links & operating hours
        ├── pages/                  # Top-level view routes
        │   ├── Home.js             # Customer landing page
        │   ├── cart.js             # Cart review & WhatsApp order dispatcher
        │   ├── offers.js           # Discounted specials & promotion deals
        │   └── AdminDashboard.js   # Unified Administrative Operations Suite
        ├── firebase/               # Firebase initialization module
        │   └── firebese.js         # Firebase config & service exports
        └── utils/                  # Context providers, helpers & calculations
            ├── AuthContext.js      # Auth session state & user activity logger
            ├── CartContext.js      # Global cart state & persistence manager
            ├── adminStats.js       # Financial calculations & date grouping logic
            ├── orderHelpers.js     # Order status mutations & WhatsApp encoder
            ├── exportOrdersToExcel.js # Excel spreadsheet export generator
            ├── getCroppedImg.js    # Canvas crop-to-blob transformation utility
            └── functionFirebase.js # Firestore query handlers & live listeners
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x`
- [Git](https://git-scm.com/)

### 1. Clone & Install
```bash
git clone https://github.com/mohammadbzoor/TeslaCoffee.git
cd TeslaCoffee/coffee
npm install
```

### 2. Configure Firebase Credentials
Update credentials in `coffee/src/firebase/firebese.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Launch Development Server
```bash
npm start
```
The application will launch on `http://localhost:3000`.

---

## 📦 Deployment

### Production Build
```bash
npm run build
```
Creates an optimized, tree-shaken, and gzip-compressed bundle in `coffee/build/`.

### Deploy to Firebase Hosting
```bash
firebase deploy
```

---

## 📄 License & Author

Distributed under the **MIT License**.

Developed with passion by **Mohammad Bzoor**  
- **GitHub:** [@mohammadbzoor](https://github.com/mohammadbzoor)  
- **Repository:** [TeslaCoffee](https://github.com/mohammadbzoor/TeslaCoffee)  
- **Location:** Jordan