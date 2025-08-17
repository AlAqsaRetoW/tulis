# 🖊️ Tulis - Stationery E-commerce Platform

A modern, responsive e-commerce platform for stationery products built with React, Firebase, and Tailwind CSS. Features a comprehensive dark theme system, user authentication, and admin management capabilities.

## ✨ Features

### 🛍️ **E-commerce Functionality**

- **Product Catalog**: Browse stationery items with categories (Pen, Pencil, Brush, Case)
- **Product Filtering & Sorting**: Filter by category and sort by price (low to high, high to low)
- **Shopping Cart**: Add items to cart with quantity management
- **Product Details**: Detailed product pages with images and descriptions
- **Responsive Design**: Mobile-first design that works on all devices

### 👤 **User Authentication**

- **Email/Password Login**: Traditional authentication with Firebase Auth
- **Google OAuth**: One-click sign-in with Google
- **User Registration**: Secure account creation with validation
- **Role-based Access**: Separate interfaces for customers and admins
- **Session Management**: Persistent login state with automatic redirects

### 🎨 **Advanced UI/UX**

- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Theme Persistence**: Remembers user's theme preference across sessions
- **Smooth Animations**: CSS transitions and hover effects throughout
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: User-friendly error messages and alerts

### 🔧 **Admin Panel**

- **Product Management**: Add, edit, and delete products
- **Inventory Control**: Manage stock levels and product information
- **Image Upload**: Cloudinary integration for product images
- **Data Tables**: Sortable product tables with bulk actions
- **Real-time Updates**: Instant UI updates after data changes

### 🛠️ **Technical Features**

- **State Management**: Redux Toolkit for global state
- **Real-time Database**: Firebase Firestore for data persistence
- **Image Hosting**: Cloudinary for optimized image storage
- **Routing**: React Router with protected routes
- **Form Validation**: Client-side and server-side validation
- **Error Boundaries**: Graceful error handling throughout the app

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tulis.git
   cd tulis
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Firebase (matches src/config/firebase.js)
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   VITE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_ID=your_firebase_app_id
   VITE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. **Firebase Configuration**

   - Create a Firebase project
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database (native mode)
   - Add your Firebase config to `src/config/firebase.js` (already wired to use the `.env` variables above)

5. **Cloudinary Setup**

   - Add the Cloudinary upload widget script (already included in `index.html`):
     ```html
     <script
       src="https://upload-widget.cloudinary.com/global/all.js"
       type="text/javascript"
     ></script>
     ```
   - Configure `cloudName` and `uploadPreset` in `src/components/UploadWidget.jsx`
     (currently hardcoded to `dvkwdyyc7` and `tulis-image`). Replace with your values.

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

### Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## 📁 Project Structure

```
tulis/
├── src/
│   ├── app/                 # Redux store and actions
│   ├── components/          # Reusable UI components
│   ├── config/              # Firebase and external service configs
│   ├── context/             # React context (ThemeContext, ThemeProvider, AuthContext, AuthProvider)
│   ├── hooks/               # Custom hooks/utilities (login/register/google login)
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   ├── router/              # Routing configuration
│   ├── utils/               # Utility functions (SweetAlert wrappers)
│   └── assets/              # Static assets
├── public/                  # Public assets
├── firebase.json            # Firebase hosting config (SPA rewrites to index.html)
└── package.json             # Dependencies and scripts
```

## 🗃️ Data Model (Firestore)

- `users/{uid}`: `{ name: string, email: string, role: 'customer' | 'admin' }`
- `products/{id}`: `{ name, desc, images, category, price: number, stock: number }`
- `cart/{id}`: `{ userId, productId, qty: number, status: 'unpaid', totalPrice: number }`

> Note: Admin access is controlled via the `role` field in `users`. Set `role: 'admin'` to grant admin panel access.

## 🔐 Routing & Access Control

- Public routes: `/`, `/login`, `/register`, `/cart`, `/detail-product/:id`
- Protected admin routes: `/admin`, `/add-product`, `/edit-product/:id`
- `ProtectedRoute` checks `AuthContext` for `user` and `role`.

## 🛠️ Technologies Used

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit (slices: `product`, `cart`)
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Image Hosting**: Cloudinary (Upload Widget)
- **UI Components**: Lucide React Icons
- **Notifications**: SweetAlert2
- **Deployment**: Firebase Hosting

## 🎨 Theme System

The application features a comprehensive dark/light theme system:

- **Automatic Detection**: Detects system theme preference
- **Manual Toggle**: User can switch themes manually
- **Persistence**: Remembers theme choice across sessions (localStorage)
- **CSS Variables**: Consistent theming across all components
- **Smooth Transitions**: 0.3s ease transitions for theme changes

## 🚀 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

`firebase.json` is preconfigured with SPA rewrites to `index.html`.

### Environment Variables

Ensure all environment variables are set in your hosting platform:

- Firebase configuration (see `.env` section)
- Cloudinary credentials (if you parameterize them)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, Firebase, and Tailwind CSS**
