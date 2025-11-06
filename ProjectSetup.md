# Project Setup Guide

This document provides detailed instructions for setting up and running the Salinaka e-commerce application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager
- Git (for cloning the repository)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-react-master
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Firebase Configuration

The application is already configured to connect to a Firebase project. The configuration is located in [src/services/config.js](file:///c%3A/ecommerce-react-master/src/services/config.js).

If you want to use your own Firebase project:
1. Create a new Firebase project at https://console.firebase.google.com/
2. Update the configuration values in [src/services/config.js](file:///c%3A/ecommerce-react-master/src/services/config.js):
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

### 4. Environment Variables

No additional environment variables are required for basic functionality, as the Firebase configuration is hardcoded in the application.

## Running the Application

### Development Mode

To start the development server:

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at http://localhost:3000

### Production Build

To create a production build:

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

### Preview Production Build

To preview the production build locally:

Using npm:
```bash
npm run serve
```

Or using yarn:
```bash
yarn serve
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── basket/          # Shopping cart components
│   ├── common/          # Shared components
│   ├── formik/          # Form components
│   └── product/         # Product display components
├── constants/           # Application constants
├── helpers/             # Utility functions
├── hooks/               # Custom React hooks
├── redux/               # Redux setup (actions, reducers, sagas)
├── routers/             # Application routing
├── selectors/           # Redux selectors
├── services/            # Firebase configuration
├── styles/              # Sass stylesheets
└── views/               # Page-level components
    ├── account/         # User account pages
    ├── admin/           # Admin dashboard
    ├── auth/            # Authentication pages
    ├── checkout/        # Checkout process
    ├── home/            # Homepage
    ├── shop/            # Product browsing
    └── ...              # Other pages
```

## Adding Sample Products

To add sample products to your Firestore database:

1. Ensure you have a Firebase Admin SDK service account key file
2. Place the service account key file in the project root as `service-account-key.json`
3. Run the add-products script:
   ```bash
   node add-products.js
   ```

This will add 40 sample products to your Firestore database.

## Testing

To run tests:

Using npm:
```bash
npm run test
```

Or using yarn:
```bash
yarn test
```

## Deployment

The application can be deployed to Firebase Hosting:

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Troubleshooting

### Common Issues

1. **Missing or insufficient permissions error**: 
   - Ensure your Firebase project has proper security rules configured
   - Check that your Firebase configuration in [src/services/config.js](file:///c%3A/ecommerce-react-master/src/services/config.js) is correct

2. **Products not showing**:
   - Make sure you have added products to your Firestore database
   - Check the Firestore security rules to ensure read access is granted

3. **₹NaN values in cart**:
   - This issue has been fixed in the current codebase with proper validation
   - Ensure all product prices are valid numbers in the database

### Firebase Security Rules

The application requires the following Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN";
    }
    
    match /users/{document} {
      allow read, write: if request.auth != null && request.auth.uid == document;
    }
  }
}
```

### Need Help?

If you encounter any issues during setup:
1. Check the browser console for error messages
2. Verify all configuration files are correctly set up
3. Ensure your Firebase project has the correct security rules
4. Check that you have added products to your database