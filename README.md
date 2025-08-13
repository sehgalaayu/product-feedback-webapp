# Product Feedback Backend

A Node.js/Express backend API built with TypeScript for handling product feedback.

## Features

- Express.js server with TypeScript
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Request logging with Morgan
- JSON body parsing
- Basic API endpoints for products and feedback
- Error handling middleware
- Health check endpoint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Development mode (with auto-reload):
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/products` - Get sample products
- `POST /api/feedback` - Submit product feedback

## Environment Variables

- `PORT` - Server port (default: 3000)

## Development

The project uses:
- TypeScript for type safety
- ts-node-dev for development with auto-reload
- CommonJS module system
- Express.js for the web framework
