# Full-Stack E-Commerce Store

A full-stack e-commerce application built with Node.js, Express, MongoDB, and vanilla JavaScript. This project features a complete online shopping experience with user authentication, product management, shopping cart functionality, order processing, and an admin dashboard.
take a look at the live demo: 👉 https://www.deseller.run.place

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
- **Jest**: Unit testing framework

### Frontend
- **HTML5**: Structure
- **CSS3**: Styling
- **Vanilla JavaScript**: Dynamic functionality
- **Axios**: API requests

### Infrastructure
- **Docker** & **Docker Compose**: Containerization and orchestration
- **Nginx**: Reverse proxy and static file serving
- **Named Bind Volumes**: Persistent data storage for database and uploaded images

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
│   │   │   ├── auth.services.js   # Authentication logic
│   │   │   └── health.services.js # Health checks logic
│   │   ├── utils/
│   │   │   ├── mailer.js          # Email configuration
│   │   │   └── mail.services.js   # Email sending logic
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   ├── .env                       # Environment variables
│   ├── Dockerfile                 # Backend container image
│   └── package.json
│
├── db/
│   ├── dump/
│   │   └── storedb/               # BSON data files for seeding
│   ├── init.sh                    # Database initialization script
│   └── dockerfile                 # MongoDB container image
│
├── Front-End/
│   ├── admin/
│   │   ├── dashboardUtils/
│   │   │   ├── dashboard.html     # Admin dashboard
│   │   │   ├── addProduct.html    # Add product form
│   │   │   ├── editProduct.html   # Edit product form
│   │   │   └── product.html       # Admin product list
│   │   └── admin.html
│   ├── home.html                  # Homepage
│   ├── product.html               # Product listing
│   ├── productPage.html           # Product details
│   ├── order.html                 # Order checkout
│   ├── account.html               # User account
│   ├── contact.html               # Contact page
│   ├── about.html                 # About page
│   ├── nginx.conf                 # Nginx reverse proxy config
│   ├── js/
│   │   ├── api.js                 # API configuration
│   │   └── home.js                # Homepage logic
│   └── styles/
│       └── style.css              # Main stylesheet
│
├── data/
│   ├── database-data/             # Persistent MongoDB data (bind mount)
│   └── uploaded-images/           # Persistent product images (bind mount)
│
└── docker-compose.yml             # Container orchestration
```

## 🔧 Installation & Setup

### Prerequisites
- **Docker** & **Docker Compose** installed on your machine

### Quick Start (Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/anbaya/Full-Stack-E-Commerce-Store.git
   cd Full-Stack-E-Commerce-Store
   ```

2. **Configure environment variables**
   Create a `.env` file in the `back-end/` directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://db:27017/storedb
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```
   This will build and start all three services (database, backend, frontend).
   The database is automatically seeded with initial data on first run.

4. **Access the application**
   - Frontend: `http://localhost:8000`
   - Backend API: `http://localhost:8000/api/`

5. **View logs**
   ```bash
   docker-compose logs -f back-end   # Backend logs only
   docker-compose logs -f             # All services
   ```

6. **Stop the application**
   ```bash
   docker-compose down
   ```

### Running Tests
The project uses Jest for unit testing.
1. Ensure dependencies are installed in the backend folder:
   ```bash
   cd back-end
   npm install
   ```
2. Run the tests:
   ```bash
   npm test
   ```

## 🐳 Docker Architecture

The application runs as three Docker containers orchestrated by Docker Compose:

| Service | Description | Port |
|---------|-------------|------|
| **db** | MongoDB database with automatic data seeding | 27017 (internal) |
| **back-end** | Node.js/Express API server | 3000 (internal) |
| **front-end** | Nginx serving static files + reverse proxy | 8000 (host) |

### Data Persistence

Two named bind volumes ensure your data survives container restarts and rebuilds:

| Volume | Container Path | Host Path | Purpose |
|--------|----------------|-----------|----------|
| `db_data` | `/data/db` | `./data/database-data/` | MongoDB data files |
| `product_images` | `/app/src/modules/products/productsImages` | `./data/uploaded-images/` | Uploaded product images |

All persistent data is stored in the `data/` directory at the project root, making backups straightforward:
```bash
# Backup everything
tar czvf backup.tar.gz data/
```

### Network

All services communicate over an internal Docker bridge network (`app`). The frontend Nginx container is the only service exposed to the host, acting as a reverse proxy that forwards `/api/*` and `/images/*` requests to the backend.

## 📡 API Endpoints

### System
- `GET /api/health` - Check comprehensive system health (Database, Mailer, FS, Config)

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
- Images are persisted in the `data/uploaded-images/` directory on the host via a Docker bind volume
- Multiple images per product supported (up to 5)
- Accessible via `http://localhost:8000/images/filename` (proxied through Nginx)

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

- **Image uploads**: Ensure the `data/uploaded-images/` directory exists on the host before starting containers
- **Email sending**: Configure valid SMTP credentials in `.env`
- **Database seeding**: The database is only seeded on the first run (when `data/database-data/` is empty). To re-seed, stop containers and delete `data/database-data/`
- **Volume permissions**: The `data/database-data/` directory is owned by the MongoDB container user (UID 999). Avoid manually modifying files inside it

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
