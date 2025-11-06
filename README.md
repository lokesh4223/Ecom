# E-commerce React Application

![E-commerce](frontend/static/banner.jpg)

A modern, responsive e-commerce application built with React, Redux, and Node.js/Express backend with MongoDB. This application allows users to browse products, add items to their cart, and complete purchases with a streamlined checkout process.

## 📋 Full Stack Coding Assignment: Mock E-Com Cart

### Overview
Build a basic full-stack shopping cart app for Vibe Commerce screening. Handle add/remove items, totals, & mock checkout (no real payments). Tests UI, API, DB integration for e-com flows.

### Tech Stack
- **Frontend**: React
- **Backend**: Node/Express
- **Database**: MongoDB/SQLite
- **API**: REST APIs
- **Deployment**: GitHub (no hosting)

### Requirements

#### Backend APIs
- `GET /api/products`: 5-10 mock items (id, name, price)
- `POST /api/cart`: Add {productId, qty}
- `DELETE /api/cart/:id`: Remove item
- `GET /api/cart`: Get cart + total
- `POST /api/checkout`: {cartItems} → mock receipt (total, timestamp)

#### Frontend (React)
- Products grid w/ "Add to Cart"
- Cart view: Items/qty/total; remove/update buttons
- Checkout form (name/email); submit → receipt modal
- Responsive design

#### Bonus Features
- DB persistence (mock user)
- Error handling
- Fake Store API integration

#### Deliverables
GitHub repo (/backend, /frontend, README w/ setup/screenshots/explain)

---

## 📁 Project Structure

```
ecommerce-react-master/
├── backend/                 # Backend Node.js/Express server
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── ...                  # Other backend files
├── frontend/                # Frontend React application
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── views/           # Page components
│   │   ├── services/        # API services
│   │   ├── redux/           # State management
│   │   └── ...              # Other frontend files
│   ├── package.json         # Frontend dependencies
│   └── ...                  # Other frontend files
├── package.json             # Root package.json for managing both frontend and backend
├── README.md                # This file
└── ...                      # Other documentation files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-react-master
```

2. Install root dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### Running the Application

You can run the frontend and backend separately or together:

#### Running Frontend and Backend Separately

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

#### Running Frontend and Backend Together

From the root directory:
```bash
npm run dev
```

This will start both the backend server (on port 5000) and the frontend development server (on port 3000).

### Testing the Integration

Visit `http://localhost:3000/test` to see the integration test page where you can:
- View products from the backend
- Add items to cart
- See cart contents
- Complete checkout with a simple form

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
![Screenshot 1](frontend/public/images/Screenshot%202025-11-06%20204005.png)
![Screenshot 2](frontend/public/images/Screenshot%202025-11-06%20222824.png)
![Screenshot 3](frontend/public/images/Screenshot%202025-11-06%20225156.png)

### Demo Video

[▶️ Watch Demo Video (71MB)](https://drive.google.com/file/d/1K5jnjNZnOnCW4nQYla2Ho4KoUaUxI-HI/view?usp=sharing)

*Note: Click to watch the application in action on Google Drive*

*Note: Download and play the video to see the application in action.*

## 🛠️ Technology Stack

### Frontend
- **React 17** - JavaScript library for building user interfaces
- **Redux** - State management
- **Redux-Saga** - Side effect management
- **React Router** - Declarative routing
- **Formik & Yup** - Form handling and validation
- **Sass** - CSS preprocessor for styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting (Airbnb configuration)
- **Jest & Enzyme** - Testing framework

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

Admin users can be manually elevated in the database by setting the `role` field to `"ADMIN"`.

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email [your-email] or open an issue in the repository.