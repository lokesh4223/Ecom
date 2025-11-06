# E-commerce React Application

![E-commerce](public/static/banner.jpg)

A modern, responsive e-commerce application built with React, Redux, and Firebase. This application allows users to browse products, add items to their cart, and complete purchases with a streamlined checkout process.

## 🌟 Features

### User Features
- **User Authentication**: Email/password registration and login
- **Product Browsing**: View products in featured, recommended, and search views
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Multi-step checkout with shipping and payment information
- **Order History**: View past purchases (for authenticated users)
- **Responsive Design**: Mobile-friendly interface for all device sizes

### Admin Features
- **Product Management**: Create, read, update, and delete products
- **User Management**: View and manage user accounts
- **Order Management**: View and process customer orders

## 📸 Demo

### Application Screenshots
![Screenshot 1](public/images/Screenshot%202025-11-06%20204005.png)
![Screenshot 2](public/images/Screenshot%202025-11-06%20222824.png)
![Screenshot 3](public/images/Screenshot%202025-11-06%20225156.png)

### Demo Video
https://drive.google.com/file/d/1K5jnjNZnOnCW4nQYla2Ho4KoUaUxI-HI/view?usp=sharing

*Note: Download and play the video to see the application in action.*

[Download Demo Video (71MB)](public/images/Demo%20Live.mp4)

## 🛠️ Technology Stack

### Frontend
- **React 17** - JavaScript library for building user interfaces
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **React Router** - Declarative routing
- **Formik & Yup** - Form handling and validation
- **Sass** - CSS preprocessor for styling
- **Firebase SDK** - Backend services integration

### Backend & Services
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database for products and user data
- **Firebase Storage** - Image storage
- **Firebase Hosting** - Production deployment

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting (Airbnb configuration)
- **Jest & Enzyme** - Testing framework

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-react-master
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up Firebase configuration:
   - Create a `.env` file in the root directory
   - Add your Firebase configuration variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MSG_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Build for production:
```bash
npm run build
# or
yarn build
```

## 🔧 Environment Variables

The application requires the following environment variables to be set in a `.env` file:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MSG_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 🎨 Styling

The application uses Sass with a 7-1 architecture pattern:
- **Settings**: Global variables, config flags
- **Tools**: Global mixins and functions
- **Elements**: Base HTML element styles
- **Components**: Specific UI components
- **Utilities**: Helper classes and overrides

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)

## 🔐 Authentication

The application supports:
- Email/password authentication
- Google Sign-In
- Facebook Sign-In
- GitHub Sign-In

Admin users can be manually elevated in Firestore by setting the `role` field to `"ADMIN"`.

## 🛒 Shopping Cart

The shopping cart features:
- Add/remove products
- Adjust quantities
- Real-time price calculations
- Persistent storage using Redux-Persist

## 💳 Checkout Process

The checkout process consists of three steps:
1. **Order Summary**: Review items in cart
2. **Shipping Information**: Enter delivery details
3. **Payment Information**: Provide payment method

## 🧪 Testing

Run tests using:
```bash
npm run test
# or
yarn test
```

## 🚀 Deployment

The application can be deployed to Firebase Hosting:

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email [your-email] or open an issue in the repository.