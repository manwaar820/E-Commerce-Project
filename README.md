## 🛍️ Modern E-Commerce Product Page

A dynamic and responsive e-commerce product page built using **Next.js 15+**, **React Context API**, and **Tailwind CSS**. It provides a fully interactive shopping cart experience with persistent storage and a clean, testable architecture.

---

## 📚 Table of Contents

- [📦 Project Setup](#-project-setup)
- [⚙️ Key Technical Decisions](#%EF%B8%8F-key-technical-decisions)
- [✨ Features Implemented](#-features-implemented)
- [✅ Unit Tests for Critical Components](#-Unit-Tests-for-Critical-Components)

---

## 📦 Project Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/modern-ecommerce-product-page.git
cd modern-ecommerce-product-page //If needed
```

2. **Install dependencies:**

```bash
npm i
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The app will be available at [localhost](http://localhost:3000)

---

## ⚙️ Key Technical Decisions

### 🔧 Framework & Styling

- Next.js 15+ for file-based routing and optimized performance.

- Tailwind CSS for utility-first styling and responsive UI.

### 🧠 State Management

- React Context API via a custom CartProvider to manage global cart state cleanly.

### 💾 Persistence

- localStorage used to persist cart and product data across sessions.

- Local versioning implemented to avoid stale data.

### 🧪 Testing
- Jest and React Testing Library for unit and interaction testing.

- Custom mocks for next/image, hooks, and context ensure isolated test environments.

---

### ✨ Features Implemented

Here's a quick overview of the main functionality implemented in this product page:

- ✅ **Custom error boundary system** with recovery options  
- ✅ **Product image gallery** with zoom functionality  
- ✅ **Color/size variant selection** with real-time updates  
- ✅ **Add to cart** functionality with quantity selector  
- ✅ **Expandable product description** for better UX  
- ✅ **Responsive design** optimized for all devices  

---

## ▶️ How to Run the Project For Ligthouse

Run Build and than start:

```bash
npm run Build
npm start
```

---

## ✅ Unit Tests for Critical Components

Run Tests:

```bash
npm test
npm run test
npx jest _tests_/ProductPage.test.tsx // To run a specific test
npm test add // To run a speciific test
```

## 🧪 Covered Components & What They Test

### ✅ CartModal

- Renders cart modal with data from localStorage
- Simulates item removal from cart
- Asserts console.log call when removing

### ✅ Navbar

- Verifies presence of branding (e.g., name "Anwar")

### ✅ NavIcons

- Tests opening and closing of the cart modal
- Handles both empty cart and populated cart scenarios

### ✅ ProductImages

- Renders main image from product.
- Updates image when thumbnail is clicked.
- Displays a loading state if no product data is present.

### ✅ ProductPage

- Displays product name, price, and description
- Toggles detailed product text on click
- Mocks subcomponents (ProductImages, Add) for test isolation

### ✅ Navbar

- Verifies presence of branding (e.g., name "Anwar")

---
