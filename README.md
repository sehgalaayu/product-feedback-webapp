# Product Feedback Webapp

A modern, full-stack web application for collecting and managing product feedback with real-time voting, user authentication, and a beautiful dark-themed UI.

## 🎯 Problem Statement

### The Challenge
Building a comprehensive feedback management system that allows users to:
- **Submit feedback** for products and services
- **Vote on feedback** from other users (upvote/downvote)
- **Track feedback** by categories (bugs, features, improvements)
- **Manage their own feedback** (create, edit, delete)
- **Real-time updates** without page refreshes

### Key Requirements
1. **User Authentication** - Secure login/register system
2. **Feedback CRUD** - Full create, read, update, delete operations
3. **Voting System** - One vote per user with smooth transitions
4. **Real-time Updates** - No page refreshes needed
5. **Responsive Design** - Works on all devices
6. **Beginner-Friendly Code** - Simple, readable codebase for learning

### Technical Constraints
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + JWT
- **Code Quality**: Minimal, beginner-friendly codebase
- **Performance**: Smooth user experience with intermediate vote states

## 🚀 Features

### Core Functionality
- **User Authentication** - Register, login, and secure JWT-based sessions
- **Feedback Management** - Create, edit, delete, and view feedback items
- **Voting System** - Upvote/downvote with smooth intermediate state transitions
- **Categories** - Organize feedback by type (Bug, Feature, Improvement, Other)
- **Real-time Updates** - Instant UI updates without page refreshes
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### User Experience
- **Dark Theme** - Modern, eye-friendly dark interface
- **Flash Messages** - In-app notifications for better UX
- **Smooth Animations** - Hover effects and transitions
- **Vote Visualization** - Clear visual feedback for user votes
- **Scroll Preservation** - Maintains scroll position during interactions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Zod** - Schema validation
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Fetch API** - HTTP requests

## 📁 Project Structure

```
product-feedback-webapp/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express server setup
│   │   ├── config/
│   │   │   └── db.ts             # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── userController.ts  # User auth logic
│   │   │   ├── feedbackController.ts # Feedback CRUD
│   │   │   └── voteController.ts  # Voting logic
│   │   ├── models/
│   │   │   ├── User.ts           # User schema
│   │   │   ├── Feedback.ts       # Feedback schema
│   │   │   └── Vote.ts           # Vote schema
│   │   ├── routes/
│   │   │   ├── userRoutes.ts     # Auth endpoints
│   │   │   ├── feedbackRoutes.ts # Feedback endpoints
│   │   │   └── voteRoutes.ts     # Vote endpoints
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts # JWT verification
│   │   │   └── validationMiddleware.ts # Request validation
│   │   └── validations/
│   │       ├── userValidation.ts # User schema validation
│   │       ├── feedbackValidation.ts # Feedback validation
│   │       └── voteValidation.ts # Vote validation
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Main app component
│   │   ├── components/
│   │   │   ├── AuthForm.tsx      # Login/Register form
│   │   │   ├── FeedbackForm.tsx  # Create/Edit feedback
│   │   │   ├── Home.tsx          # Feedback list
│   │   │   ├── Header.tsx        # Navigation
│   │   │   ├── Footer.tsx        # Footer
│   │   │   └── FlashMessage.tsx  # Notifications
│   │   ├── services/
│   │   │   └── api.ts            # API service
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── index.html
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd product-feedback-webapp
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration:
# PORT=8080
# MONGO_URL=mongodb://localhost:27017/product-feedback
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## 📖 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Feedback Endpoints

#### Get All Feedback
```http
GET /api/feedback
```

#### Create Feedback
```http
POST /api/feedback
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Add dark mode",
  "description": "Please add a dark mode option for better user experience",
  "category": "feature"
}
```

#### Update Feedback
```http
PUT /api/feedback/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "category": "improvement"
}
```

#### Delete Feedback
```http
DELETE /api/feedback/:id
Authorization: Bearer <jwt-token>
```

### Voting Endpoints

#### Vote on Feedback
```http
POST /api/votes/:feedbackId
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "voteType": "upvote" // or "downvote"
}
```

## 🎨 UI Components

### Authentication Forms
- **Login/Register** - Clean, minimal forms with validation
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Flash messages for successful actions

### Feedback Management
- **Create Form** - Title, description, and category selection
- **Edit Form** - Pre-populated with existing data
- **Delete Confirmation** - Safe deletion with confirmation

### Voting System
- **Visual Feedback** - Highlighted buttons for user's votes
- **Smooth Transitions** - Intermediate state display (1→0→-1)
- **Vote Prevention** - Prevents duplicate votes with clear messaging

### Navigation
- **Header** - Clean navigation with user status
- **Footer** - Attribution and links
- **Responsive** - Mobile-friendly navigation

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=8080
MONGO_URL=mongodb://localhost:27017/product-feedback
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

#### Frontend (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

## 🚀 Deployment

### MongoDB Atlas Setup (Recommended for Production)

#### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

#### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, Azure)
4. Choose a region close to your users
5. Click "Create"

#### 3. Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Select "Read and write to any database"
6. Click "Add User"

#### 4. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address
5. Click "Confirm"

#### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `product-feedback`)

#### 6. Update Environment Variables
```env
# backend/.env
PORT=8080
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/product-feedback?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Backend Deployment

#### Option 1: Heroku
1. Install Heroku CLI
2. Create a new Heroku app:
   ```bash
   cd backend
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set MONGO_URL=your-mongodb-atlas-url
   heroku config:set JWT_SECRET=your-jwt-secret
   ```
4. Deploy:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

#### Option 2: Railway
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Select the backend folder
4. Add environment variables in the dashboard
5. Deploy automatically

#### Option 3: Render
1. Go to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variables

### Frontend Deployment

#### Option 1: Vercel (Recommended)
1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

#### Option 2: Netlify
1. Go to [Netlify](https://netlify.com/)
2. Drag and drop your `frontend/dist` folder
3. Or connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`

#### Option 3: GitHub Pages
1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
     // ... other config
   })
   ```
2. Build the project: `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### Environment Variables for Production

#### Backend (.env)
```env
PORT=8080
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/product-feedback?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

#### Frontend (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:8080')
  }
})
```

### CORS Configuration
Update your backend CORS settings for production:
```typescript
// backend/src/app.ts
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : ['http://localhost:5173'],
  credentials: true
}));
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Create, edit, delete feedback
- [ ] Vote functionality (upvote/downvote)
- [ ] Vote changing (upvote → downvote)
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Flash messages

### API Testing
Use Postman or similar tool to test all endpoints:
- Authentication flows
- CRUD operations
- Voting system
- Error scenarios

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection
```bash
# Ensure MongoDB is running
mongod

# Check connection string
MONGO_URL=mongodb://localhost:27017/product-feedback
```

#### CORS Issues
```typescript
// Backend app.ts
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### JWT Issues
```bash
# Check JWT_SECRET is set
echo $JWT_SECRET

# Verify token in localStorage
localStorage.getItem('token')
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aayu** - [GitHub](https://github.com/sehgalaayu)

Made with ❤️ by Aayu

---

## 🎯 Key Features Summary

- ✅ **User Authentication** - Secure login/register system
- ✅ **Feedback CRUD** - Full create, read, update, delete operations
- ✅ **Voting System** - One vote per user with smooth transitions
- ✅ **Real-time Updates** - No page refreshes needed
- ✅ **Responsive Design** - Works on all devices
- ✅ **Dark Theme** - Modern, eye-friendly interface
- ✅ **TypeScript** - Full type safety
- ✅ **Clean Architecture** - Well-organized, maintainable code
- ✅ **Beginner Friendly** - Simple, readable codebase

Perfect for learning full-stack development with modern technologies! 🚀
