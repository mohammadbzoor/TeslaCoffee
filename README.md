# ☕ Tesla Coffee — Modern Real-Time Web Application & Digital Ordering Platform

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.14.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.6.2-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.19.1-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/mohammadbzoor/TeslaCoffee)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> A full-stack, cloud-powered digital menu and order management system built for high-end hospitality venues. Powered by **React 19**, **Google Firebase (Firestore, Auth, Storage, Hosting)**, and modern responsive design patterns.

---

## 📌 Table of Contents
- [Executive Summary](#-executive-summary)
- [System Architecture](#-system-architecture)
- [Key Features & Engineering Highlights](#-key-features--engineering-highlights)
- [Data Models & Schema](#-data-models--schema)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Production Build & Deployment](#-production-build--deployment)
- [Security & Performance Considerations](#-security--performance-considerations)
- [Contributing & License](#-contributing--license)

---

## 📖 Executive Summary

**Tesla Coffee** is an end-to-end digital ordering and administrative web application tailored for modern cafes and restaurants. The platform addresses operational inefficiencies of physical paper menus and standalone POS systems by offering:
1. **Interactive, real-time client storefront** with categorized menus, full-text live filtering, special offers, and localized ordering.
2. **Automated WhatsApp Checkout Protocol** converting cart payloads into structured, itemized order dispatches.
3. **Administrative Control Center** enabling live CRUD operations over product inventories, client-side image cropping and cloud uploads, and daily revenue metrics.

---

## 🏗 System Architecture

The application adopts a **Serverless Single-Page Application (SPA)** architecture communicating directly with Google Firebase Cloud infrastructure via reactive WebSockets (`onSnapshot`) and REST APIs:

```
[ Client Browser (SPA) ]
  ├── UI Layer (React 19 + React-Bootstrap + Framer Motion)
  ├── State Management (AuthContext + CartContext + LocalStorage Persistence)
  └── Services & Utilities (orderHelpers, adminStats, Firebase SDK)
          │
          ├── [Firebase Authentication]   --> Session & RBAC (Admin / Customer)
          ├── [Cloud Firestore]          --> Real-time Bi-directional Data Sync
          ├── [Firebase Cloud Storage]   --> Image Blobs & Cropped Product Assets
          └── [Firebase Hosting]         --> Global CDN Edge Distribution
```

---

## 🚀 Key Features & Engineering Highlights

### 🛒 Client Experience & Order Processing
- **Real-Time Digital Menu:** Real-time synchronization with Cloud Firestore. Product additions, price updates, and stock adjustments reflect across all connected clients with zero page reloads.
- **Categorization & Instant Search:** Multi-attribute filtering across categories (`Hot Drinks`, `Cold Drinks`, `Desserts`, `Offers`) coupled with client-side query indexing.
- **Persistent State-Managed Cart:**
  - Implemented using React Context API (`CartContext`).
  - Synced to `localStorage` partitioned by authenticated `user.uid` or anonymous guest sessions.
  - Granular quantity mutation (`+` / `-`), auto total calculation, and cart item badge in the top navigation.
- **WhatsApp Direct Checkout Dispatcher:**
  - Generates URL-encoded order payloads containing itemized breakdown, quantity, item prices, grand total, delivery address, and notes.
  - Dispatches orders directly to the venue's dedicated WhatsApp business endpoint.

### 🛡️ Authentication & Role-Based Access Control (RBAC)
- **Firebase Auth Integration:** Email/password authentication lifecycle management with automated session token refreshes.
- **Route Guarding:** High-order component (`ProtectedRoute`) intercepting unauthenticated or unauthorized access attempts with route redirection and state history preservation.
- **User Action Logging:** Event tracking utility recording critical user interactions (`cart_add`, `checkout_init`, `view_item`) for analytics.

### ⚡ Administrative Dashboard & Content Management (CMS)
- **Complete Inventory CRUD:** Full lifecycle management of menu items with instant optimistic UI updates.
- **Client-Side Image Cropping Pipeline:** Integrated `react-easy-crop` canvas transformation pipeline ensuring optimized aspect ratios (1:1 / 4:3) before uploading raw blobs to **Firebase Cloud Storage**.
- **Business Intelligence & Metrics:** Built-in calculation modules (`adminStats.js`) aggregating order volumes, daily summaries, and revenue insights.

### 🎨 Design System & Visual Aesthetics
- **Luxury Dark Theme:** Curated palette featuring espresso dark tones (`#111`, `#1e1e1e`) accented with warm caramel and roasted gold tones (`#df8b46`, `#b45b35`).
- **Smooth Micro-Interactions:** Component entrance transitions, card hover elevation, and route changes orchestrated through `framer-motion`.

---

## 🗄️ Data Models & Schema

### Menu Item Entity (`menuItems` collection in Firestore)
```typescript
interface MenuItem {
  id: string;              // Firestore auto-generated document ID
  title: string;           // Product display name
  price: number;           // Unit price (JOD)
  oldPrice?: number;       // Discount/original price for promotional items
  category: "hot" | "cold" | "dessert" | "offers";
  section?: string;        // Sub-grouping or section tag
  imgUrl: string;          // Firebase Storage CDN download URL
  description?: string;    // Product composition & notes
  createdAt: Timestamp;    // Server timestamp
  updatedAt: Timestamp;    // Last modification timestamp
}
```

### Cart Item Entity (Client Local State)
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  img: string;
  count: number;
}
```

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | `React 19.1.0` | Declarative UI rendering & state orchestration |
| **Routing** | `React Router DOM v7.6.2` | Client-side routing, query params, route guards |
| **Cloud Database** | `Google Cloud Firestore 12.14` | Real-time NoSQL document store with live listeners |
| **Authentication** | `Firebase Auth` | Identity management, RBAC, and secure token lifecycle |
| **Asset Storage** | `Firebase Cloud Storage` | Scalable object storage for menu imagery |
| **Hosting & CDN** | `Firebase Hosting` | Fast, SSL-certified global edge delivery |
| **UI System** | `Bootstrap 5.3` / `React-Bootstrap` | Grid system, modals, forms, and responsive utilities |
| **Motion & UX** | `Framer Motion 12.19` | Gesture physics, scroll triggers, and enter/exit animations |
| **Image Processing** | `react-easy-crop 5.4` | Canvas-based client-side image framing and cropping |
| **Iconography** | `React Icons 5.6` & `FontAwesome 6.7` | SVG-based scalable UI icons |

---

## 📂 Project Structure

```text
MenuFood/
├── .gitignore                      # Git exclusion rules (node_modules, builds, secrets)
├── README.md                       # Comprehensive repository documentation
└── menu/                           # Core React 19 web application
    ├── .firebaserc                 # Firebase CLI active project configuration
    ├── firebase.json               # Firebase Hosting rewrite & cache headers
    ├── package.json                # Project dependencies and script declarations
    ├── public/                     # Public assets, icons, HTML root template
    │   ├── index.html              # HTML5 entry point & viewport configuration
    │   └── favicon.ico             # Application icon
    └── src/
        ├── App.js                  # Root application router & provider wrapper
        ├── index.js                # React DOM root render
        ├── index.css               # Global CSS variables, reset, design tokens
        ├── components/             # Reusable UI component library
        │   ├── HeroSection.js      # Cinematic hero header with animated badges
        │   ├── Hero.css            # Styling for hero component
        │   ├── Navbar/             # Responsive navigation bar with dynamic cart count
        │   ├── CardList/           # Product card grid with lazy-loading & category tabs
        │   ├── Animation/          # Framer Motion animated wrappers
        │   ├── about/              # Brand story and venue showcase
        │   ├── admin/              # CMS modules (ProductManagement, DailySummaryTable)
        │   ├── auth/               # Login, registration, and ProtectedRoute guards
        │   └── footer/             # Operational hours, social links, location metadata
        ├── pages/                  # Top-level route views
        │   ├── Home.js             # Landing page
        │   ├── cart.js             # Interactive cart & WhatsApp order generator
        │   ├── offers.js           # Promotional campaign & discount showcase
        │   └── AdminDashboard.js   # Administrative analytics and product controls
        ├── firebase/               # Firebase initialization module
        │   └── firebese.js         # Firebase app configuration & exported instances
        ├── utils/                  # Utility functions and React Context providers
        │   ├── AuthContext.js      # Authentication context & role evaluation
        │   ├── CartContext.js      # Cart state provider & badge synchronizer
        │   ├── functionFirebase.js # Firestore query handlers & realtime listeners
        │   ├── functionMenu.js     # Cart mutation algorithms & storage sync
        │   ├── adminStats.js       # Statistical aggregation helpers for admin KPIs
        │   └── orderHelpers.js     # Order string formatting & WhatsApp URI encoder
        └── data/                   # Default static data and fallback content
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x`
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/mohammadbzoor/TeslaCoffee.git
cd TeslaCoffee/menu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
The client application comes pre-configured with project `teslacoffee-04`. If you are setting up your own Firebase environment:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password), **Firestore Database**, and **Cloud Storage**.
3. Update `menu/src/firebase/firebese.js` with your credentials:
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

### 4. Run Development Server
```bash
npm start
```
Access the application at `http://localhost:3000`.

---

## 📦 Production Build & Deployment

### Build Optimization
Execute an optimized production bundle:
```bash
npm run build
```
This produces an asset bundle in `menu/build/` with automated code splitting, tree shaking, minification, and gzip compression.

### Deploy to Firebase Hosting
1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```
2. Authenticate CLI:
```bash
firebase login
```
3. Deploy the application:
```bash
firebase deploy
```

---

## 🔒 Security & Performance Considerations

- **Protected Client Routes:** Private administrative pages are wrapped with client-side guards preventing unauthorized inspection.
- **Serverless Scaling:** Firebase Firestore handles multi-region horizontal scaling and offline indexing automatically.
- **Image Optimization:** Raw user image uploads are pre-processed in browser memory (crop & resize) before pushing to storage buckets, preventing network bloat and preserving bandwidth.
- **Environment Hygiene:** Standard `.gitignore` prevents exposure of local environment variables, debug logs, and build artifacts.

---

## 📄 License & Author

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed by **Mohammad Bzoor**  
- **GitHub:** [@mohammadbzoor](https://github.com/mohammadbzoor)  
- **Project Repository:** [TeslaCoffee](https://github.com/mohammadbzoor/TeslaCoffee)  
- **Location:** Jordan