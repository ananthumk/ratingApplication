# Store Rating System Backend API

A REST API backend for a store rating system built with Node.js, Express, and SQLite.

## Features

- User Authentication (JWT)
- Role-based Authorization (Admin, Store Owner, Normal User)
- Store Management
- Rating System
- User Management


## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=Your_secret_key
JWT_EXPIRATION=time 
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Stores
- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get store details
- `POST /api/stores` - Create new store (Admin only)
- `GET /api/stores/owner/my-store` - Get store owner's store

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/stats` - Get system statistics (Admin only)
- `PUT /api/users/me/password` - Update user password
- `GET /api/users/:id` - Get user details (Admin only)

### Ratings
- `POST /api/ratings` - Submit a rating (Normal users only)
- `GET /api/ratings/me` - Get user's ratings (Normal users only)

## Data Validation Rules

### User Registration
- Name: 20-60 characters
- Email: Valid email format
- Password: 8-16 characters, must contain uppercase and special character
- Address: Maximum 400 characters

### Store Creation
- Name: Maximum 100 characters
- Email: Valid email format, unique
- Address: Maximum 400 characters

### Rating Submission
- Rating: Number between 1 and 5

## Default Admin Account
```
Email: admin@storerating.com
Password: Admin@123
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Response format:
```json
{
  "success": boolean,
  "data": object | array,
  "message": string
}
```

## Database Schema

The application uses SQLite with the following tables:
- users
- stores
- ratings

## Scripts

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.