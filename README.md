# Full-Stack E-Commerce Store

A full-stack e-commerce application built with Node.js, Express, MongoDB, and vanilla JavaScript. This project features a complete online shopping experience with user authentication, product management, shopping cart functionality, order processing, and an admin dashboard.

## 🚀 Features

### Customer Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Product Browsing**: View products with detailed information, images, and pricing
- **Shopping Cart**: Add/remove items, update quantities, and view cart total
- **Order Management**: Place orders with shipping options and view order history
- **User Profile**: Manage personal information, addresses, and payment cards
- **Email Notifications**: Receive confirmation emails for registration, login, and orders

### Admin Features
- **Admin Dashboard**: View analytics including total products, orders, and sales
- **Product Management**: Add, edit, and delete products with image uploads
- **Order Management**: View and update order statuses
- **User Management**: View all registered users

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js**: Server framework
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Nodemailer**: Email notifications
- **Axios**: HTTP client

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling
- **Vanilla JavaScript**: Dynamic functionality
- **Axios**: API requests

## 📁 Project Structure

```
Full-Stack-E-Commerce-Store/
├── back-end/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Database configuration
│   │   │   └── index.js           # Environment variables
│   │   ├── modules/
│   │   │   ├── address/           # Address management
│   │   │   ├── cards/             # Shopping cart logic
│   │   │   ├── dashboard/         # Admin analytics
│   │   │   ├── orders/            # Order processing
│   │   │   ├── products/          # Product CRUD operations
│   │   │   ├── sections/          # Section management
│   │   │   └── users/             # User management
│   │   ├── routes/
│   │   │   └── index.js           # Main router
│   │   ├── services/
│   │   │   └── auth.services.js   # Authentication logic
│   │   ├── utils/
│   │   │   ├── mailer.js          # Email configuration
│   │   │   └── mail.services.js   # Email sending logic
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   └── package.json
│
└── Front-End/
    ├── admin/
    │   ├── dashboardUtils/
    │   │   ├── dashboard.html     # Admin dashboard
    │   │   ├── addProduct.html    # Add product form
    │   │   ├── editProduct.html   # Edit product form
    │   │   └── product.html       # Admin product list
    │   └── admin.html
    ├── home.html                  # Homepage
    ├── product.html               # Product listing
    ├── productPage.html           # Product details
    ├── order.html                 # Order checkout
    ├── account.html               # User account
    ├── contact.html               # Contact page
    ├── about.html                 # About page
    ├── js/
    │   ├── api.js                 # API configuration
    │   └── home.js                # Homepage logic
    └── styles/
        └── style.css              # Main stylesheet
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/anbaya/Full-Stack-E-Commerce-Store.git
   cd Full-Stack-E-Commerce-Store/back-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `back-end` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the server**
   ```bash
   npm run dev    # Development mode with nodemon
   # or
   npm start      # Production mode
   ```

### Frontend Setup

1. **Navigate to the Frontend directory**
   ```bash
   cd ../Front-End
   ```

2. **Open with Live Server**
   - Use a local development server (e.g., VS Code Live Server extension)
   - Or simply open `home.html` in your browser

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user (protected)

### Products
- `GET /api/store/products` - Get all products
- `GET /api/store/products/:id` - Get product by ID
- `POST /api/store/products` - Add product (admin only)
- `PUT /api/store/products/:id` - Update product (admin only)
- `DELETE /api/store/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cards/:id` - Get cart by ID
- `POST /api/cards/add-to-cart` - Add item to cart
- `PUT /api/cards/:id` - Update cart

### Orders
- `POST /api/orders/place-order` - Place new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)

### Dashboard (Admin)
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in HTTP-only cookies
- Protected routes require a valid token in the Authorization header
- Admin routes have additional role-based authorization

## 📧 Email Notifications

Email notifications are sent for:
- User registration (welcome email)
- User login confirmation
- Order confirmation

Configure your email service in the `.env` file using SMTP credentials.

## 🖼️ Image Upload

Product images are uploaded using Multer:
- Images are stored in `back-end/src/modules/products/productsImages/`
- Multiple images per product supported (up to 5)
- Accessible via `http://localhost:3000/images/filename`

## 🎨 Features in Detail

### Shopping Cart
- Real-time cart updates
- Quantity management
- Product total calculation
- Persistent cart storage in MongoDB

### Order Processing
- Multiple shipping options
- Address management
- Order status tracking
- Email confirmations

### Admin Dashboard
- Sales analytics
- Product management with image upload
- Order status updates
- User statistics

## 🐛 Known Issues & Solutions

- **Image uploads**: Ensure the `productsImages` directory exists and has write permissions
- **Email sending**: Configure valid SMTP credentials in `.env`
- **CORS issues**: Update CORS settings in `app.js` if frontend is on different domain

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**anbaya**
- GitHub: [@anbaya](https://github.com/anbaya)

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- JWT best practices
- Nodemailer documentation

---

**Note**: This is a learning project and may require additional security hardening before production use.