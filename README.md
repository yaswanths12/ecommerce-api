# E-Commerce REST API

## Overview
A RESTful API for an e-commerce platform built using Node.js, Express.js, and PostgreSQL. It supports user authentication, product management, shopping cart functionality, order processing, and Cloudinary image uploads.

## Features
- **User Authentication**: JWT-based authentication with role-based access (Admin & Customer)
- **Product Management**: CRUD operations with Cloudinary image uploads
- **Category Management**: Create, update, delete, and list categories
- **Product Filters**: Search by name, category, and price range
- **Shopping Cart**: Persistent cart pricing, add/remove items
- **Order Processing**: Place orders and view order history
- **API Documentation**: Swagger UI for endpoint references
- **Security**: Input validation, CORS, Helmet for protection

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Token)
- **File Uploads**: Multer + Cloudinary
- **Validation**: express-validator
- **Documentation**: Swagger
## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yaswanths12/ecommerce-api.git
   cd ecommerce-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     PORT=5000
     DATABASE_URL=your_postgres_db_url
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
4. Run migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
5. Start the server:
   ```sh
   npm start
   or
   npm run dev
   ```

## API Documentation
- Swagger UI: Available at `http://localhost:5000/api-docs`


## Endpoints Overview
### Authentication
- `POST /auth/signup` – User registration
- `POST /auth/login` – User login

### Products
- `GET /products` – List products with filters
- `POST /products` – (Admin) Create a product
- `PUT /products/:id` – (Admin) Update a product
- `DELETE /products/:id` – (Admin) Delete a product

### Categories
- `GET /categories` – List categories
- `POST /categories` – (Admin) Create a category

### Cart & Orders
- `POST /cart` – Add item to cart
- `GET /cart` – View cart
- `DELETE /cart/:id` – Remove item from cart
- `POST /orders` – Place an order
- `GET /orders` – View order history

## Contribution
Feel free to fork this repo and contribute via pull requests.

