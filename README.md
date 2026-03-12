# Banking Backend Server

A robust Node.js backend for a banking application, featuring user authentication, secure data storage with MongoDB, and an automated email service.

## 🚀 Features

- **User Authentication**: Secure register and login system using JWT and Bcrypt.
- **Mongoose Models**: Well-defined schemas with validation for users.
- **Email Service**: Integration with Gmail SMTP using OAuth2 for transactional emails.
- **RESTful API**: Organized routing and controllers for clean architecture.

## 🛠️ Tech Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **Nodemailer**: Email sending service.

## ⚙️ Environment Variables

To run this project, you will need to create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=8000
JWT_SECRET=your_jwt_secret_key

# Database
MONGO_URI=mongodb://localhost:27017/bankdb

# Email Service (OAuth2)
EMAIL_USER=your-email@gmail.com
CLIENT_ID=your_google_oauth_client_id
CLIENT_SECRET=your_google_oauth_client_secret
REFRESH_TOKEN=your_google_oauth_refresh_token
```

## 📦 Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `server.js`: entry point of the application.
- `src/app.js`: express app configuration.
- `src/config/`: database and other configurations.
- `src/controller/`: logic for handling API requests.
- `src/models/`: database schemas.
- `src/routes/`: API endpoint definitions.
- `src/services/`: external services like email handling.
